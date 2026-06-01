#!/usr/bin/env python3
"""
classify_contacts.py  v2
========================
Reads Mailchimp contact exports and classifies each contact into an ICP segment.

Classification priority order:
  1. Job title → anti-persona check (flight attendants, pilots, ATCs, etc.)
  2. Aviation Industry Class field → direct map (already tagged in Mailchimp)
  3. ICP field (segment names) → bare keyword match ("distributor", "mro", etc.)
  4. ICP field (persona labels) → enriched label match ("Procurement Managers in Aviation")
  5. Company Description → ICP keyword match
  6. Job Title → buyer/seller/MRO role keywords
  7. Company Name → industry keyword match
  8. No match → Unknown

Tiers:
  Tier1       = Distributor / Broker / MRO   (57% of revenue — highest priority)
  Tier2       = OEM / Contract Manufacturer  (17% of revenue)
  Tier3       = Airline / FBO / Airport / Defense Contractor / Charter  (remaining)
  LowPriority = Engineers, tech roles at relevant companies — at right company,
                wrong persona. Do NOT suppress. Do NOT prioritize.
  AntiPersona = Clear suppress candidates — wrong industry or non-buying role
  Unknown     = No signal found — needs external enrichment (Clay, Clearbit)

Usage:
  python3 scripts/classify_contacts.py                   # subscribed list only
  python3 scripts/classify_contacts.py --all             # all 5 export files
  python3 scripts/classify_contacts.py --summary         # stats only, no output file
  python3 scripts/classify_contacts.py --limit 1000      # test on first N rows
"""

import csv
import os
import re
import argparse
from collections import Counter

# ─── CONFIG ──────────────────────────────────────────────────────────────────

EXPORT_DIR = os.path.join(os.path.dirname(__file__), '..', 'resources', 'MailChimp_audience_export_May202026')
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), '..', 'resources', 'icp_classification_output.csv')

ALL_FILES = [
    'subscribed_email_audience_export_a6140fbbfe.csv',
    'unsubscribed_email_audience_export_a6140fbbfe.csv',
    'cleaned_email_audience_export_a6140fbbfe.csv',
    'nonsubscribed_email_audience_export_a6140fbbfe.csv',
]
DEFAULT_FILE = 'subscribed_email_audience_export_a6140fbbfe.csv'

# ─── STEP 1: ANTI-PERSONA — JOB TITLE CHECK ──────────────────────────────────
# People who work in aviation but never buy/sell parts. Suppress candidates.

ANTI_PERSONA_TITLES = [
    r'\bflight attendant\b',
    r'\bcabin crew\b',
    r'\bstewardess\b',
    r'\bsteward\b',
    r'(?<!chief )\bpilot\b(?!.*purchas)',  # pilot but not "chief pilot" or "pilot purchasing program"
    r'\bcaptain\b',
    r'\bfirst officer\b',
    r'\bco.?pilot\b',
    r'\bair traffic control',
    r'\batc officer\b',
    r'\batc\b',
    r'\bflight dispatcher\b',
    r'\bsoftware engineer\b',
    r'\bsoftware developer\b',
    r'\bweb developer\b',
    r'\bfull.?stack\b',
    r'\bdevops\b',
    r'\bdata scientist\b',
    r'\bmachine learning\b',
    r'\bui.?ux\b',
    r'\bux designer\b',
    r'\bflight instructor\b',
    r'\bcheck airman\b',
    r'\bline pilot\b',
    r'\bair traffic controller\b',
]

# ─── STEP 2: AVIATION INDUSTRY CLASS → TIER ──────────────────────────────────
# Direct map from the official Mailchimp tag field. Confidence = 1.0.

INDUSTRY_CLASS_MAP = {
    # Tier 1
    'distributor':            ('Tier1', 'Distributor'),
    'broker':                 ('Tier1', 'Broker'),
    'mro':                    ('Tier1', 'MRO'),
    # Tier 2
    'contract manufacturer':  ('Tier2', 'Contract Manufacturer'),
    'oem':                    ('Tier2', 'OEM'),
    'charter service':        ('Tier2', 'Charter Service'),
    'overhaul shop':          ('Tier2', 'Overhaul Shop'),
    # Tier 3
    'fbo':                    ('Tier3', 'FBO/AMO'),
    'amo':                    ('Tier3', 'FBO/AMO'),
    'fixed base operator':    ('Tier3', 'FBO/AMO'),
    'airline':                ('Tier3', 'Airline'),
    'u.s. defense':           ('Tier3', 'Defense Contractor'),
    'defense contractor':     ('Tier3', 'Defense Contractor'),
    'corporate flight':       ('Tier3', 'Corporate Flight'),
    'charter':                ('Tier2', 'Charter Service'),
    'overhaul':               ('Tier2', 'Overhaul Shop'),
}

# ─── STEP 3: ICP FIELD — BARE SEGMENT NAMES ──────────────────────────────────
# Handles cases where ICP field was populated with explicit segment terms
# rather than enriched persona labels.

ICP_SEGMENT_PATTERNS = [
    # Tier 1
    (r'\bdistributor\b',             'Tier1', 'Distributor',            0.88),
    (r'parts? supplier',             'Tier1', 'Distributor',            0.85),
    (r'aviation supplier',           'Tier1', 'Distributor',            0.85),
    (r'\bbrokers?\b',                 'Tier1', 'Broker',                 0.88),
    (r'parts? brokers?',             'Tier1', 'Broker',                 0.88),
    (r'charter broker',              'Tier1', 'Broker',                 0.88),
    (r'\bmro\b',                     'Tier1', 'MRO',                    0.92),
    (r'maintenance.*repair.*overhaul','Tier1','MRO',                    0.88),
    (r'repair.*overhaul',            'Tier1', 'MRO',                    0.85),
    # Tier 2
    (r'contract manufactur',         'Tier2', 'Contract Manufacturer',  0.88),
    (r'\boem\b',                     'Tier2', 'OEM',                    0.88),
    (r'original equipment manufactur','Tier2','OEM',                    0.85),
    (r'overhaul shop',               'Tier2', 'Overhaul Shop',          0.88),
    # Tier 3
    (r'\bfbo\b',                     'Tier3', 'FBO/AMO',                0.92),
    (r'fixed.?base operator',        'Tier3', 'FBO/AMO',                0.92),
    (r'\bamo\b',                     'Tier3', 'FBO/AMO',                0.88),
    (r'approved maintenance org',    'Tier3', 'FBO/AMO',                0.88),
    (r'\bairline\b',                 'Tier3', 'Airline',                0.88),
    (r'air carrier',                 'Tier3', 'Airline',                0.85),
    (r'defense contractor',          'Tier3', 'Defense Contractor',     0.88),
    (r'corporate flight',            'Tier3', 'Corporate Flight',       0.85),
    (r'flight department',           'Tier3', 'Corporate Flight',       0.80),
]

# ─── STEP 4: ICP FIELD — ENRICHED PERSONA LABELS ─────────────────────────────
# Handles vendor-enriched labels like "Procurement Managers in the Aviation Space"
# Order matters: most specific / highest-confidence first.
# Anti-persona checked first to avoid false Tier1 matches on edge cases.

ICP_LABEL_PATTERNS = [

    # ── ANTI-PERSONA ── clear suppression candidates ──────────────────────────
    (r'regulatory',                              'AntiPersona', 'Regulatory/FAA',          0.92),
    (r'in.?flight entertainment',                'AntiPersona', 'IFE (not parts buyer)',   0.95),
    (r'lunar',                                   'AntiPersona', 'Space (not aviation)',    0.95),
    (r'urban air mobility',                      'AntiPersona', 'UAM/Drone',               0.92),
    (r'unmanned systems',                        'AntiPersona', 'Drone/UAM',               0.92),
    (r'satellite',                               'AntiPersona', 'Space (not aviation)',    0.90),
    (r'\bspace\b.*(industry|sector|technology|program|operations|exploration)',
                                                 'AntiPersona', 'Space Industry',          0.90),
    (r'(spaceflight|space launch|launch manager)','AntiPersona','Space Industry',          0.92),
    (r'cybersecurity',                           'AntiPersona', 'IT/Security',             0.92),
    (r'interior design',                         'AntiPersona', 'Non-aviation role',       0.95),
    (r'seating design',                          'AntiPersona', 'Non-aviation role',       0.95),
    (r'food service',                            'AntiPersona', 'Non-aviation role',       0.95),
    (r'\bcatering\b',                            'AntiPersona', 'Non-aviation role',       0.92),
    (r'leisure travel',                          'AntiPersona', 'Non-aviation role',       0.92),
    (r'luxury travel',                           'AntiPersona', 'Non-aviation role',       0.92),
    (r'travel strategist',                       'AntiPersona', 'Non-aviation role',       0.90),
    (r'travel executive',                        'AntiPersona', 'Non-aviation role',       0.88),
    (r'recreational aviation',                   'AntiPersona', 'Hobby (not commercial)',  0.92),
    (r'aviation enthusiast',                     'AntiPersona', 'Hobby (not commercial)',  0.92),
    (r'flight instructor',                       'AntiPersona', 'Training role',           0.92),
    (r'\beducator',                              'AntiPersona', 'Education',               0.90),
    (r'pricing and revenue management',          'AntiPersona', 'Revenue Mgmt (Airline)',  0.88),
    (r'software (engineer|developer)',           'AntiPersona', 'Software role',           0.92),
    (r'data (analyst|scientist)',                'AntiPersona', 'Data role (not buyer)',   0.88),
    (r'research scientist',                      'AntiPersona', 'R&D (not buyer)',         0.86),
    (r'ciso|it security manager',                'AntiPersona', 'IT Security',             0.90),
    (r'training (manager|director|specialist)',  'LowPriority', 'Training role',           0.70),
    (r'aviation safety (expert|official|inspector)', 'AntiPersona', 'Safety (not buyer)', 0.88),
    (r'energy solution',                         'AntiPersona', 'Energy (not aviation parts)', 0.86),
    (r'infrastructure developer',                'AntiPersona', 'Infrastructure/UAM',      0.86),
    (r'military analyst',                        'AntiPersona', 'Military Analyst',        0.86),
    (r'financial advisor',                       'AntiPersona', 'Finance (not buyer)',     0.86),
    (r'naval aviation leader',                   'AntiPersona', 'Military (not buyer)',    0.84),

    # ── TIER 1 — procurement / supply chain / logistics / maintenance ──────────
    (r'defense contracting (officer|professional)', 'Tier1', 'Likely Buyer',        0.88),
    (r'contracting officer',                     'Tier1', 'Likely Buyer',           0.84),
    (r'government contract manager',             'Tier1', 'Likely Buyer',           0.84),
    (r'quality control',                         'Tier1', 'MRO',                    0.76),
    (r'procurement',                             'Tier1', 'Likely Buyer',           0.88),
    (r'supply chain',                            'Tier1', 'Likely Buyer',           0.84),
    (r'\blogistics\b',                           'Tier1', 'Distributor',            0.80),
    (r'\bcargo\b',                               'Tier1', 'Distributor',            0.78),
    (r'component supplier',                      'Tier1', 'Distributor',            0.90),
    (r'ground support equipment',                'Tier1', 'MRO',                    0.76),
    (r'quality assurance',                       'Tier1', 'MRO',                    0.76),
    (r'defense acquisition',                     'Tier1', 'Likely Buyer',           0.84),
    (r'contracts.*procurement|procurement.*contracts',
                                                 'Tier1', 'Likely Buyer',           0.84),
    (r'contract administrator',                  'Tier1', 'Likely Buyer',           0.76),
    # Maintenance roles (placed after IFE/space anti-persona to avoid false matches)
    (r'maintenance.*(manager|director|leader|support|executive)',
                                                 'Tier1', 'MRO',                    0.82),
    (r'(manager|director|leader|executive).*maintenance',
                                                 'Tier1', 'MRO',                    0.80),

    # ── TIER 2 — manufacturing / OEM ──────────────────────────────────────────
    (r'aircraft manufacturer',                   'Tier2', 'OEM',                    0.84),
    (r'aerospace manufacturer',                  'Tier2', 'OEM',                    0.82),
    (r'engine manufacturer',                     'Tier2', 'OEM',                    0.84),
    (r'manufacturing executive',                 'Tier2', 'Contract Manufacturer',  0.80),
    (r'manufacturing leader',                    'Tier2', 'Contract Manufacturer',  0.80),
    (r'manufacturing manager',                   'Tier2', 'Contract Manufacturer',  0.74),
    (r'manufacturer.*(aviation|aerospace)',       'Tier2', 'OEM',                    0.80),

    # ── TIER 2 — charter operators / aircraft owners (missed in prior rounds) ──
    (r'charter operators?',                      'Tier2', 'Charter Service',       0.88),
    (r'charter service executive',               'Tier2', 'Charter Service',       0.86),
    (r'jet charter',                             'Tier2', 'Charter Service',       0.86),
    (r'private jet',                             'Tier2', 'Charter Service',       0.84),
    (r'private aviation executive',              'Tier2', 'Charter Service',       0.80),
    (r'aviation executive.*private',             'Tier2', 'Charter Service',       0.78),
    (r'aircraft owner',                          'Tier2', 'Charter Service',       0.76),
    (r'aircraft operator',                       'Tier2', 'Charter Service',       0.74),
    (r'manufacturing expert',                    'Tier2', 'Contract Manufacturer', 0.76),
    (r'aerospace.*defense.*manufacturer',        'Tier2', 'OEM',                   0.80),
    (r'aerospace and defense manufacturer',      'Tier2', 'OEM',                   0.82),

    # ── TIER 3 — airlines / airports / ground ops / charter / defense ──────────
    (r'airlines?',                               'Tier3', 'Airline',               0.84),
    (r'air carrier',                             'Tier3', 'Airline',               0.82),
    (r'\bairport\b',                             'Tier3', 'FBO/Airport',           0.80),
    (r'ground handling',                         'Tier3', 'FBO/AMO',               0.80),
    (r'ground operations',                       'Tier3', 'FBO/AMO',               0.74),
    (r'helicopter operator',                     'Tier3', 'Charter Service',       0.82),
    (r'business aviation',                       'Tier3', 'Charter Service',       0.82),
    (r'corporate aviation',                      'Tier3', 'Corporate Flight',      0.82),
    (r'flight operations director',              'Tier3', 'Corporate Flight',      0.72),
    (r'aircraft management',                     'Tier3', 'Corporate Flight',      0.76),
    (r'leasing executive',                       'Tier3', 'Corporate Flight',      0.70),
    (r'\bleasing\b',                             'Tier3', 'Corporate Flight',      0.66),
    (r'terminal operator',                       'Tier3', 'FBO/Airport',           0.76),
    (r'fleet manager',                           'Tier3', 'Corporate Flight',      0.72),
    (r'fleet strategy',                          'Tier3', 'Corporate Flight',      0.72),
    (r'aviation support manager',                'Tier3', 'FBO/AMO',               0.70),
    (r'aerospace operations',                    'Tier3', 'Corporate Flight',      0.68),
    (r'operations manager.*(aviation|aerospace)', 'Tier3', 'Corporate Flight',    0.68),
    (r'corporate executive.*(aviation|aerospace)','Tier3', 'Corporate Flight',    0.66),
    (r'aviation.*executive',                     'Tier3', 'Corporate Flight',      0.64),
    (r'aerospace.*executive',                    'Tier3', 'Corporate Flight',      0.62),
    # Defense executives (last in Tier3 — low revenue, low confidence)
    (r'leadership.*management.*defense',         'Tier3', 'Defense Contractor',    0.66),
    (r'defense.*security executive',             'Tier3', 'Defense Contractor',    0.66),
    (r'defense executive',                       'Tier3', 'Defense Contractor',    0.64),
    (r'defense.*leader(?! in unmanned)',         'Tier3', 'Defense Contractor',    0.62),

    # ── LOW PRIORITY — right industry, wrong persona ───────────────────────────
    # Engineers / technical staff at relevant aviation/aerospace companies.
    # Do NOT suppress. Do NOT prioritize for campaigns.
    # Candidate for enrichment if company-level data shows ICP match.
    (r'aerospace engineer',                      'LowPriority', 'Engineer',        0.84),
    (r'defense engineer',                        'LowPriority', 'Engineer',        0.84),
    (r'avionics engineer',                       'LowPriority', 'Engineer',        0.82),
    (r'systems engineer',                        'LowPriority', 'Engineer',        0.80),
    (r'materials engineer',                      'LowPriority', 'Engineer',        0.80),
    (r'mechanical engineer',                     'LowPriority', 'Engineer',        0.80),
    (r'test engineer',                           'LowPriority', 'Engineer',        0.80),
    (r'automation engineer',                     'LowPriority', 'Engineer',        0.80),
    (r'manufacturing engineer',                  'LowPriority', 'Engineer',        0.78),
    (r'rf engineer',                             'LowPriority', 'Engineer',        0.84),
    (r'engineers? (in|from|and)',                'LowPriority', 'Engineer',        0.75),
    (r'engineering leader',                      'LowPriority', 'Engineering Mgmt',0.72),
    (r'engineering manager',                     'LowPriority', 'Engineering Mgmt',0.74),
    (r'engineering executive',                   'LowPriority', 'Engineering Mgmt',0.72),
    (r'technology leader',                       'LowPriority', 'Tech Leader',     0.74),
    (r'technology developer',                    'LowPriority', 'Tech',            0.78),
    (r'technology executive',                    'LowPriority', 'Tech Leader',     0.72),
    (r'technology innovator',                    'LowPriority', 'Tech',            0.74),
    (r'program manager',                         'LowPriority', 'Program Manager', 0.68),
    (r'r&d leader|r&d manager|research leader',  'LowPriority', 'R&D',            0.72),
    (r'innovation leader',                       'LowPriority', 'Innovation',      0.70),
    (r'defense.*intelligence',                   'LowPriority', 'Defense Intel',   0.72),
    (r'finance.*intelligence|analytics.*manag',  'LowPriority', 'Finance/Analytics',0.68),
    (r'autonomy engineer',                       'LowPriority', 'Engineer',        0.82),
    (r'intelligence.*surveillance',              'LowPriority', 'Defense Intel',   0.72),
    (r'space.*engineer|engineer.*space',         'LowPriority', 'Engineer',        0.80),
    (r'launch manager',                          'LowPriority', 'Engineer',        0.78),
    (r'defense industry leader',                 'LowPriority', 'Defense Exec',    0.68),
    (r'defense technology',                      'LowPriority', 'Defense Tech',    0.74),
    (r'aerospace researcher',                    'LowPriority', 'R&D',             0.76),
    (r'aviation data analyst',                   'LowPriority', 'Analytics',       0.76),
    (r'aviation safety (manager|official)',      'LowPriority', 'Safety (not buyer)', 0.72),
    (r'safety.*operations manager',              'LowPriority', 'Safety/Ops',      0.68),
    (r'aviation advocate',                       'LowPriority', 'Advocate',        0.68),
    (r'\bconsultant\b',                          'LowPriority', 'Consultant',      0.66),
    (r'finance executive.*(aviation|aerospace)', 'LowPriority', 'Finance',         0.68),
    (r'leaders? (in|of) the (aviation|aerospace)','LowPriority','General Leader',  0.60),
    (r'aviation professional',                   'LowPriority', 'General Aviation', 0.60),
]

# ─── STEP 5–6: JOB TITLE PATTERNS ────────────────────────────────────────────

TITLE_PATTERNS = [
    # Tier 1 — procurement/supply chain titles
    (r'purchas',                         'Tier1', 'Likely Buyer',   0.65),
    (r'procurement',                     'Tier1', 'Likely Buyer',   0.68),
    (r'sourcing',                        'Tier1', 'Likely Buyer',   0.62),
    (r'supply chain',                    'Tier1', 'Likely Buyer',   0.65),
    (r'logistics manager',               'Tier1', 'Distributor',    0.65),
    (r'logistics director',              'Tier1', 'Distributor',    0.65),
    (r'inventory manager',               'Tier1', 'Likely Seller',  0.62),
    (r'inventory control',               'Tier1', 'Likely Seller',  0.60),
    (r'parts? sales',                    'Tier1', 'Likely Seller',  0.62),
    (r'parts? manager',                  'Tier1', 'Likely Seller',  0.62),
    (r'parts? director',                 'Tier1', 'Likely Seller',  0.65),
    (r'warehouse manager',               'Tier1', 'Distributor',    0.60),
    (r'materials manager',               'Tier1', 'Likely Buyer',   0.62),
    # Tier 1 — MRO titles
    (r'maintenance manager',             'Tier1', 'MRO',            0.68),
    (r'maintenance director',            'Tier1', 'MRO',            0.68),
    (r'director.*maintenance',           'Tier1', 'MRO',            0.65),
    (r'director of maintenance',         'Tier1', 'MRO',            0.70),
    (r'head of maintenance',             'Tier1', 'MRO',            0.70),
    (r'quality assurance',               'Tier1', 'MRO',            0.58),
    (r'quality manager',                 'Tier1', 'MRO',            0.60),
    # Tier 3 — fleet/ops titles
    (r'fleet manager',                   'Tier3', 'Corporate Flight', 0.60),
    (r'flight operations',               'Tier3', 'Corporate Flight', 0.58),
    # LowPriority — generic engineering/tech titles without ICP field context
    (r'\bengineer\b',                    'LowPriority', 'Engineer',   0.55),
    (r'engineering manager',             'LowPriority', 'Engineering Mgmt', 0.58),
    (r'director of engineering',         'LowPriority', 'Engineering Mgmt', 0.58),
    (r'project manager',                 'LowPriority', 'Program Manager', 0.52),
    (r'program manager',                 'LowPriority', 'Program Manager', 0.54),
    # AntiPersona — clearly non-aviation-business titles
    (r'\bstudent\b',                     'AntiPersona', 'Student',    0.92),
    (r'human resources',                 'AntiPersona', 'HR role',    0.88),
    (r'\bhr manager\b|\bhr director\b',  'AntiPersona', 'HR role',    0.90),
    (r'office manager',                  'LowPriority', 'Admin role', 0.65),
    # Tier1 — sales/BD titles at aviation companies (low confidence without company context)
    (r'business development',            'Tier1', 'Likely Seller',  0.52),
    (r'\bsales manager\b',               'Tier1', 'Likely Seller',  0.54),
    (r'\baccount manager\b',             'Tier1', 'Likely Seller',  0.50),
]

# ─── STEP 7: COMPANY NAME PATTERNS ───────────────────────────────────────────

COMPANY_PATTERNS = [
    # ── Generic keyword patterns ──────────────────────────────────────────────
    (r'\bdistrib',                       'Tier1', 'Distributor',           0.68),
    (r'parts?\s+(co|inc|llc|corp|ltd)\b','Tier1', 'Distributor',          0.65),
    (r'aviation parts',                  'Tier1', 'Distributor',           0.75),
    (r'aerospace parts',                 'Tier1', 'Distributor',           0.75),
    (r'\bmro\b',                         'Tier1', 'MRO',                   0.82),
    (r'repair.*group',                   'Tier1', 'MRO',                   0.62),
    (r'maintenance.*services',           'Tier1', 'MRO',                   0.62),
    (r'\boverhaul\b',                    'Tier1', 'MRO',                   0.68),
    (r'\bsurplus\b',                     'Tier1', 'Distributor',           0.65),
    (r'\bfbo\b',                         'Tier3', 'FBO/AMO',               0.82),
    (r'airways?\b',                      'Tier3', 'Airline',               0.68),
    (r'\bairlines?\b',                   'Tier3', 'Airline',               0.75),
    (r'air lines?\b',                    'Tier3', 'Airline',               0.72),
    # ── Known OEM companies → Tier2 ──────────────────────────────────────────
    (r'\bboeing\b',                      'Tier2', 'OEM',                   0.80),
    (r'\bairbus\b',                      'Tier2', 'OEM',                   0.80),
    (r'\bembraer\b',                     'Tier2', 'OEM',                   0.80),
    (r'\bgulfstream\b',                  'Tier2', 'OEM',                   0.80),
    (r'\bbombardier\b',                  'Tier2', 'OEM',                   0.78),
    (r'\bcirrus\b',                      'Tier2', 'OEM',                   0.76),
    (r'\bcessna\b',                      'Tier2', 'OEM',                   0.80),
    (r'\bpiper\b',                       'Tier2', 'OEM',                   0.78),
    (r'\bbeechcraft\b',                  'Tier2', 'OEM',                   0.80),
    (r'\bhoneywel+\b',                   'Tier2', 'OEM',                   0.78),
    (r'\bge aviation\b',                 'Tier2', 'OEM',                   0.82),
    (r'\bge aerospace\b',                'Tier2', 'OEM',                   0.82),
    (r'\bpratt.*whitney\b',              'Tier2', 'OEM',                   0.82),
    (r'\brolls.?royce\b',                'Tier2', 'OEM',                   0.82),
    (r'\bsafran\b',                      'Tier2', 'OEM',                   0.78),
    (r'\bcollins aerospace\b',           'Tier2', 'OEM',                   0.80),
    (r'\brtx\b|\braytheon\b',            'Tier3', 'Defense Contractor',    0.78),
    # ── Known Defense companies → Tier3 ──────────────────────────────────────
    (r'\bnorthrop.?grumman\b',           'Tier3', 'Defense Contractor',    0.80),
    (r'\blockheed.?martin\b',            'Tier3', 'Defense Contractor',    0.80),
    (r'\bgeneral.?dynamics\b',           'Tier3', 'Defense Contractor',    0.78),
    (r'\bl3.?harris\b',                  'Tier3', 'Defense Contractor',    0.78),
    (r'\bsaab\b',                        'Tier3', 'Defense Contractor',    0.76),
    (r'\bbae systems\b',                 'Tier3', 'Defense Contractor',    0.78),
    (r'\bleonardo\b',                    'Tier3', 'Defense Contractor',    0.72),
    # ── Known Airlines → Tier3 ───────────────────────────────────────────────
    (r'\bjetblue\b',                     'Tier3', 'Airline',               0.90),
    (r'\ballegiant\b',                   'Tier3', 'Airline',               0.88),
    (r'\bdelta air\b|\bdelta airlines\b','Tier3', 'Airline',               0.90),
    (r'\bunited airlines\b',             'Tier3', 'Airline',               0.90),
    (r'\bamerican airlines\b',           'Tier3', 'Airline',               0.90),
    (r'\bsouthwest airlines\b',          'Tier3', 'Airline',               0.90),
    (r'\bfrontier airlines\b',           'Tier3', 'Airline',               0.90),
    (r'\bspirit airlines\b',             'Tier3', 'Airline',               0.90),
    # ── Known FBOs / Charter / Ground → Tier3 ────────────────────────────────
    (r'\bsignature aviation\b',          'Tier3', 'FBO/AMO',               0.88),
    (r'\bsignature flight\b',            'Tier3', 'FBO/AMO',               0.88),
    (r'\bflexjet\b',                     'Tier2', 'Charter Service',       0.88),
    (r'\bnetjets\b',                     'Tier2', 'Charter Service',       0.88),
    (r'\bvistajet\b',                    'Tier2', 'Charter Service',       0.88),
    (r'\bwheels up\b',                   'Tier2', 'Charter Service',       0.86),
    (r'\baircraft management\b',         'Tier3', 'Corporate Flight',      0.76),
    # ── Anti-persona companies ────────────────────────────────────────────────
    (r'\bfederal aviation administration\b|\bfaa\b', 'AntiPersona', 'Regulatory', 0.92),
    (r'\bnasa\b',                        'AntiPersona', 'Space Agency',    0.92),
    (r'\bcae\b',                         'LowPriority', 'Simulation/Training', 0.78),
    (r'\btextron aviation\b',            'Tier2', 'OEM',                   0.88),
    (r'\batlas air\b',                   'Tier3', 'Airline',               0.88),
    (r'\batlantic aviation\b',           'Tier3', 'FBO/AMO',               0.88),
    (r'\bthales\b',                      'Tier3', 'Defense Contractor',    0.80),
    (r'\bl3 technologies\b',             'Tier3', 'Defense Contractor',    0.82),
    (r'\bmarvin engineering\b',          'Tier2', 'Contract Manufacturer', 0.76),
    (r'defense contract management agency', 'AntiPersona', 'Government Agency', 0.90),
    (r'\bthe aerospace\b',               'LowPriority', 'Think Tank',      0.76),
    (r'\boliver wyman\b',                'LowPriority', 'Consulting',      0.76),
    (r'\bpleasant holidays\b',           'AntiPersona', 'Travel (not aviation parts)', 0.92),
    (r'\barcher\b',                      'AntiPersona', 'UAM/Drone',       0.82),
    (r'\bsupernal\b',                    'AntiPersona', 'UAM/Drone',       0.88),
    (r'\bjoby\b',                        'AntiPersona', 'UAM/Drone',       0.88),
    (r'\blilium\b',                      'AntiPersona', 'UAM/Drone',       0.88),
    (r'\bwisk\b',                        'AntiPersona', 'UAM/Drone',       0.88),
]

# ─── CLASSIFICATION LOGIC ────────────────────────────────────────────────────

def normalize(text):
    return (text or '').strip().lower()

def check_anti_persona_title(title_raw):
    title = normalize(title_raw)
    for pattern in ANTI_PERSONA_TITLES:
        if re.search(pattern, title, re.IGNORECASE):
            return True
    return False

def map_industry_class(raw):
    val = normalize(raw)
    if not val:
        return None
    for key, (tier, seg) in INDUSTRY_CLASS_MAP.items():
        if key in val:
            return tier, seg, 1.0, 'Aviation Industry Class field'
    return None

def match_patterns(text, patterns, source_label):
    text_lower = normalize(text)
    if not text_lower:
        return None
    for pattern, tier, segment, confidence in patterns:
        if re.search(pattern, text_lower, re.IGNORECASE):
            return tier, segment, confidence, f'{source_label}: matched "{pattern}"'
    return None

def classify_contact(row):
    industry_class = row.get('Aviation Industry Class', '')
    icp_field      = row.get('ICP', '')
    job_title      = row.get('Job Title', '')
    company        = row.get('Company Name', '')
    description    = row.get('Company Description', '')

    # Step 1: Anti-persona title override
    if check_anti_persona_title(job_title):
        return 'AntiPersona', 'Non-buyer/seller role', 0.90, f'Job title match: "{job_title[:60]}"'

    # Step 2: Direct Aviation Industry Class tag
    result = map_industry_class(industry_class)
    if result:
        return result

    # Step 3: ICP field — bare segment names
    result = match_patterns(icp_field, ICP_SEGMENT_PATTERNS, 'ICP segment')
    if result:
        return result

    # Step 4: ICP field — enriched persona labels
    result = match_patterns(icp_field, ICP_LABEL_PATTERNS, 'ICP label')
    if result:
        return result

    # Step 5: Company Description — segment/label patterns
    result = match_patterns(description, ICP_SEGMENT_PATTERNS, 'Company Description')
    if result:
        return result
    result = match_patterns(description, ICP_LABEL_PATTERNS, 'Company Description label')
    if result:
        return result

    # Step 6: Job Title patterns
    result = match_patterns(job_title, TITLE_PATTERNS, 'Job Title')
    if result:
        return result

    # Step 7: Company Name patterns
    result = match_patterns(company, COMPANY_PATTERNS, 'Company Name')
    if result:
        return result

    return 'Unknown', 'No signal found', 0.0, ''

# ─── FILE PROCESSING ─────────────────────────────────────────────────────────

def process_file(filepath, writer, counters, limit=None):
    filename = os.path.basename(filepath)
    list_type = filename.split('_')[0]

    with open(filepath, newline='', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            if limit and count >= limit:
                break
            tier, segment, confidence, reason = classify_contact(row)
            if writer:
                writer.writerow({
                    'Email':                          row.get('Email Address', ''),
                    'First Name':                     row.get('First Name', ''),
                    'Last Name':                      row.get('Last Name', ''),
                    'Company':                        row.get('Company Name', ''),
                    'Job Title':                      row.get('Job Title', ''),
                    'List Type':                      list_type,
                    'Country':                        row.get('Country', ''),
                    'Aviation Industry Class (original)': row.get('Aviation Industry Class', ''),
                    'ICP Field (original)':           row.get('ICP', ''),
                    'Inferred Tier':                  tier,
                    'Inferred Segment':               segment,
                    'Confidence':                     f'{confidence:.0%}',
                    'Match Reason':                   reason,
                })
            counters['tier'][tier] += 1
            counters['segment'][segment] += 1
            counters['file'][filename] += 1
            count += 1
    return count

def print_summary(counters, total):
    tiers = ['Tier1', 'Tier2', 'Tier3', 'LowPriority', 'AntiPersona', 'Unknown']
    print()
    print('═' * 65)
    print('  ICP CLASSIFICATION SUMMARY  (v2)')
    print('═' * 65)
    print(f'  Total contacts classified: {total:,}')
    print()
    print('  BY TIER:')
    for tier in tiers:
        n = counters['tier'].get(tier, 0)
        pct = (n / total * 100) if total else 0
        bar = '█' * int(pct / 2)
        print(f'    {tier:<14} {n:>8,}  ({pct:5.1f}%)  {bar}')

    print()
    print('  TIER 1 BREAKDOWN (57% of revenue):')
    for seg in ['Distributor', 'Broker', 'MRO', 'Likely Buyer', 'Likely Seller']:
        n = counters['segment'].get(seg, 0)
        if n:
            print(f'    {seg:<26} {n:>8,}')

    print()
    print('  TIER 2 BREAKDOWN:')
    for seg in ['OEM', 'Contract Manufacturer', 'Charter Service', 'Overhaul Shop']:
        n = counters['segment'].get(seg, 0)
        if n:
            print(f'    {seg:<26} {n:>8,}')

    print()
    print('  TIER 3 BREAKDOWN:')
    for seg in ['Airline', 'FBO/AMO', 'FBO/Airport', 'Defense Contractor', 'Corporate Flight']:
        n = counters['segment'].get(seg, 0)
        if n:
            print(f'    {seg:<26} {n:>8,}')

    print()
    print('  BY FILE:')
    for fname, n in sorted(counters['file'].items()):
        print(f'    {fname:<58} {n:>8,}')
    print('═' * 65)
    print()

# ─── MAIN ────────────────────────────────────────────────────────────────────

OUTPUT_FIELDS = [
    'Email', 'First Name', 'Last Name', 'Company', 'Job Title',
    'List Type', 'Country',
    'Aviation Industry Class (original)', 'ICP Field (original)',
    'Inferred Tier', 'Inferred Segment', 'Confidence', 'Match Reason',
]

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input',   help='Specific filename from export dir')
    parser.add_argument('--all',     action='store_true')
    parser.add_argument('--summary', action='store_true', help='Stats only, no output file')
    parser.add_argument('--limit',   type=int)
    parser.add_argument('--output',  help='Output CSV path')
    args = parser.parse_args()

    output_path = args.output or OUTPUT_FILE

    if args.all:
        files = [os.path.join(EXPORT_DIR, f) for f in ALL_FILES]
    elif args.input:
        files = [os.path.join(EXPORT_DIR, args.input)]
    else:
        files = [os.path.join(EXPORT_DIR, DEFAULT_FILE)]

    for f in files:
        if not os.path.exists(f):
            print(f'ERROR: File not found: {f}')
            return

    counters = {'tier': Counter(), 'segment': Counter(), 'file': Counter()}
    total = 0

    if args.summary:
        for filepath in files:
            print(f'Scanning {os.path.basename(filepath)}…')
            n = process_file(filepath, None, counters, limit=args.limit)
            total += n
    else:
        print(f'Writing to: {output_path}')
        with open(output_path, 'w', newline='', encoding='utf-8') as out_f:
            writer = csv.DictWriter(out_f, fieldnames=OUTPUT_FIELDS)
            writer.writeheader()
            for filepath in files:
                print(f'Processing {os.path.basename(filepath)}…')
                n = process_file(filepath, writer, counters, limit=args.limit)
                total += n
                print(f'  → {n:,} contacts processed')

    print_summary(counters, total)
    if not args.summary:
        print(f'Saved: {output_path}')


if __name__ == '__main__':
    main()
