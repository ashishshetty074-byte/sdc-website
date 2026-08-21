# Sakthi Dental Clinic — Website

A 5-page responsive website built for Sakthi Dental Clinic, Hosur, Tamil Nadu, as a real client deliverable for the ShadowFox Internship (Intermediate Level).

**Live site:** https://ashishshetty074-byte.github.io/sdc-website/
  
  Netlify: https://zingy-lily-909d64.netlify.app

## How I Understood the Requirement

The program's Intermediate Level brief asked for a single client-style **landing page** with a hero, features/services, pricing, testimonials, a CTA, and a contact form.

The actual client brief for Sakthi Dental Clinic, however, described a **multi-page site** — Home, About Us, Treatments, Contact, and Privacy Policy — with no pricing information anywhere in the source material. Rather than force the client's real requirements into a single-page mold, I treated the client brief as the source of truth (since this was framed as a genuine client deliverable) and mapped the program's required sections onto the appropriate pages:

| Program requirement | Where it lives on this site |
|---|---|
| Hero section | Home page hero |
| Features/services section | Home page "Why Choose Us" + Treatments preview, expanded fully on the Treatments page |
| Pricing section | A "Consultation & Treatment Pricing" CTA block on Home — since the client brief had no pricing data, this transparently directs visitors to request a personalized quote rather than inventing numbers |
| Testimonials/trust section | Auto-rotating testimonial carousel on Home, using the client's real patient quotes |
| CTA section | "Fix an Appointment" CTA repeated at key decision points (hero, pricing band, sticky mobile bar) |
| Contact/lead capture form | Full validated contact form on the Contact page |

I resolved a few other ambiguities the same way — by checking the source brief rather than guessing:
- **FAQs** (14 Q&As in the brief, no page assignment given) → placed as an accordion on Home, linked from Treatments, since FAQs are typically consulted right after browsing services.
- **Brand colors** (brief said "pastel lavender/white" for overall feel but "blue/pink" for accents) → resolved by using lavender as the base palette, pink for primary CTAs, and blue for secondary/informational elements — satisfying both descriptions rather than picking one.
- **Real assets** — banner photos, treatment photos, and amenity icons were sourced directly from the client's provided files rather than stock placeholders, since this was a real deliverable.

## Site Structure

- **Home** — hero, trust/assurance banner, why-choose-us pillars, treatments preview, pricing CTA, testimonials, amenities, FAQ accordion, footer
- **About Us** — founder's story (Dr. Anupriya), Vision & Mission, full doctor team grid
- **Treatments** — all 16 treatments in detail, 3 with real clinical photos
- **Contact** — validated appointment/inquiry form + clinic info
- **Privacy Policy** — client-provided legal text, verbatim

## Usability & Clarity Decisions

- **Consistent navigation** across all 5 pages with active-page highlighting, so users always know where they are.
- **Progressive disclosure** on the FAQ and Treatments pages (accordion, scannable sections) instead of a wall of text — keeps the page usable despite dense clinical content.
- **Repeated, low-friction CTAs** ("Fix an Appointment") at natural decision points, rather than a single CTA the user has to hunt for.
- **Colors defined once, as CSS variables** in `css/style.css` — meaning the entire site's theme can be changed by editing a handful of values in one place, without touching any page markup.
- **Mobile-first responsive layout**, including a sticky bottom appointment bar on small screens where a fixed top CTA would otherwise be lost while scrolling.
- **Motion used purposefully, not decoratively** — scroll-reveal, animated counters, and the testimonial carousel draw attention to trust-building content (credentials, patient outcomes) rather than being animation for its own sake.

## Tech Stack

Static HTML/CSS/JS — no framework, no build step required. Chosen deliberately for this task: it keeps the deliverable easy to host anywhere (including free GitHub Pages), easy for a non-technical clinic owner's future web person to edit, and matches the scope of an intermediate-level task without over-engineering.

## Project Structure

```
sdc-website/
├── index.html          Home
├── about.html           About Us
├── treatments.html      Treatments
├── contact.html         Contact
├── privacy.html         Privacy Policy
├── css/style.css        All styling; colors as CSS variables in :root
├── js/main.js           Nav toggle, scroll reveal, testimonial carousel,
│                        FAQ accordion, animated counters, form validation
└── assets/
    ├── banners/         Real clinic interior photos
    ├── treatments/      Real treatment photos (implants, laser surgery, denture)
    └── amenities/       Real clinic amenity icons
```

## Running Locally

Just open `index.html` in a browser, or serve the folder with any static server:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Changing the Color Theme

All brand colors live in `:root` at the top of `css/style.css`. Update the hex values there and the entire site — buttons, headings, backgrounds, accents — updates automatically.
