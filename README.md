# ERC Academy

Marketing and lead-generation site for **ERC Academy** — a Nicaragua-based cognitive/English language training program using applied neuroscience (the "Audible Memory Nurture" method) to build real spoken fluency without mental translation.

🔗 Live site: [ercacademynic.com](https://ercacademynic.com/)

## Overview

A single-page Spanish-language site built with Tailwind CSS (via CDN) covering:

- **Hero** — brand intro and primary calls to action (view offers / free level test)
- **Mission** — the ERC Method: Acoustic Bridge, the Feynman Technique, active recall
- **Methodology / Timeline** — 3-phase, 12-month progress roadmap (Acoustic Reconstruction → Narrative Retrieval → Feynman Mastery)
- **About** — founder bio, Carlos Mercado
- **Pricing** — investment tiers
- **Community** — Discord, email, and support hours
- **Reviews** — live Google Places reviews pulled in via the Google Maps JavaScript API
- **Registration** — multi-step sign-up form with progress bar and conditional fields
- Floating WhatsApp contact button

## Project Structure

```
.
├── index.html      # Page markup
├── styles.css      # Custom styles (glass panels, hero background, timeline, form, scrollbar)
├── script.js       # Multi-step form logic + Google Places reviews loader
├── about_us.jpg    # Founder photo (not included — add your own)
└── README.md
```

## Tech Stack

- [Tailwind CSS](https://tailwindcss.com/) (CDN build) — utility-first styling
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript) (Places library) — pulls in live Google reviews for the business
- [Google Analytics (gtag.js)](https://developers.google.com/analytics) — site analytics
- [Font Awesome](https://fontawesome.com/) — icons
- [Google Fonts](https://fonts.google.com/) — Inter
- Vanilla JavaScript — no build step or framework

## Getting Started

This is a static site with no build process.

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/erc-academy.git
   cd erc-academy
   ```
2. Add `about_us.jpg` (founder photo) to the project root.
3. Open `index.html` directly in a browser, or serve it locally:
   ```bash
   npx serve .
   ```

## Configuration

- **Google Maps API key** — the API key is embedded directly in the `<script>` tag in `index.html`. Replace it with your own key (restricted to your domain) if you fork this project.
- **Google Place ID** — the reviews section pulls from a specific business listing via `ERC_PLACE_ID` in `script.js`. Update this to your own Place ID.
- **Google Analytics ID** — update the `gtag('config', ...)` measurement ID in the `<head>` of `index.html`.
- **WhatsApp link** — update the floating WhatsApp button's `href` (`wa.me/...`) with your own number.
- **Registration form** — the multi-step form (`#erc-master-form` in `index.html`, logic in `script.js`) collects student info across 5 steps; wire up its submit handler to your own backend or form service as needed.
- **Social links** — update the YouTube, TikTok, Facebook, and Instagram URLs in the nav bar.

## Deployment

The site is live at [ercacademynic.com](https://ercacademynic.com/), served as a static site behind a custom domain. To deploy your own copy:

1. Push the repo to your host of choice (GitHub Pages, Netlify, Vercel, etc.).
2. Point your custom domain's DNS at the hosting provider.
3. Update the Google Analytics and Maps configuration as described above.

## License

All rights reserved — ERC Academy.
