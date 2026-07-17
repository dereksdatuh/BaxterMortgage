# Lead Generation — The "Give, Give, Give, Take" Flyer Engine

This is your lead-gen tab. The whole strategy here is borrowed from how top
producers (Ryan Serhant–style) grow: **give value first, over and over, with
no ask attached — then, eventually, the business comes to you.**

The play in plain English:

> A Realtor has a listing with an open house coming up. You turn their
> listing + the local market data into two clean, branded flyers they can
> hand their seller and put out at the open house — for free, no strings.
> You look like a pro, their listing looks sharp, and your name (and NMLS#)
> is on a genuinely useful piece every buyer who walks through picks up.
> Do this enough times and Realtors start sending you their listings
> *asking* for the flyers — that's the "take" showing up on its own.

## What This Tab Produces (from one paste)

You give Claude a listing + the ZIP's market data (copied from realtor.com).
Claude gives you back, on-brand and print-ready:

1. **Payment Breakdown Flyer** — what a buyer's monthly payment looks like at
   this price, across a few down-payment / loan-program scenarios. Makes the
   home feel *attainable* to open-house visitors. (`payment-breakdown-flyer.html`)
2. **Market Snapshot Flyer** — a clean one-pager on that ZIP's market
   (median price, days on market, price/sqft, inventory, trend) so the
   listing agent can show their seller "here's where your home sits." Positions
   you as the local-market expert. (`market-snapshot-flyer.html`)
3. **The Give Email/Text to the Realtor** — a warm, genuinely no-strings note
   that sends the flyers over: *"Saw your open house this weekend — made you
   these, no charge, use them however helps. Congrats on the listing."*
   That email is the actual lead-gen mechanism. (See
   `realtor-give-templates.md`.)

## How To Use It (in a Claude Code session in this repo)

Just paste the two things in and say the trigger phrase:

> **"Build me the open-house flyer set."**
>
> Then paste:
> - The **listing** (address, price, beds/baths, sqft, open house date/time,
>   Realtor's name + brokerage, and a photo/link if you have it).
> - The **realtor.com market data** for that ZIP (median list/sold price,
>   days on market, price per sqft, # active listings, month-over-month or
>   year-over-year trend — whatever the realtor.com "Housing Market" page
>   for that ZIP shows).

Claude will follow `open-house-flyer-workflow.md`, fill both flyer templates,
render them to finished files in `lead-generation/output/`, and draft the
give email — all with the required NMLS + Equal Housing disclosures baked in.

## Files In This Tab

| File | What it's for |
|---|---|
| `COMPLIANCE-FLYER-REVIEW.md` | **Read first.** Reg Z trigger-term rules + the mandatory pre-distribution sign-off gate |
| `open-house-flyer-workflow.md` | The step-by-step SOP Claude follows on every request |
| `payment-breakdown-flyer.html` | Print-ready template for the payment flyer (Claude fills the `{{fields}}`) |
| `dscr-investor-loan-flyer.html` | Borrower-facing DSCR/investor-loan educational flyer — "qualify on the rent, not your income," with the four program tiers illustrated. No rates/payments, so low Reg Z risk; tiers kept generic (no wholesale-lender/proprietary program name) |
| `market-snapshot-flyer.html` | Print-ready template for the market snapshot flyer |
| `realtor-give-templates.md` | The no-strings email + text you send with the flyers |
| `intake-checklist.md` | Exactly what to collect so a flyer set is complete |
| `examples/` | A fully worked example (Portland listing) so you can see the finished product |

## Compliance — Read This (it's the whole ballgame on the payment flyer)

The payment flyer quotes payments, so under **Regulation Z / Truth in Lending
Act** it is an **advertisement with "triggering terms"** — which legally forces
it to also show a labeled **APR**, the **interest rate**, and the **repayment
terms**, plus "this is an advertisement / not a commitment to lend" language.
The template bakes all of this in. Because of that:

- Every generated payment flyer ships with a **"DRAFT — PENDING COMPLIANCE
  REVIEW"** banner + watermark that stay on until **both** (a) real rate + APR
  from an actual pricing scenario are entered, and (b) **Baxter Mortgage
  compliance has approved** it.
- Claude never removes that gate on its own and never certifies the piece as
  "compliant" — it builds to the rules and flags what you + compliance must
  verify. Final sign-off is yours.
- Full rules + the per-flyer sign-off checklist live in
  **`COMPLIANCE-FLYER-REVIEW.md`** (start there), alongside
  `compliance/compliance-checklist.md`.

The market-snapshot flyer has no credit terms and is low-risk — just keep its
"not an appraisal / not a guarantee of value" line and no Fair Housing steering.
