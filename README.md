# Waggin' Tails Doggy Day Care — website (2026-07-13 rebuild)

Professional rebuild of the one-page marketing site. Supersedes `../app/`
(kept for reference). Static HTML/CSS/JS, no build step, GitHub Pages ready.

## What's inside

- `index.html` — single page: hero, trust strip, services, "A Day Here" band,
  "Life at Waggin' Tails" gallery (8 real photos), "The PupToons" (6 AI cartoon
  + original-photo pairs from the page's timeline), community proof, FAQ,
  contact (call + email form), footer. LocalBusiness + FAQPage JSON-LD, OG tags.
  NOTE: the former Halloween "PupTumes/Costume Fun" section was REMOVED
  2026-07-13 — its photos belonged to a same-name business in Northglenn,
  Colorado (see ../notes/pupfun-rework-2026-07-13.md). Rebuild it only with
  owner-supplied costume photos.
- `css/styles.css` — token-based design system derived from the REAL business
  logo (`assets/img/logo-wt*.png`, pulled from the Facebook page): navy
  `#1d2f5e`, sand `#d7c59d`, gold `#f4b740`, cream. Poppins + Inter.
- `js/main.js` — nav toggle, scroll reveals (reduced-motion aware), AJAX form.
- `assets/img/` — WebP derivatives with srcset widths, generated from
  `../assets/facebook/originals/` (70-photo authenticated pull) and the
  accepted PupTumes set. OG share image `og-waggin-tails.jpg` (1200x630).

## Launch gates (single remaining config + owner confirmations)

1. **Contact form delivery**: create a free Formspree form pointed at the
   owner's inbox, paste its endpoint into `FORM_ENDPOINT` at the top of
   `js/main.js`. Until then the form politely redirects people to the phone.
2. Owner confirms: phone (269) 579-3201, address 10868 Cressey Rd Plainwell,
   service-area wording, hours/rates language, and photo usage sign-off
   (customers' dogs appear in the photos).
3. On deploy, update the two `data-update-on-deploy` URLs in `<head>`
   (canonical + og:image) to the real GitHub Pages URL.

## Deploy (GitHub Pages)

```bash
cd site
git init && git add -A && git commit -m "Waggin' Tails site"
gh repo create waggin-tails --public --source=. --push
gh api repos/{owner}/waggin-tails/pages -X POST -f build_type=workflow \
  || echo "enable Pages on main / root in repo settings"
```

Do not deploy without Chris's explicit "push live".

## Verification (2026-07-13)

Desktop 1440 and mobile 390: zero horizontal overflow, all images load,
zero console errors. Mobile is strictly one image per column; the PupTumes
strip is a one-card-at-a-time swipe carousel. Screenshots in the session
scratchpad and `../evidence/` if copied.
