# Derek's Roadmap

**File:** `Derek_Roadmap.xlsx` · 14 sheets · 1,688 formulas · built September 2026

## Confirmed rules this model is built on

- The draw is **NON-RECOVERABLE** — leave with a balance and you owe nothing.
- But **100% of commission offsets** the running balance before extra pay reaches you.
- The advance grows by the **GROSS** draw (~$1,500/check), not the $1,231.58 net.
- Taxes are withheld → **W-2**. No quarterly estimates.
- Draws are **semi-monthly** (15th + month-end), **24/year**.

## The numbers that follow from that

| | |
|---|---|
| Draw balance to work through | **$16,500.00** (gross basis — not a debt) |
| Withholding rate | 17.89% |
| Monthly draw | $3,000 gross → **$2,463.16 net to you** |
| **Loans/month to hold even** | **1.33** at $300k · **1.14** at $350k |
| At 1 loan/month | balance **grows $750/mo** |
| At 2 loans/month @ $350k | works down $2,250/mo → clears in **8 months** |
| Living costs | $1,839.46/mo (+$1,000 marketing = $2,839.46) |
| Surplus on the draw alone | −$376.30/mo (+$623.70 if Baxter funds marketing) |

**The rule that shapes everything:** $36,000/yr is a guaranteed floor and is
never clawed back. But until the balance is worked through, take-home is the net
draw — closing three loans and closing none feel identical in the bank account.

**To hit $100k** at 75 bps on $350k loans: 38 loans a year, ~3.2 a month. About
14 of those replace the draw; the other 24 are money on top.

## Sheets

`Start Here` · `Roadmap` · `Dashboard` · `Inputs` · `Deal Log` · `Draw Payback` ·
`Budget` · `Cash Flow` · `Accounts` · `Money Split` · `Goals` · `Credit & Home` ·
`Savings & Retirement` · `Car Loan`

Log deals on **Deal Log**; **Roadmap** and **Draw Payback** re-date themselves.

## Still to confirm

Gross draw $1,500 (off a pay stub) · car insurance $165 · phone $60 · food $400 ·
fun $250 · car maintenance $90 · savings APY 4.00% · credit limit $5,000 ·
auto APR 7.49% · commission withholding 22%. Health insurance is $0 on the
assumption you're on a parent's plan — you age off at 26.

---

*Planning model built from figures supplied by Derek Smith. Not tax, legal, or
investment advice.*

## Why the file shows numbers

openpyxl writes formulas with no cached value, so every calculated cell renders
blank until something recalculates the workbook. LibreOffice (the usual tool for
this) does not run in the build environment, so `bake_values.py` evaluates all
1,687 formulas with the `formulas` engine and injects the results as cached
values directly into the sheet XML. Formulas stay live — Excel still
recalculates on open — but the workbook is readable in any viewer.

Re-run after changing the model:

```
pip install formulas
python personal-finance/bake_values.py personal-finance/Derek_Roadmap.xlsx
```

Verified against hand calculations: advance $16,500 · 1.33 loans/mo to stop the
balance growing · net draw $2,463.16/mo · living costs $1,839.46 · total out
$2,839.46 · surplus −$376.30.
