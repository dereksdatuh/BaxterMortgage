# Compliance Rules & Sign-Off Gate for Lead-Gen Flyers

**Read this before any flyer with numbers leaves your hands.** These flyers are
**advertisements** under federal law the moment they show a payment, a rate, or
a down payment. This file is the guardrail that keeps them compliant. It is
general guidance, **not legal advice** — Baxter Mortgage's compliance/legal team
has final say and must approve the template and your process (see
`compliance/compliance-checklist.md`).

---

## Why the payment flyer is the sensitive one
The **market-snapshot flyer** contains no credit terms — low risk (just keep the
"not an appraisal / not a guarantee of value" line and no Fair Housing steering).

The **payment-breakdown flyer** quotes payments, down payments, and terms. Under
**Regulation Z / Truth in Lending Act (12 CFR 1026.24)** those are
**"triggering terms."** The instant any one of them appears in an ad —
- the amount or percentage of a **down payment**,
- the number of payments or **period of repayment**,
- the **amount of any payment**, or
- the amount of any **finance charge** —

the ad **must also clearly and conspicuously state**:
1. The amount or percentage of the **down payment**.
2. The **terms of repayment** over the full loan term (e.g., "360 fixed monthly
   payments of principal & interest").
3. The **"Annual Percentage Rate," spelled out or as "APR"** — and, if it can
   increase after closing, that fact.

And separately (1026.24(c)): **if you state an interest rate, you must also state
the APR.** You cannot show a payment but hide the APR — the *payment itself* is
the trigger.

The template is built to satisfy all of this: every scenario card shows the
fixed **interest rate** and **APR**, the assumptions block states the **repayment
terms**, and the footer carries the required "advertisement / not a commitment
to lend" language. **Do not delete any of it.**

## The hard rules (never break these)
1. **APR is mandatory whenever a payment appears.** No payment number without a
   labeled APR right next to it.
2. **Use real numbers, from a real pricing scenario.** The rate and APR you print
   must come from your rate sheet / LOS for that day and that scenario — not a
   made-up number. APR must be calculated the standard way (rate + points/fees
   in the finance charge). If you don't have a true APR, the flyer stays in
   DRAFT and does not go out.
3. **Never call it an offer, preapproval, quote, or rate lock.** It's an
   illustration. The language says so; keep it that way.
4. **No guarantees** of approval, savings, or "lowest rate."
5. **Fair Housing:** describe the home and the numbers only. Never who "should"
   live there, and keep school ratings / demographic descriptors **off** the
   flyers (that's why the market snapshot omits them).
6. **RESPA:** co-branding one free flyer with the listing agent is fine. Do
   **not** let it become a recurring cost-split or Marketing Services Agreement
   without compliance review.
7. **Equal Housing logo + NMLS IDs** on every piece. Never removed.
8. **State licensing:** confirm the piece meets Maine (and any applicable state)
   MLO advertising rules with compliance.

## The DRAFT gate (default = locked)
Every generated payment flyer ships with a **"DRAFT — PENDING COMPLIANCE
REVIEW"** banner and a diagonal watermark **on by default**. They come off only
when **both** are true:
- [ ] A **real interest rate and real APR** (from an actual pricing scenario, as
      of a stated date) are entered for each program shown — not the example
      placeholder.
- [ ] **Baxter Mortgage compliance has reviewed and approved** this flyer (or has
      pre-approved the template and your standard use of it in writing).

Until both boxes are checked, the flyer is internal-only. Do not email it, print
it for an open house, or hand it to an agent.

## Per-flyer sign-off checklist (run every time before distribution)
- [ ] Every scenario shows a labeled **APR** and **interest rate**.
- [ ] Rate/APR are **real and current**, with an "accurate as of {date}."
- [ ] **Repayment terms** (number of payments, fixed) are stated.
- [ ] Down payment shown as amount and/or percent.
- [ ] Taxes/insurance/MI labeled **estimated**; price basis stated.
- [ ] Footer: "advertisement," "not a commitment to lend," NMLS IDs, Equal
      Housing, "subject to change," Consumer Access line — all present.
- [ ] No guarantees, no "offer/preapproval/lock" language.
- [ ] No Fair Housing / steering language; no school or demographic content.
- [ ] Compliance sign-off obtained (name + date): ____________________
- [ ] DRAFT banner + watermark removed **only after** the two boxes above.

## What Claude does automatically
When you run "Build me the open-house flyer set," Claude:
- Fills the APR/rate/repayment fields and keeps the DRAFT banner + watermark ON.
- Uses an **example** rate/APR labeled as such if you didn't supply real ones —
  and tells you, in the confirm-before-printing list, that they must be replaced
  with true figures **and** compliance-approved before the DRAFT gate comes off.
- Never removes the DRAFT gate on its own. You (with compliance) do that, and you
  tell Claude explicitly: "rate/APR are real and compliance approved — clear the
  draft gate," at which point Claude blanks the banner/watermark and re-renders.
