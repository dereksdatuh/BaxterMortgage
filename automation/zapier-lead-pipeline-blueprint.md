# Zapier Lead Pipeline Blueprint

Goal: a lead fills out a form (website, Facebook/Instagram lead ad, or
referral) → it lands automatically in your pipeline tracker → you get
notified instantly → the lead gets an immediate auto-response → they enter
a follow-up sequence if you don't manually move them.

This matches the **New Lead Follow-Up Cadence** in
`client-pipeline/follow-up-sequences.md` — the goal is to make Touch #1
(the 1-hour response) happen automatically even before you personally
respond.

---

## Prerequisite Setup (one-time)
1. Create a **Google Sheet** with two tabs:
   - `Pipeline` (import `client-pipeline/pipeline-tracker.csv`)
   - `Partners` (import `referral-partners/partner-tracker.csv`)
2. Create a lead form (Tally.so or Google Forms) with fields matching your
   pipeline columns: Name, Phone, Email, Source/Referred By, Loan Type
   Interest, Notes/Message.
3. Connect a Zapier account (zapier.com), free tier to start.

---

## Zap 1: New Lead → Add to Pipeline Sheet + Notify You

**Trigger:** New form submission (Tally/Google Forms) OR new Meta Lead Ads
lead (if running Facebook/Instagram lead ads — Zapier has a native "Meta
Lead Ads" trigger).

**Action 1 — Google Sheets: Create Row**
- Map form fields → `Pipeline` tab columns
- Set `Stage` = "1 - New Lead"
- Set `Last Contact Date` = today (Zapier formatter: current date)
- Set `Next Action` = "Call within 1 hour"
- Set `Next Action Date` = today

**Action 2 — SMS to yourself (via Zapier SMS-by-Zapier, free)**
> "🔔 New lead: [Name], [Phone], interested in [Loan Type]. Source:
> [Source]. CALL WITHIN 1 HOUR."

**Action 3 — Email auto-response to the lead**
Use the "New Lead Nurture — Immediately" template from
`content-marketing/email-newsletter-templates.md`:
- Subject: "Thanks for reaching out!"
- Body: personalize `[First Name]` using a Zapier text formatter to grab
  the first word of the Name field

---

## Zap 2: Stalled Lead Follow-Up (Day 3 nudge)

**Trigger:** Schedule by Zapier — runs daily, checks the Google Sheet

**Filter:** `Stage = "1 - New Lead"` AND `Last Contact Date` is 3+ days ago
(use a Formatter step to calculate days since last contact)

**Action — Email**
Send the "1 Week Later" nurture template — adjust to "3 days" wording, or
use as-is at day 7 with a second filter for 7+ days.

> Tip: Zapier's free plan limits you to single-step Zaps and longer polling
> intervals. For the "stalled lead" Zap, the paid "Multi-Step Zaps" + Filter
> + Formatter combo typically requires the Starter plan (~$20/mo). This is
> usually the first thing worth paying for.

---

## Zap 3: Realtor Referral Auto-Thank-You

**Trigger:** New row added to `Pipeline` sheet where `Source/Referred By`
is non-empty and matches a name in the `Partners` tab.

**Action — Lookup row in `Partners` tab** to get the Realtor's email.

**Action — Send email** using the "I Closed Your Client" template style,
but adapted to "Got your referral!" timing (send at lead intake, not just
at closing):

> Subject: Got it — thanks for sending [Lead Name] my way!
>
> Hi [Realtor Name], just a heads up that [Lead Name] reached out and I've
> already followed up. I'll keep you posted as things progress. Thanks for
> thinking of me!

This is a small touch that massively reinforces the referral relationship
— most LOs never close this loop, and Realtors notice.

---

## Zap 4: Closing → Review/Referral Request Trigger

**Trigger:** Row in `Pipeline` sheet updated where `Stage` changes to
"7 - Closed" (use Zapier's "Updated Row" trigger with a Filter)

**Action — Delay 14 days** (Zapier "Delay" action, paid feature) then send
the Google Review + Referral request email from
`client-pipeline/review-referral-request-templates.md`.

If on the free plan without Delay: instead, schedule this as a weekly
"Schedule by Zapier" Zap that scans for clients closed 14+ days ago who
haven't been sent the review request yet (add a `Review Requested? (Y/N)`
column to the sheet to track this).

---

## Meta (Facebook/Instagram) Lead Ads Setup Notes

1. In Meta Business Suite, create a **Lead Ad** campaign — these let users
   submit their info without leaving Instagram/Facebook (much higher
   conversion than sending to an external form).
2. Build the lead form fields to match your Pipeline sheet columns (Name,
   Phone, Email, plus a custom question like "What are you looking to do?"
   — Buy, Refinance, Just Exploring).
3. Connect Zapier's native "Facebook Lead Ads" trigger → feeds into Zap 1
   above.
4. **Compliance reminder:** any ad creative must follow
   `compliance/compliance-checklist.md` (NMLS#, Equal Housing, no rate
   claims without disclosures).

---

## Build Order (Realistic)
1. Week 1: Google Sheet + lead form live, manual entry working
2. Week 2: Zap 1 (new lead → sheet + notification + auto-email)
3. Week 3: Zap 3 (referral thank-you) — highest relationship ROI
4. Week 4+: Zap 2 (stalled lead nudge) and Zap 4 (review/referral ask)
5. Month 2+: Meta Lead Ads if budget allows ($10-20/day test budget is
   enough to start)
