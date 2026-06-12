# Automation Tool Stack — Overview & Priorities

A practical, ROI-ordered stack. Start at #1, add the next once the previous
one is actually running (not just set up — *running*).

## 1. Google Sheets (Free) — Your CRM Backbone (Start Here)
You already have `referral-partners/partner-tracker.csv` and
`client-pipeline/pipeline-tracker.csv`. Import both into Google Sheets.
This becomes the hub everything else connects to until/unless you upgrade
to a dedicated mortgage CRM.

**Setup:** File → Import → Upload the CSV → "Replace spreadsheet." Do this
for both trackers, ideally in one Google Sheet with two tabs.

## 2. Zapier or Make.com (Free tier → ~$20-30/mo) — The Glue
Connects your lead forms, email, texting, and spreadsheet without code.
Zapier is more beginner-friendly; Make.com is cheaper at scale and more
flexible. Either works — **pick Zapier to start** (bigger template
library, easier troubleshooting).

## 3. A Lead Capture Form (Free-$20/mo)
Options, easiest to hardest:
- **Google Forms** (free) — bare-bones but works, connects to Sheets
  natively
- **Tally.so** (free) — nicer-looking forms, Zapier integration
- **Unbounce/Leadpages** ($) — if you want dedicated landing pages for ad
  campaigns later

## 4. Texting/Email Automation
- **Email:** Gmail + Zapier can handle simple sequences; for real drip
  campaigns, use **Mailchimp** (free up to 500 contacts) or a mortgage CRM
- **Texting:** Requires a TCPA-compliant platform with consent tracking —
  **do not** use personal-number mass texting tools. Options: SimpleTexting,
  EZ Texting (general business, has compliance features), or a mortgage CRM
  with built-in SMS (Jungo, Surefire, BNTouch)

## 5. Mortgage-Specific CRM (When Volume Justifies It, ~$100-300/mo)
Once you're getting 10+ leads/week, a dedicated CRM (Jungo on Salesforce,
Surefire, BNTouch, Shape) replaces #1-4 with built-in compliance, LOS
integration, and pre-built mortgage drip campaigns. Ask Baxter Mortgage if
they have a corporate license/discount before buying individually — many
brokerages provide one.

## 6. Content Tools (You Already Have Access)
- **Canva** (connected to this session) — design templates for the social
  posts in `content-marketing/social-post-templates.md`
- **Higgsfield** (connected to this session) — AI image/video generation
  for Reels/TikTok content
- **Metricool or Later** (free-$15/mo) — schedule posts across
  Instagram/Facebook/LinkedIn from one dashboard

## Monthly Cost Reality Check
| Stage | Tools | Approx. Cost/mo |
|---|---|---|
| Bootstrap (Month 1-2) | Google Sheets + Forms + Zapier Free + Mailchimp Free | $0 |
| Early growth (Month 3-6) | + Zapier paid + Tally + scheduler | ~$40-60 |
| Scaling (Month 6+) | + Mortgage CRM + paid ads budget | $150-500+ |

Don't buy the expensive stack before you've proven the manual process
works. Automation should remove friction from something you're already
doing successfully — not replace a process you haven't tested.
