# Open-House Flyer Workflow (SOP Claude Follows)

Trigger: **"Build me the open-house flyer set."**
Inputs: a listing + realtor.com ZIP market data (see `intake-checklist.md`).
Outputs: two finished flyers + a give email, written to `lead-generation/output/`.

This is the SOP Claude runs every time. Steps are for Claude; Derek just
pastes the inputs and reviews the result.

---

## Step 1 — Parse the inputs
Pull from what Derek pasted:
- Listing: address, town, ZIP, list price, beds/baths/sqft, property type,
  taxes, HOA, open house date/time, listing agent + brokerage, photo (if any).
- Market: median list/sold price, days on market, price/sqft, active
  listings, trend %, sale-to-list ratio, market-type label.

For anything missing, estimate transparently:
- **Property taxes:** if not given, estimate from the town's mill rate ×
  assessed value (use list price as a proxy) and label it "estimated."
- **Rate:** if Derek didn't specify one, use a clearly labeled *example* rate
  and add it to the "confirm before printing" note. **Never present it as a
  quoted/locked rate.**
- **Homeowners insurance:** estimate ~0.35–0.5% of price annually if unknown,
  labeled "estimated."

## Step 2 — Compute the payment breakdown
For each scenario (default: Conventional 5% down, FHA 3.5% down, VA 0% down —
adjust to the expected buyer pool for that town), compute monthly **PITI**:

- **Loan amount** = price − down payment.
- **P&I** using the standard amortization formula:
  `M = P · [ r(1+r)^n ] / [ (1+r)^n − 1 ]`
  where `r` = monthly rate (annual/12), `n` = term in months (default 360).
- **Taxes** = annual property tax ÷ 12.
- **Insurance** = annual homeowners insurance ÷ 12.
- **Mortgage insurance:**
  - Conventional < 20% down → add estimated monthly PMI (~0.3–0.8% of loan
    amount annually; use ~0.5% as a labeled estimate).
  - FHA → add monthly MIP (~0.55% of loan amount annually, labeled estimate) —
    and note FHA's upfront MIP is typically financed.
  - VA → no monthly MI (note the one-time VA funding fee, often financed).
  - 20%+ down conventional → no PMI.
- **HOA/condo fee** = add if applicable.
- **PITI** = P&I + taxes + insurance + MI + HOA.

Round to the nearest dollar. Keep the math shown simple on the flyer (buyers
want the number, not the formula) but keep every assumption in the footnotes.

## Step 3 — Fill the payment flyer
Open `payment-breakdown-flyer.html`, replace every `{{field}}`, and write the
result to `lead-generation/output/<address-slug>-payment-flyer.html`.
- Headline frames attainability: e.g. "What Would It Cost To Own [Address]?"
- Show the scenario columns with the monthly PITI as the hero number.
- Keep the disclosure footer and Equal Housing logo — **never delete them.**
- Put "estimates for illustration only — not a commitment to lend, rates
  subject to change" prominently, per `compliance/compliance-checklist.md`.

## Step 4 — Fill the market snapshot flyer
Open `market-snapshot-flyer.html`, replace every `{{field}}`, and write to
`lead-generation/output/<zip>-market-snapshot.html`.
- Header: town + ZIP + "Market Snapshot — <month year>".
- Stat tiles: median price, days on market, $/sqft, active listings,
  trend, sale-to-list ratio.
- One short, honest "what this means for sellers" read (2–3 sentences, warm
  and expert per `branding/brand-guide.md` — no hype, no steering language).
- Source line: "Market data via realtor.com, <ZIP>, as of <date>."
- Keep the disclosure footer + Equal Housing logo.

## Step 5 — Render to shareable files
The `.html` files are print-ready at 8.5×11. Offer Derek finished output:
- These HTML files open and print straight from a browser (Cmd/Ctrl+P →
  "Save as PDF") — that's the fastest path to something sendable.
- If Derek wants polished/editable versions, offer to rebuild them as Canva
  designs following `automation/content-batching-sop.md` (reuse the Baxter
  navy/green template set). Ask before doing the Canva build — it's optional.

## Step 6 — Draft the give email + text
Using `realtor-give-templates.md`, personalize the no-strings note to the
listing agent (their name, the address, the open house date). This is the
lead-gen mechanism — keep it genuinely no-strings. Output it ready to send.

## Step 7 — Hand it back + log it
Give Derek:
1. The two flyer file paths (and a one-line summary of the key numbers).
2. The give email + text, ready to copy/paste.
3. A short "confirm before printing" list (any estimated fields — especially
   the rate and taxes).

Then log the touch: add/update a row in
`referral-partners/partner-tracker.csv` for that Realtor — note "sent
open-house flyer set for <address> on <date>" and set a next-action date to
follow up after the open house ("How'd the open house go?"). This is how the
give becomes a relationship instead of a one-off.

---

## Guardrails (every time)
- **Disclosures + Equal Housing logo stay on both flyers.** Non-negotiable.
- **No quoted/locked rates.** Everything is an illustration; drive to a 1:1.
- **No Fair Housing risk.** Describe the home and the numbers, never who
  "should" live there or the character of the neighborhood's residents.
- **RESPA:** these flyers are your own marketing that you're sharing — fine.
  Do **not** turn this into a cost-split/co-marketing arrangement with the
  Realtor without compliance review (see `compliance/compliance-checklist.md`).
- **Estimates are labeled as estimates**, always, with a confirm-before-print
  note back to Derek.
