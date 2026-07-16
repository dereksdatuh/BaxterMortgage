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

## Step 3 — Fill the payment flyer (READ `COMPLIANCE-FLYER-REVIEW.md` FIRST)
This flyer is a **Regulation Z advertisement** the moment it shows a payment.
Every scenario **must** show a labeled **APR** and **interest rate**, the
**repayment terms**, and the full advertisement disclosure — the template has
these fields; fill them, never remove them. See `COMPLIANCE-FLYER-REVIEW.md`.

Open `payment-breakdown-flyer.html`, replace every `{{field}}`, and write the
result to `lead-generation/output/<address-slug>-payment-flyer.html`.
- Headline frames attainability: e.g. "What Would It Cost To Own [Address]?"
- Hero number = estimated total monthly payment (PITI).
- **Rate/APR fields** (`{{s1_rate}}`/`{{s1_apr}}` … per scenario):
  - If Derek supplied **real** rate + APR per program, use them and set
    `{{rate_as_of}}` to today and `{{apr_cost_basis}}` to what the APR assumes.
  - If not, fill each rate with a clearly-labeled example (e.g. "6.75%* example")
    and each APR with an estimate suffixed "* est." Estimate APR as note rate +
    ~0.15–0.30% (points/fees raise APR above the note rate). **These are
    placeholders** — they must be replaced with true figures from Derek's rate
    sheet before the DRAFT gate can come off.
- `{{n_payments}}` = term in months (e.g. "360"); `{{term_years}}` = years.
- **DRAFT gate — leave it ON.** Set `{{draft_banner}}` to:
  `<div class="draftbar">⚠ DRAFT — PENDING COMPLIANCE REVIEW · Not for distribution until real rate/APR are entered and Baxter Mortgage compliance has approved.</div>`
  and `{{draft_watermark}}` to:
  `<div class="watermark"><span>Draft · Pending Compliance</span></div>`
  **Never** blank these on your own. Only clear them when Derek explicitly says
  the rate/APR are real **and** compliance has approved — then set both to empty
  strings and re-render.
- Keep the disclosure footer and Equal Housing logo — **never delete them.**

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

## Step 4b — Fill the co-branded footer (both flyers)
Both flyers end in a co-brand bar: **Derek (loan officer) on the left, the
listing agent on the right**, each with a headshot circle + name + info.
- `{{derek_photo}}`: if `branding/assets/derek-headshot.jpg` exists, insert
  `<img src="../../branding/assets/derek-headshot.jpg" alt="Derek Smith">`;
  otherwise leave his initials ("DS") as the placeholder.
- `{{agent_photo}}`: if Derek gave a headshot link/file, insert an `<img>`
  pointing at it; otherwise use the agent's initials.
- `{{listing_agent}}`, `{{brokerage}}`, `{{agent_phone}}`, `{{agent_email}}`:
  from the intake. If agent phone/email weren't provided, drop that line rather
  than inventing contact info.
- **Compliance note:** co-branding a flyer with the listing agent (their
  listing, their photo, on a piece you produce and give for free) is normal
  listing-flyer practice. Do **not** let it become a recurring shared-cost or
  Marketing Services Agreement arrangement without compliance review — see
  RESPA notes in `compliance/compliance-checklist.md`.

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
   the rate/APR and taxes).
4. **The compliance status, stated plainly:** the payment flyer is in **DRAFT
   (pending compliance review)** and cannot be distributed until (a) real
   rate + APR are entered and (b) Baxter compliance has approved — point Derek
   to `COMPLIANCE-FLYER-REVIEW.md`. Do **not** imply the flyer is ready to send
   or that it is "compliant" on your say-so.

Then log the touch: add/update a row in
`referral-partners/partner-tracker.csv` for that Realtor — note "sent
open-house flyer set for <address> on <date>" and set a next-action date to
follow up after the open house ("How'd the open house go?"). This is how the
give becomes a relationship instead of a one-off.

---

## Guardrails (every time) — see `COMPLIANCE-FLYER-REVIEW.md` for the full rules
- **Reg Z (the big one):** any payment/down-payment/term on the flyer REQUIRES a
  labeled **APR**, **interest rate**, and **repayment terms** — all present in
  the template. Never show a payment without them.
- **DRAFT gate stays ON** until Derek confirms real rate/APR **and** compliance
  approval. Claude never clears it on its own.
- **Disclosures + Equal Housing logo + NMLS IDs stay on both flyers.** Non-negotiable.
- **Never an offer/preapproval/quote/lock.** Everything is a labeled illustration.
- **No guarantees** of approval, savings, or "lowest rate."
- **No Fair Housing risk.** Describe the home and the numbers, never who "should"
  live there. Keep school ratings + demographic descriptors off the flyers.
- **RESPA:** these flyers are your own marketing that you're sharing — fine.
  Do **not** turn this into a cost-split/co-marketing arrangement with the
  Realtor without compliance review.
- **Estimates are labeled as estimates**, always, with a confirm-before-print
  note back to Derek.
- **Claude does not certify compliance.** It builds to these rules and flags
  what Derek + Baxter compliance must verify. Final sign-off is theirs.
