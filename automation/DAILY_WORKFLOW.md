# Your Daily Workflow (Run Entirely Through Claude)

This is the "complete AI tool" — it runs through this Claude Code session
(or any new session in this repo), using the data files you maintain plus
the scripts/templates already built. No external app needed.

---

## Every Morning: "Give me my daily briefing"

Just say that, and Claude will:
1. Run `automation/scripts/daily_briefing.py` — pulls overdue/due items
   from `client-pipeline/pipeline-tracker.csv` and
   `referral-partners/partner-tracker.csv`, plus today's content task from
   `content-marketing/social-media-calendar-template.csv`.
2. For each overdue/due item, draft the actual email/text using the
   matching template (from `referral-partners/realtor-outreach-templates.md`,
   `content-marketing/email-newsletter-templates.md`, or
   `client-pipeline/follow-up-sequences.md`) — personalized with the
   client/partner's actual name and details from the tracker.
3. Hand you a ready-to-send list: copy/paste into email or text, or ask
   Claude to send via your connected email if you've set that up.

**You provide:** updates to the CSVs as things change (new leads, stage
changes, closed loans, new partner contacts). The easiest way: tell Claude
in plain English — "John Smith just went under contract, FHA, $280k,
closing 7/15" — and Claude updates the CSV row for you.

---

## Daily: "Give me today's realtor contact list"

Claude combines (a) partners due for follow-up today from your tracker and
(b) a fresh batch of new Realtor/brokerage prospects from the next region
in the rotation (see `automation/realtor-prospecting-rotation.md`), adding
new rows to `partner-tracker.csv` automatically. You get a daily call/email
list without repeats.

## Weekly: "Find me new referral partners" + "Plan this week's content"

**New partners (deeper dive on a specific area):**
> "Find me 5 new Realtors in [Town] for my partner tracker"

Claude follows `automation/lead-finder-guide.md` — public license lookups
+ brokerage sites — and adds rows to `partner-tracker.csv`.

**Content planning:**
> "Plan and draft this week's social posts"

Claude fills in `content-marketing/social-media-calendar-template.csv`
with specific topics (rotating through `social-post-templates.md` and
`blog-topic-bank.md`), writes the captions, and — when you're ready —
generates graphics via Canva and video via Higgsfield following
`automation/content-batching-sop.md`.

---

## Monthly: "Run my monthly review"

Claude will:
1. Summarize closed loans this month → flag for review/referral requests
   (`client-pipeline/review-referral-request-templates.md`)
2. Check `referral-partners/partner-tracker.csv` for dormant relationships
   to re-engage
3. Draft the monthly newsletter (`content-marketing/email-newsletter-templates.md`)
4. Review `automation/ad-spend-tracker.csv` if running paid ads — flag
   what's working/not

---

## As-Needed: Specific Asks

- **"Draft a thank-you email to [Realtor] for the referral"** — Claude
  pulls their info from `partner-tracker.csv` and the right template
- **"Create a graphic for this week's USDA post"** — Canva, on-brand,
  using `branding/brand-guide.md` colors and the Equal Housing logo
- **"Make a 30-second Reel about FHA myths"** — Higgsfield, using the
  myth-busting script template
- **"What's my pipeline look like this month?"** — Claude summarizes
  `pipeline-tracker.csv` by stage/loan type
- **"Schedule this week's posts to Metricool"** — runs
  `automation/scripts/metricool_scheduler.py` (requires Metricool API
  access — see that script's header for setup)

---

## Email Sending
This toolkit drafts emails/texts for you to send. If you want Claude to
*send* emails directly (not just draft), that requires connecting an email
account (e.g., Gmail) via an MCP integration — ask in a session and we can
set that up. Until then, the safest and most personal approach is: Claude
drafts, you review and hit send — this also keeps a human check on every
compliance-sensitive message (see `compliance/compliance-checklist.md`).

---

## Keeping Data Fresh
The entire system is only as good as the CSVs. Two habits:
1. **End of each call/meeting:** tell Claude what happened — it updates the
   tracker.
2. **Monday mornings:** ask for the daily briefing first — it surfaces
   what's overdue before the week gets away from you.
