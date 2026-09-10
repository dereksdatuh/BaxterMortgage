# Personal Finance Command Center — Derek Smith

**File:** `Derek_Smith_Financial_Command_Center.xlsx`
**Built:** September 10, 2026 · **Model date:** 9/10/2026

A live financial model for a commission-paid mortgage broker on a semi-monthly
draw. Twenty linked sheets, every number driven from a single `Inputs` control
panel. Nothing is hardcoded downstream — change an input, the whole workbook
re-solves.

## The five findings that came out of building it

1. **Your draw is semi-monthly, not bi-weekly — 24 checks a year, not 26.**
   Your own pay dates (3/31, 4/15, 4/30, 5/15, 5/29, 6/15, 6/30, 7/16, 7/30,
   8/14, 8/28) are the 15th and month-end. Annualized: **$29,557.92**, not
   $32,021.08. Budgeting on 26 overstates your income floor by $2,463/yr.
2. **If the draw is recoverable you are carrying a $13,547.38 liability**
   (11 × $1,231.58) that has to be earned back before a commission dollar
   reaches you. Get the answer in writing.
3. **Near-term overdraft risk.** $395.40 in checking against $865.84 due by
   10/14 (card 10/7, car 10/14), with one draw landing 9/15 in between.
4. **Your certificate may be the wrong account.** It pays 3.687% and auto-pulls
   $1,250 out of savings every quarter. If your HYSA pays more, that automatic
   roll moves money from a better account to a worse one — and locks it up.
5. **Your mortgage timeline is set by income history, not savings.** Commission
   income generally needs a 2-year track record to qualify. You started
   3/31/2026.

## Sheet map

| Sheet | What it does |
|---|---|
| `Start Here` | Colour legend, how to use it, every assumption I had to make |
| `Dashboard` | 15 KPI tiles + 4 charts + top priorities |
| `Inputs` | **The control panel.** Every driver. Blue = edit, yellow = confirm |
| `Deal Log` | Log each transaction; 75 bps calculates itself. Feeds everything |
| `Draw Recovery` | Every pay period, three comp structures side by side |
| `Break-Even` | Volume needed to survive / clear the advance / bank a profit |
| `Monthly Budget` | Line-item cost of living, fixed vs variable |
| `Cash Flow` | 36 months. Actuals from the log, forecast from the scenario |
| `Bill Calendar` | Day-by-day month; shows the mid-month cash squeeze |
| `Allocation Engine` | "A check just landed — where does it go?" |
| `Accounts` | Roll-forward of all six accounts + net worth |
| `Certificate Ladder` | 3-month rolls vs. leaving it in the HYSA |
| `Car Loan` | Full amortization + extra-payment testing |
| `Credit Builder` | Utilization mechanics, AZEO, 24-month sequence |
| `Tax Reserve` | 1099 vs W-2, quarterly estimates, the mileage deduction |
| `Retirement` | Roth projection + the cost of waiting one year |
| `Goals` | Ring / house / EF / Roth, and whether they actually fit |
| `Home Purchase` | DTI, max price by loan program, what the car costs you |
| `Marketing ROI` | $1,000/mo tracked against closings |
| `Recommendations` | 18 ranked actions with dollar impacts |

## The two toggles that change everything

On `Inputs`:

- **Is the draw RECOVERABLE?** (Yes/No)
- **Tax status** (1099 / W-2)

The model currently assumes the pessimistic case for both. These were the two
numbers I had to guess at, and they are the two with the largest effect on the
result.

## Colour convention

Blue = hardcoded input · Black = formula · Green = link to another sheet ·
**Yellow fill = confirm this number before relying on the output.**

---

*Planning model built from figures supplied by Derek Smith. Not tax, legal, or
investment advice. Confirm comp structure with the owner, tax status with a CPA,
and current agency/MaineHousing guidelines before acting on the housing section.*
