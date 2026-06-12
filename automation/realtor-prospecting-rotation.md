# Daily Realtor Contact List — How It Works

"A new list every day" works like this: Maine has a finite number of
Realtors, so the system rotates through **regions** and **brokerages**,
surfacing a fresh batch each session while tracking everything in
`referral-partners/partner-tracker.csv` so nothing repeats and nothing
falls through the cracks.

## What "Today's List" Contains
Every day, ask Claude: **"Give me today's realtor contact list."**
Claude compiles a list combining:

1. **Follow-ups due today** — partners in your tracker whose
   `Next Action Date` is today/overdue, or who are due based on
   relationship-stage cadence (from `daily_briefing.py`).
2. **New prospects** — 3-5 new brokerages/agents from the next region in
   the rotation below, found via web search (brokerage directories,
   chamber of commerce listings — all public).

Each new prospect gets added to `partner-tracker.csv` as
"1 - New Contact" with a suggested next action (intro email or
lunch-and-learn call) and a note on where the info came from + a flag to
**verify contact info before outreach** (web search results can be stale).

## Region Rotation (cycle through, ~1 region per 1-2 days)
Rotating by region keeps prospecting geographically organized and matches
your statewide coverage:

1. Greater Portland / Cumberland County
2. Lewiston-Auburn / Androscoggin County
3. Bangor / Penobscot County
4. Midcoast (Brunswick, Bath, Rockland, Camden)
5. Augusta / Kennebec County
6. Southern Maine (Biddeford, Saco, Sanford)
7. Lakes Region (Bridgton, Naples, Sebago)
8. Down East (Ellsworth, Bar Harbor, Machias)
9. Western Maine (Farmington, Rumford, Bethel)
10. Aroostook County (Presque Isle, Caribou)

After region 10, start over — by then your early contacts are due for
cadence follow-ups anyway, and new agents/listings will have appeared.

## Quality Check Before Outreach
Web-search-sourced contacts are a **starting list**, not verified data.
Before sending the intro email:
- Confirm the person/office still operates under that name (brokerages
  merge/rebrand)
- Use the brokerage's official contact form/email if an individual email
  wasn't published
- Prefer calling the office to ask for the right person if no direct
  contact is available — this is also a natural warm intro

## Example (already added to your tracker)
On 2026-06-12, Claude pulled 4 Bangor-area contacts (Realty of Maine,
ERA Dawson-Bradford, Berkshire Hathaway HomeServices Northeast, and agent
Kurtis Marsh) into `partner-tracker.csv`. Next session, the rotation moves
to Region 1 (Greater Portland) or continues Bangor if you want deeper
coverage there first — just tell Claude which.
