# Lead & Referral Partner Finder Guide (Public Records Only)

This is how to build your prospecting lists (Realtors, attorneys, etc.) for
`referral-partners/partner-tracker.csv` using legitimate public data — no
scraping, no ToS violations.

---

## 1. Maine Real Estate Licensee Search (Realtors/Brokers)

**Source:** Maine Office of Professional & Occupational Regulation (OPOR),
Real Estate Commission — public licensee search.
URL: `https://www.maine.gov/pfr/consumer/licensee-search`

This is a public-service search tool (similar to a phonebook). You can
search by:
- License type (Real Estate Sales Agent, Broker, Associate Broker)
- Name
- City/Town
- License status (active)

**How to use it with Claude each session:**
1. Tell Claude which town(s)/county you want to prospect this week (e.g.,
   "find active real estate brokers in Bangor and Brewer").
2. Claude will use WebFetch/WebSearch to query the public search tool and
   compile names, license numbers, and (where listed) brokerage
   affiliations.
3. Claude formats results into rows matching `partner-tracker.csv` —
   you review, add phone/email (often findable via the brokerage's public
   website — also fine, that's the brokerage publishing its own team's
   contact info), and import.

**Note:** This database typically does NOT include phone/email — just
name, license status, and brokerage. Cross-reference the brokerage's public
"Our Agents" page (e.g., a Coldwell Banker or Better Homes & Gardens Maine
office site) for contact info — brokerages publish this intentionally for
the public to find their agents.

---

## 2. Other Public-Record Sources for Referral Partners

| Category | Source | Notes |
|---|---|---|
| Real Estate Attorneys | Maine Board of Bar Overseers attorney lookup (mainebar.org) | Public, includes practice area filters |
| CPAs | Maine Board of Accountancy licensee search | Public |
| Insurance Agents | Maine Bureau of Insurance producer search | Public |
| Financial Planners | CFP Board "Find a CFP Professional" (public directory) | Public, searchable by location |
| Builders/Contractors | Maine doesn't license general contractors statewide, but local Home Builders Associations (e.g., Maine Association of Home Builders) publish member directories | Public directory |

---

## 3. Local Business Directories (Legitimate, No Scraping)
- **Chamber of Commerce member directories** — most Maine chambers
  (Portland Regional, Bangor, Lewiston-Auburn, etc.) publish member lists
  publicly. These are curated lists of local businesses actively looking
  for local connections — great prospecting source.
- **Google Maps / Google Business search** — manually searching "real
  estate agents near [town], Maine" and noting names/numbers shown publicly
  on Google is standard business research, not scraping (you're a human
  looking at public search results, not automating bulk extraction).

---

## 4. Weekly Prospecting Routine
Each week, ask Claude:
> "Find me 5 new Realtors in [Town/County] to add to my partner tracker,
> using the Maine licensee search and their brokerage websites."

Claude will:
1. Search the public licensee database for the area
2. Cross-reference brokerage sites for contact info
3. Output 5 new rows formatted for `partner-tracker.csv`
4. You review and decide who to reach out to using
   `referral-partners/realtor-outreach-templates.md`

This keeps your pipeline of *new* relationships growing every week without
any compliance/legal risk.

---

## What NOT to Do
- Don't use browser extensions or tools that bulk-export LinkedIn/Zillow/
  Instagram contact data — these violate platform ToS and can result in
  account bans (and reflect poorly on a licensed MLO if discovered).
- Don't purchase "scraped lead lists" from third-party data brokers without
  verifying TCPA/consent compliance — many of these lists create legal
  exposure when used for cold outreach.
