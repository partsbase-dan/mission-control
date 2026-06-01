#!/usr/bin/env python3
"""
mailchimp_audit.py — Pulls Mailchimp data NOT available via the Claude connector.

The Claude Mailchimp connector handles:
  - Campaign performance (open rate, click rate, bounce rate, unsubscribes)
  - Audience growth trends by month
  - Deliverability metrics

This script covers what the connector cannot:
  1. Audience/list inventory   — all lists, member counts, cleaned contacts, health stats
  2. Automations inventory     — classic automations: name, status, emails sent
  3. Tags & segments summary   — how contacts are organized
  4. JSON export               — saves everything locally for our records

Usage:
    python3 mailchimp_audit.py --api-key <key>
    python3 mailchimp_audit.py              # prompts for credentials
    python3 mailchimp_audit.py --test       # quick connection check only

Output:
    Prints a structured report + saves mailchimp_audience_report.json

Stdlib only — no external dependencies.
"""

import urllib.request
import urllib.error
import json
import base64
import sys
import os
import argparse
import time
from datetime import datetime, timezone

# Rate limiting — keeps well under Mailchimp's 10 req/sec cap
REQUEST_DELAY = 0.15  # seconds between every request

# Retry config for 429 / 5xx responses
MAX_RETRIES = 4
BACKOFF_BASE = 2  # doubles each retry: 2s, 4s, 8s, 16s


# ─── HTTP ────────────────────────────────────────────────────────────────────

def mailchimp_get(endpoint, api_key, server, params=None):
    base_url = f"https://{server}.api.mailchimp.com/3.0"
    url = f"{base_url}{endpoint}"
    if params:
        query = "&".join(f"{k}={v}" for k, v in params.items())
        url = f"{url}?{query}"

    credentials = base64.b64encode(f"anystring:{api_key}".encode()).decode()
    req = urllib.request.Request(url, headers={
        "Authorization": f"Basic {credentials}",
        "Content-Type": "application/json",
    })

    for attempt in range(MAX_RETRIES + 1):
        try:
            time.sleep(REQUEST_DELAY)
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            if e.code == 429:
                retry_after = e.headers.get("Retry-After")
                wait = int(retry_after) if retry_after else BACKOFF_BASE ** attempt
                print(f"  Rate limited on {endpoint}. Waiting {wait}s (attempt {attempt + 1}/{MAX_RETRIES})...")
                time.sleep(wait)
            elif e.code >= 500 and attempt < MAX_RETRIES:
                wait = BACKOFF_BASE ** attempt
                print(f"  Server error {e.code} on {endpoint}. Retrying in {wait}s...")
                time.sleep(wait)
            else:
                body = e.read().decode()
                print(f"  HTTP {e.code} on {endpoint}: {body[:200]}")
                return None
        except urllib.error.URLError as e:
            if attempt < MAX_RETRIES:
                wait = BACKOFF_BASE ** attempt
                print(f"  Network error: {e.reason}. Retrying in {wait}s...")
                time.sleep(wait)
            else:
                print(f"  Failed after {MAX_RETRIES} retries on {endpoint}: {e.reason}")
                return None

    print(f"  Gave up on {endpoint} after {MAX_RETRIES} retries.")
    return None


def fetch_all(endpoint, key, api_key, server, params=None):
    """Paginate through all results for a given endpoint."""
    results = []
    offset = 0
    count = 100
    while True:
        p = {"count": count, "offset": offset}
        if params:
            p.update(params)
        data = mailchimp_get(endpoint, api_key, server, p)
        if not data:
            break
        items = data.get(key, [])
        results.extend(items)
        total = data.get("total_items", 0)
        offset += count
        if offset >= total:
            break
    return results


# ─── FORMATTERS ──────────────────────────────────────────────────────────────

def fmt_pct(val):
    return f"{val * 100:.1f}%" if val is not None else "n/a"

def fmt_num(val):
    return f"{val:,}" if val is not None else "n/a"


# ─── SECTION 1: AUDIENCES ────────────────────────────────────────────────────

def audit_audiences(api_key, server):
    print("\n=== AUDIENCES (LISTS) ===")
    print("  (Campaign performance is pulled via the Claude connector — this covers list health only)\n")

    lists = fetch_all("/lists", "lists", api_key, server, {
        "fields": "lists.id,lists.name,lists.stats,lists.date_created,total_items"
    })

    audience_data = []
    for lst in lists:
        stats = lst.get("stats", {})
        info = {
            "id": lst["id"],
            "name": lst["name"],
            "date_created": lst.get("date_created", "")[:10],
            "member_count": stats.get("member_count", 0),
            "unsubscribe_count": stats.get("unsubscribe_count", 0),
            "cleaned_count": stats.get("cleaned_count", 0),
            "open_rate": stats.get("open_rate"),
            "click_rate": stats.get("click_rate"),
            "avg_sub_rate": stats.get("avg_sub_rate"),
            "avg_unsub_rate": stats.get("avg_unsub_rate"),
        }
        audience_data.append(info)

        print(f"  [{info['name']}]  (created {info['date_created']})")
        print(f"    Active members:  {fmt_num(info['member_count'])}")
        print(f"    Unsubscribed:    {fmt_num(info['unsubscribe_count'])}")
        print(f"    Cleaned/bounced: {fmt_num(info['cleaned_count'])}")
        print(f"    Avg open rate:   {fmt_pct(info['open_rate'])}")
        print(f"    Avg click rate:  {fmt_pct(info['click_rate'])}")
        print()

    return audience_data


# ─── SECTION 2: TAGS & SEGMENTS ──────────────────────────────────────────────

def audit_segments(api_key, server, audience_data):
    print("\n=== TAGS & SEGMENTS ===")
    print("  (Shows how contacts are organized within each audience)\n")

    segment_summary = []
    for aud in audience_data:
        list_id = aud["id"]
        list_name = aud["name"]

        segments = fetch_all(f"/lists/{list_id}/segments", "segments", api_key, server, {
            "fields": "segments.id,segments.name,segments.type,segments.member_count,total_items"
        })

        if not segments:
            print(f"  [{list_name}] No segments or tags found.")
            continue

        print(f"  [{list_name}] — {len(segments)} segments/tags")
        for s in segments[:10]:  # cap display at 10 per audience
            print(f"    {s.get('type', '').upper():10} {s.get('name', 'n/a'):40} {fmt_num(s.get('member_count', 0))} members")
        if len(segments) > 10:
            print(f"    ... and {len(segments) - 10} more")
        print()

        segment_summary.append({
            "audience_id": list_id,
            "audience_name": list_name,
            "segments": segments,
        })

    return segment_summary


# ─── SECTION 3: AUTOMATIONS ──────────────────────────────────────────────────

def audit_automations(api_key, server):
    print("\n=== AUTOMATIONS (Classic) ===")
    print("  (Customer Journeys must be checked directly in the Mailchimp app)\n")

    data = mailchimp_get("/automations", api_key, server, {"count": 100})
    if not data:
        print("  No access or none found.")
        return []

    automations = data.get("automations", [])
    if not automations:
        print("  No classic automations configured.")
        return []

    auto_data = []
    for a in automations:
        settings = a.get("settings", {})
        info = {
            "id": a["id"],
            "title": settings.get("title", "Untitled"),
            "status": a.get("status", ""),
            "emails_sent": a.get("emails_sent", 0),
            "start_time": (a.get("start_time") or "")[:10],
        }
        auto_data.append(info)
        status_label = info["status"].upper()
        print(f"  [{status_label}] {info['title']}")
        print(f"    Started: {info['start_time'] or 'n/a'} | Emails sent: {fmt_num(info['emails_sent'])}")
        print()

    return auto_data


# ─── SUMMARY ─────────────────────────────────────────────────────────────────

def print_summary(audiences, automations):
    print("=" * 55)
    print("SUMMARY — AUDIENCE & AUTOMATION LAYER")
    print("(Campaign performance metrics: see Claude connector widgets)")
    print("=" * 55)

    total_active = sum(a["member_count"] for a in audiences)
    total_unsubs = sum(a["unsubscribe_count"] for a in audiences)
    total_cleaned = sum(a["cleaned_count"] for a in audiences)
    total_all = total_active + total_unsubs + total_cleaned

    print(f"\n  Total audiences:         {len(audiences)}")
    print(f"  Total active contacts:   {fmt_num(total_active)}")
    print(f"  Total unsubscribed:      {fmt_num(total_unsubs)}")
    print(f"  Total cleaned/bounced:   {fmt_num(total_cleaned)}")
    print(f"  Total ever added:        {fmt_num(total_all)}")

    if total_all > 0:
        health = total_active / total_all * 100
        print(f"\n  List health score:       {health:.1f}% active")
        if health < 60:
            print("  ⚠️  Low health — high proportion of unsubscribed/cleaned contacts.")
        elif health < 80:
            print("  ⚠️  Moderate health — worth auditing list sources.")
        else:
            print("  ✓  Healthy list ratio.")

    active_autos = sum(1 for a in automations if a["status"] == "sending")
    print(f"\n  Classic automations:     {len(automations)} total, {active_autos} active")
    if active_autos == 0:
        print("  ⚠️  No active automations — all email is manual/one-off sends.")


# ─── TEST MODE ────────────────────────────────────────────────────────────────

def run_test(api_key, server):
    print("\n[TEST MODE] Checking connection and account info...\n")
    ping = mailchimp_get("/", api_key, server)
    if not ping:
        print("Connection failed. Check your API key and server prefix.")
        sys.exit(1)
    print(f"  ✓ Connected")
    print(f"  Account name:    {ping.get('account_name', 'unknown')}")
    print(f"  Account email:   {ping.get('email', 'unknown')}")
    print(f"  Total contacts:  {fmt_num(ping.get('total_subscribers'))}")
    print(f"  Plan:            {ping.get('plan_type', 'unknown')}")
    print("\n[TEST PASSED] Run without --test for the full audience audit.")


# ─── MAIN ─────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Mailchimp audience & automation audit (complements Claude connector)"
    )
    parser.add_argument("--api-key", help="Mailchimp API key")
    parser.add_argument("--server", help="Server prefix (e.g. us1, us14)")
    parser.add_argument("--test", action="store_true", help="Quick connection check only")
    args = parser.parse_args()

    api_key = args.api_key or os.environ.get("MAILCHIMP_API_KEY") or input("Mailchimp API key: ").strip()
    server = args.server or os.environ.get("MAILCHIMP_SERVER")

    if not server:
        if "-" in api_key:
            server = api_key.split("-")[-1]
            print(f"  Detected server prefix: {server}")
        else:
            server = input("Server prefix (e.g. us1, us14): ").strip()

    print(f"\nConnecting to Mailchimp ({server})...")

    if args.test:
        run_test(api_key, server)
        return

    ping = mailchimp_get("/", api_key, server)
    if not ping:
        print("Failed to connect. Check your API key and server prefix.")
        sys.exit(1)
    print(f"Connected as: {ping.get('account_name', 'unknown')}\n")

    audiences   = audit_audiences(api_key, server)
    segments    = audit_segments(api_key, server, audiences)
    automations = audit_automations(api_key, server)
    print_summary(audiences, automations)

    report = {
        "generated": datetime.now(timezone.utc).isoformat(),
        "account": ping.get("account_name"),
        "note": "Campaign performance metrics pulled separately via Claude Mailchimp connector.",
        "audiences": audiences,
        "segments": segments,
        "automations": automations,
    }
    out_path = os.path.join(os.path.dirname(__file__), "mailchimp_audience_report.json")
    with open(out_path, "w") as f:
        json.dump(report, f, indent=2)
    print(f"\n  Full report saved to: {out_path}")


if __name__ == "__main__":
    main()
