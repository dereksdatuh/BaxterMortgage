# LinkedIn Sales Navigator — Realtor Prospecting Recipe

A ready-to-use search setup for finding newer Maine real estate agents
(your highest-opportunity referral partners — hungrier for deal flow,
fewer entrenched lender relationships). Takes ~2 minutes to set up once
you have Sales Navigator (~$99/mo, Core plan).

---

## Step 1: Set Up the Saved Search

In Sales Navigator, go to **Search → Leads**, then apply these filters:

| Filter | Value |
|---|---|
| **Geography** | Maine (or narrow to a region: "Bangor, Maine Metropolitan Area," "Portland, Maine Metropolitan Area," etc.) |
| **Job Title** | "Real Estate Agent" OR "Realtor" OR "Real Estate Broker" (use the "add another title" option to include all three) |
| **Years in Current Position** | 1-2 years AND 3-5 years (select both ranges — Sales Navigator allows multi-select) |
| **Years of Experience** (if available as separate filter) | 1-5 years |
| **Industry** | Real Estate |

Click **Save Search** and name it: `Maine Realtors - New (1-5 yrs)`

Sales Navigator will email you weekly updates when new people match this
search — i.e., it surfaces brand-new agents automatically over time.

---

## Step 2: Sort & Triage Results

- Sort by **"Recently joined LinkedIn"** or **"Recently changed jobs"** —
  newer agents often update their profile right after getting licensed
  (new title, new company).
- Look for signals of "newer agent": profile says "Realtor at [Brokerage]"
  with a start date in the last 1-5 years, often paired with a previous
  unrelated career (career-changers are common in real estate and tend to
  be very relationship-receptive).

## Step 3: Export to Your Pipeline (Manual, ToS-Compliant)

Sales Navigator doesn't allow bulk auto-export, but for each promising
lead:
1. Note: Name, Brokerage, LinkedIn profile URL, Location
2. Add to **Sales Navigator Lists** (built-in feature) to keep them
   organized within LinkedIn
3. Transfer top picks (aim for 5-10/week) into
   `referral-partners/partner-tracker.csv` with:
   - `Category` = Realtor
   - `Relationship Stage` = 1 - New Contact
   - `Notes` = "Found via LinkedIn Sales Navigator [date], [X years] in role at [Brokerage]"

---

## Step 4: Find Their Email (Apollo.io / Hunter.io)

Once you have Name + Brokerage:
1. **Apollo.io** (free tier: 50 credits/month) — search by name + company
   domain, returns verified work email if available
2. **Hunter.io** (free tier: 25 searches/month) — alternative, especially
   good if you have the brokerage's website domain (e.g.,
   `realtyofmaine.com`)
3. If no email found: use LinkedIn's **InMail** (included with Sales
   Navigator) as your first outreach — it has higher open rates than cold
   email anyway for this audience

---

## Step 5: First-Touch Message (LinkedIn InMail)

Shorter than email — LinkedIn messages get read fast:

> Hi [Name] — congrats on building your real estate career in [Area]! I'm
> a local mortgage loan officer (Baxter Mortgage, statewide Maine) and
> always looking to connect with agents I can be a fast, reliable lending
> resource for — same-day pre-approvals, direct cell access, and I attend
> closings when I can. Would love to connect here and grab a coffee
> sometime if you're ever up for it. No pressure either way!
>
> Derek Smith | (207) 468-6998 | NMLS# 2810853

---

## Why "Newer Agents" Is a Smart Targeting Strategy
- They're actively building their referral network (vs. veteran agents who
  already have 1-2 "their lender" relationships locked in for years)
- Career-changers especially value a lender who explains things clearly —
  position yourself as the "teaching" LO, not just transactional
  (`maine-market-guide/loan-programs-cheat-sheet.md` gives you the
  talking points)
- If you build the relationship now while they're growing, you grow
  together — a newer agent who becomes a top producer in 5 years remembers
  who was there from the start

---

## Weekly Routine (Once Set Up)
1. Monday: Check Sales Navigator saved search for new matches
2. Pick 5-10 promising profiles, send InMail using the template above
3. Run Apollo/Hunter on anyone who doesn't respond to InMail within a week
   (fallback to email)
4. Log everything in `partner-tracker.csv`
5. Ask Claude for "today's realtor list" to combine this with cadence
   follow-ups on existing partners
