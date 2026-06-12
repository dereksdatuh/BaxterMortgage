#!/usr/bin/env python3
"""
Daily Briefing Generator for Derek Smith / Baxter Mortgage

Reads the pipeline tracker, partner tracker, and content calendar CSVs and
prints a structured "what to do today" briefing: overdue/due client
follow-ups, referral partner outreach due, and today's content task.

Usage:
    python3 daily_briefing.py

Run this each morning (just ask Claude to run it). It does not modify any
files or send anything automatically -- it only reads and reports, so it's
safe to run anytime.
"""

import csv
import datetime
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

PIPELINE_CSV = os.path.join(BASE_DIR, "client-pipeline", "pipeline-tracker.csv")
PARTNER_CSV = os.path.join(BASE_DIR, "referral-partners", "partner-tracker.csv")
CALENDAR_CSV = os.path.join(BASE_DIR, "content-marketing", "social-media-calendar-template.csv")

TODAY = datetime.date.today()

# Cadence targets (days) by relationship stage -- matches
# referral-partners/partner-tracker-guide.md
PARTNER_CADENCE_DAYS = {
    "1 - new contact": 3,
    "2 - warming": 49,   # ~7 weeks (every 6-8 weeks)
    "3 - active": 30,
    "4 - core partner": 18,  # every 2-3 weeks
    "5 - dormant": None,  # handled separately
}


def parse_date(value):
    value = (value or "").strip()
    if not value:
        return None
    for fmt in ("%Y-%m-%d", "%m/%d/%Y", "%m/%d/%y"):
        try:
            return datetime.datetime.strptime(value, fmt).date()
        except ValueError:
            continue
    return None


def read_csv(path):
    if not os.path.exists(path):
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return [row for row in csv.DictReader(f) if any(v.strip() for v in row.values())]


def client_followups():
    rows = read_csv(PIPELINE_CSV)
    due, overdue, no_action = [], [], []
    for row in rows:
        name = row.get("Client Name", "").strip()
        if not name or name.lower().startswith("example"):
            continue
        stage = row.get("Stage", "").strip()
        if stage.lower().startswith(("7", "8", "9")):  # Closed / Past Client / Lost
            continue
        next_date = parse_date(row.get("Next Action Date", ""))
        action = row.get("Next Action", "").strip()
        if not next_date:
            if action:
                no_action.append(row)
            continue
        if next_date < TODAY:
            overdue.append(row)
        elif next_date == TODAY:
            due.append(row)
    return overdue, due, no_action


def partner_followups():
    rows = read_csv(PARTNER_CSV)
    due, overdue, cadence_due = [], [], []
    for row in rows:
        name = row.get("Name", "").strip()
        if not name or name.lower().startswith("jane example") or name.lower().startswith("john example"):
            continue
        next_date = parse_date(row.get("Next Action Date", ""))
        if next_date:
            if next_date < TODAY:
                overdue.append(row)
            elif next_date == TODAY:
                due.append(row)

        stage = row.get("Relationship Stage", "").strip().lower()
        cadence = PARTNER_CADENCE_DAYS.get(stage)
        last_contact = parse_date(row.get("Last Contact Date", ""))
        if cadence and last_contact:
            days_since = (TODAY - last_contact).days
            if days_since >= cadence:
                cadence_due.append((row, days_since))
    return overdue, due, cadence_due


def todays_content_task():
    rows = read_csv(CALENDAR_CSV)
    weekday = TODAY.strftime("%A")
    matches = [r for r in rows if r.get("Day", "").strip().lower() == weekday.lower()]
    return matches


def fmt_client(row):
    return (f"  - {row.get('Client Name','')} | {row.get('Stage','')} | "
            f"Loan: {row.get('Loan Type','')} | Action: {row.get('Next Action','')} "
            f"(due {row.get('Next Action Date','') or 'unset'})")


def fmt_partner(row, days_since=None):
    extra = f" | {days_since} days since last contact" if days_since is not None else ""
    return (f"  - {row.get('Name','')} ({row.get('Category','')}, {row.get('Company','')}) "
            f"| Stage: {row.get('Relationship Stage','')} | Next: {row.get('Next Action','')}{extra}")


def main():
    print(f"=== Daily Briefing for {TODAY.strftime('%A, %B %d, %Y')} ===\n")

    c_overdue, c_due, c_noaction = client_followups()
    print(f"CLIENT PIPELINE -- {len(c_overdue)} overdue, {len(c_due)} due today")
    for row in c_overdue:
        print(fmt_client(row) + "  *** OVERDUE ***")
    for row in c_due:
        print(fmt_client(row))
    if c_noaction:
        print(f"  ({len(c_noaction)} active clients have a Next Action but no date set -- add one)")
    print()

    p_overdue, p_due, p_cadence = partner_followups()
    print(f"REFERRAL PARTNERS -- {len(p_overdue)} overdue, {len(p_due)} due today, "
          f"{len(p_cadence)} due for cadence check-in")
    for row in p_overdue:
        print(fmt_partner(row) + "  *** OVERDUE ***")
    for row in p_due:
        print(fmt_partner(row))
    for row, days in p_cadence:
        print(fmt_partner(row, days) + "  (cadence check-in)")
    print()

    content = todays_content_task()
    print("CONTENT TASK FOR TODAY")
    if content:
        for row in content:
            print(f"  - [{row.get('Platform','')}] {row.get('Content Type','')}: "
                  f"{row.get('Topic/Theme','')} (Status: {row.get('Status','')})")
    else:
        print("  - Nothing scheduled for today in the content calendar.")
    print()

    print("NEXT STEPS")
    print("  1. Work through any '*** OVERDUE ***' items first.")
    print("  2. Ask Claude to draft any emails/texts needed for the items above")
    print("     (it will pull from referral-partners/realtor-outreach-templates.md,")
    print("     content-marketing/email-newsletter-templates.md, and")
    print("     client-pipeline/follow-up-sequences.md).")
    print("  3. Handle today's content task (or batch it -- see")
    print("     automation/content-batching-sop.md).")


if __name__ == "__main__":
    main()
