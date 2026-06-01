#!/usr/bin/env python3
"""
PartsBase Marketing Budget Model
Adapted from CMO Advisor marketing_budget_modeler.py
Inputs calibrated to PartsBase marketplace model — $299/month supplier memberships
"""
import sys
sys.path.insert(0, "/Users/drodgers/Claude/Vetted Skills/c-level-advisor/cmo-advisor/scripts")

import math
from dataclasses import dataclass, field
from typing import Dict, List

# ---------------------------------------------------------------------------
# PartsBase-specific inputs
# ---------------------------------------------------------------------------

ARPU_MONTHLY = 342.63         # $342.63/month — Amelia L3M new cohort ARPU (Feb–May 2026)
GROSS_MARGIN = 0.72           # 72% marketplace gross margin (assumed — get actuals from finance)
MONTHLY_CHURN = 0.00225       # 2.7% annual churn = 0.225%/month — Amelia confirmed 2026-05-27
LTV = (ARPU_MONTHLY * GROSS_MARGIN) / MONTHLY_CHURN  # ~$109,642

ASP_ANNUAL = ARPU_MONTHLY * 12  # $4,112 ARR per new supplier (Amelia L3M)
TARGET_NEW_ARR = 180_000        # Year 1 program target (~50 new suppliers)

# Funnel rates — PartsBase supplier acquisition motion
# MQL→SAL: 80% (high intent — demo form or scoring threshold)
# SAL→SQL: 85% (SDR qualifies quickly — aviation fit is obvious)
# SQL→Opp: 90% (demo held = opportunity)
# Opp→Close: 28% (industry B2B benchmark, first 6 months)
MQL_TO_SAL = 0.80
SAL_TO_SQL = 0.85
SQL_TO_OPP = 0.90
OPP_TO_CLOSE = 0.28
MQL_TO_CLOSE = MQL_TO_SAL * SAL_TO_SQL * SQL_TO_OPP * OPP_TO_CLOSE

new_customers_needed = math.ceil(TARGET_NEW_ARR / ASP_ANNUAL)
total_mqls_needed = math.ceil(new_customers_needed / MQL_TO_CLOSE)

# Channels — PartsBase specific with aviation B2B benchmarks
CHANNELS = [
    # name, cac, max_mqls_per_month, trend
    ("Google Search (Brand)",       150,  15, "improving"),
    ("Google Search (Competitor)",  200,  10, "improving"),
    ("Google Search (Solution)",    250,  12, "stable"),
    ("LinkedIn Ads",                220,  12, "stable"),
    ("Google Display/Retargeting",   80,   6, "stable"),
    ("Outbound/Clay",               100,  10, "improving"),
    ("Organic SEO / Content",        75,  20, "improving"),
    ("Partnerships / PBExpo",        50,   5, "stable"),
]

def payback_months(cac):
    return cac / (ARPU_MONTHLY * GROSS_MARGIN)

print("=" * 70)
print("  PartsBase Marketing Budget Model — Supplier Acquisition")
print("=" * 70)
print(f"\n  ARPU (monthly):          ${ARPU_MONTHLY:,.0f}")
print(f"  ASP (annual):            ${ASP_ANNUAL:,.0f}")
print(f"  Gross Margin:            {GROSS_MARGIN*100:.0f}%")
print(f"  LTV:                     ${LTV:,.0f}")
print(f"  Annual Churn:            {MONTHLY_CHURN*12*100:.1f}%")
print(f"\n  Target New ARR (Year 1): ${TARGET_NEW_ARR:,.0f}")
print(f"  New Suppliers Needed:    {new_customers_needed}")
print(f"  MQL → Close Rate:        {MQL_TO_CLOSE*100:.1f}%")
print(f"  Total MQLs Required:     {total_mqls_needed}")

print("\n" + "=" * 70)
print("  Channel Analysis")
print("=" * 70)
print(f"  {'Channel':<32} {'CAC':>6}  {'Payback':>8}  {'LTV:CAC':>8}  {'Max MQL/mo':>10}  {'Trend'}")
print("-" * 70)
for name, cac, max_mqls, trend in CHANNELS:
    pb = payback_months(cac)
    ltv_cac = LTV / cac
    print(f"  {name:<32} ${cac:>5,}  {pb:>6.1f}mo  {ltv_cac:>7.1f}x  {max_mqls:>10}  {trend}")

print("\n" + "=" * 70)
print("  Budget Scenarios (Monthly at Steady State)")
print("=" * 70)

scenarios = [
    ("Conservative — Month 1",  9_000,  0.5),
    ("Moderate — Month 2",     13_500,  0.75),
    ("Full Deploy — Month 3",  17_500,  1.0),
]

for scenario_name, monthly_budget, scale in scenarios:
    print(f"\n  Scenario: {scenario_name}")
    print(f"  Monthly budget: ${monthly_budget:,}")
    print(f"  {'Channel':<32} {'Budget':>9}  {'Est. MQLs':>9}  {'Est. New ARR':>12}")
    print(f"  {'-'*65}")

    allocations = {
        "Google Search (Brand)":       (0.15, 0),
        "Google Search (Competitor)":  (0.10, 0),
        "Google Search (Solution)":    (0.17, 0),
        "LinkedIn Ads":                (0.28, 0),
        "Google Display/Retargeting":  (0.11, 0),
        "Outbound/Clay":               (0.08, 0),
        "Organic SEO / Content":       (0.11, 0),  # Fixed cost (content)
    }

    total_mqls = 0
    total_arr = 0
    for name, cac, max_mqls, trend in CHANNELS:
        # Find allocation pct
        alloc_pct = allocations.get(name, (0,0))[0]
        budget = monthly_budget * alloc_pct
        if cac > 0 and alloc_pct > 0:
            cpc_est = cac * 0.05  # Rough conversion: assume 5% of CAC is per click/lead cost ratio
            mqls = min(int(budget / cac * (1/MQL_TO_CLOSE) * MQL_TO_CLOSE * 3), max_mqls)
            # Simpler: MQLs = budget / CPL (CPL ≈ CAC * MQL_to_close)
            cpl = cac * MQL_TO_CLOSE
            mqls = min(int(budget / cpl), max_mqls)
            est_arr = mqls * MQL_TO_CLOSE * ASP_ANNUAL
            total_mqls += mqls
            total_arr += est_arr
            print(f"  {name:<32} ${budget:>8,.0f}  {mqls:>9}  ${est_arr:>11,.0f}")

    blended_cac = (monthly_budget / max(total_mqls * MQL_TO_CLOSE, 0.001)) if total_mqls > 0 else 0
    ltv_cac = LTV / blended_cac if blended_cac > 0 else 0
    print(f"  {'TOTAL':<32} ${monthly_budget:>8,}  {total_mqls:>9}  ${total_arr:>11,.0f}")
    print(f"  Blended CAC: ${blended_cac:,.0f}  |  LTV:CAC: {ltv_cac:.1f}:1  |  Payback: {payback_months(blended_cac):.1f} months")

print("\n" + "=" * 70)
print("  Key Insight")
print("=" * 70)
print(f"\n  At $300 CAC target and ${LTV:,.0f} LTV:")
print(f"  → Every $1 in CAC returns ${LTV/300:,.0f} in lifetime revenue")
print(f"  → Full $17,500/month budget at $300 CAC = {int(17500/300)} new suppliers/month potential")
print(f"  → Annual program at full deploy = {int(17500/300 * 12)} potential new suppliers")
print(f"  → Annual new ARR potential = ${int(17500/300 * 12) * ASP_ANNUAL:,.0f}")
print()
