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
| `open-house-flyer-workflow.md` | The step-by-step SOP Claude follows on every request |
| `payment-breakdown-flyer.html` | Print-ready template for the payment flyer (Claude fills the `{{fields}}`) |
| `market-snapshot-flyer.html` | Print-ready template for the market snapshot flyer |
| `realtor-give-templates.md` | The no-strings email + text you send with the flyers |
| `intake-checklist.md` | Exactly what to collect so a flyer set is complete |
| `examples/` | A fully worked example (Portland listing) so you can see the finished product |

## The One Compliance Rule That Matters Here

The payment flyer quotes numbers, so it *must* carry the full disclosures and
label all figures as **estimates for illustration only** — never a rate quote,
never a commitment to lend. The templates already bake this in. Don't delete
the footer, and follow `compliance/compliance-checklist.md`. When in doubt on a
specific rate, keep the flyer to "example scenarios" and drive the buyer to a
1:1 call with you.
