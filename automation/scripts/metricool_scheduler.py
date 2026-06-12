#!/usr/bin/env python3
"""
Metricool Post Scheduler (OPTIONAL -- requires Metricool plan with API access)

Reads content-marketing/social-media-calendar-template.csv and schedules
posts via the Metricool API.

THIS IS A TEMPLATE/STARTING POINT, NOT A PLUG-AND-PLAY SCRIPT.
Metricool's API endpoint paths and payload schema occasionally change --
before running this for real, verify the current "Smart Posts / Scheduler"
endpoint against your account's API docs at:
    https://app.metricool.com/resources/apidocs/index.html
(log in, then the docs are account-specific/interactive).

Setup:
    1. In Metricool: Settings -> API Access, generate a User Token.
    2. Find your userId and blogId (blogId = brand ID, visible in the
       Metricool dashboard URL when viewing that brand).
    3. Set environment variables (do NOT hardcode secrets):
         export METRICOOL_USER_TOKEN="..."
         export METRICOOL_USER_ID="..."
         export METRICOOL_BLOG_ID="..."
    4. Run: python3 metricool_scheduler.py --dry-run
       (prints what WOULD be scheduled, without calling the API)
       Run without --dry-run once verified.

Authentication: Metricool uses a custom header X-Mc-Auth for the token,
plus userId and blogId as query parameters on every request.
"""

import argparse
import csv
import os
import sys

try:
    import requests
except ImportError:
    requests = None

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CALENDAR_CSV = os.path.join(BASE_DIR, "content-marketing", "social-media-calendar-template.csv")

API_BASE = "https://app.metricool.com/api"
# Verify this path against your account's live API docs before relying on it.
SCHEDULE_POST_PATH = "/v2/scheduler/posts"


def load_calendar():
    with open(CALENDAR_CSV, newline="", encoding="utf-8") as f:
        return [row for row in csv.DictReader(f) if row.get("Status", "").strip().lower() == "ready"]


def build_payload(row):
    """Map a calendar row to a Metricool post payload (adjust to match
    live API schema)."""
    return {
        "text": row.get("Caption Draft", ""),
        "providers": [row.get("Platform", "")],
        "publicationDate": {
            # Fill in real date/time logic based on Week/Day columns
            "dateTime": "2026-01-01T09:00:00",
            "timezone": "America/New_York",
        },
        "autoPublish": False,  # leave as draft for review in Metricool first
    }


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true",
                         help="Print payloads without calling the API")
    args = parser.parse_args()

    rows = load_calendar()
    if not rows:
        print("No rows with Status='Ready' found in the content calendar. "
              "Mark posts as 'Ready' once captions/graphics are finalized.")
        return

    token = os.environ.get("METRICOOL_USER_TOKEN")
    user_id = os.environ.get("METRICOOL_USER_ID")
    blog_id = os.environ.get("METRICOOL_BLOG_ID")

    for row in rows:
        payload = build_payload(row)
        if args.dry_run or not (token and user_id and blog_id):
            print(f"[DRY RUN] Would schedule: {payload}")
            continue

        if requests is None:
            print("The 'requests' library is required for live scheduling. "
                  "Install with: pip install requests")
            sys.exit(1)

        resp = requests.post(
            f"{API_BASE}{SCHEDULE_POST_PATH}",
            headers={"X-Mc-Auth": token},
            params={"userId": user_id, "blogId": blog_id},
            json=payload,
            timeout=30,
        )
        print(f"Status {resp.status_code}: {resp.text[:200]}")


if __name__ == "__main__":
    main()
