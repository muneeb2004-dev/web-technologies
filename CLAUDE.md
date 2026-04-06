# PakStay — Pakistan Hotel Booking Platform

## Project Overview
A premium hotel booking website where Pakistani hotel owners list their properties and
users can discover and book them. Built with **HTML, CSS, JavaScript, jQuery, and AJAX**.

## Design Language: "The Verdant Archive"
Full spec in `gemini.md`. Key rules to always follow:

### Colors (Design Tokens)
```
--primary:            #2d5235   Forest Canopy — primary actions, brand
--surface:            #fefae6   Parchment Foundation — main background
--secondary:          #536254   Mist — supporting elements
--tertiary:           #6c3c47   Earth — warm accents
--surface-low:        #f8f4e0   alternate section backgrounds
--surface-container:  #f2eedb   card backgrounds
--surface-high:       #ece8d4
--surface-highest:    #e5e1cd
--surface-lowest:     #ffffff
--on-surface:         #1d1c10   (NEVER use pure black #000000)
--primary-container:  #456a4b
--secondary-container:#d6e7d4
```

### Typography
- **Headlines**: `Newsreader` (Google Fonts serif) — evokes trust and editorial depth
- **Body / Labels**: `Manrope` (Google Fonts sans-serif) — clean, geometric, legible

### Hard Rules
- **NO 1px solid borders** for section dividers — use background color shifts & whitespace
- **Ghost Borders only** on inputs: `outline_variant` at 15% opacity
- **Glass effects**: `backdrop-filter: blur(20px–30px)` + semi-transparent surface background
- **Ambient shadows**: blur 40px+, opacity 4–8%, green-tinted (`rgba(45,82,53,…)`)
- **64px+ spacing** between major sections
- **Intentional asymmetry** — not every element aligns to a strict grid

---

## Pages
| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, search, destinations, featured hotels, features, testimonials, CTA |
| `hotels.html` | Hotel listing — filters sidebar, sortable grid, search results |
| `hotel-details.html` | Single hotel — gallery, amenities, rooms, booking widget, reviews |
| `login.html` | User sign-in — split layout |
| `signup.html` | User registration — split layout |
| `about.html` | About PakStay — mission, team, stats |
| `contact.html` | Contact — form + info + FAQ |

## File Structure
```
hotel-booking/
├── index.html
├── hotels.html
├── hotel-details.html
├── login.html
├── signup.html
├── about.html
├── contact.html
├── css/
│   ├── style.css          ← Global design system: tokens, reset, navbar, footer, buttons
│   ├── home.css           ← Homepage-specific styles
│   ├── hotels.css         ← Hotel listing page
│   ├── hotel-details.css  ← Hotel details page
│   ├── auth.css           ← Login / Signup pages
│   └── pages.css          ← About / Contact pages
└── js/
    ├── main.js            ← Shared: navbar scroll, mobile menu, scroll-to-top
    ├── home.js            ← Homepage: search form, counter animation, wishlists
    ├── hotels.js          ← Listing: filters, sort, view toggle, AJAX placeholder
    ├── hotel-details.js   ← Details: gallery, booking widget, date math
    └── auth.js            ← Auth: form validation, password toggle
```

## Technology Stack
- **HTML5** — semantic markup (`<article>`, `<section>`, `<nav>`, `<main>`, etc.)
- **CSS3** — custom properties, Grid, Flexbox, backdrop-filter, clamp()
- **Vanilla JS (ES6)** — DOM manipulation, event handling
- **jQuery 3.7.1** (CDN) — used for DOM events, AJAX calls, animations, `.on()` delegation
- **AJAX** — placeholder `$.ajax()` calls written and commented; ready for real backend

## JavaScript Conventions
> **Every jQuery event listener and DOM manipulation must have a comment explaining what it does.**

```js
// Example pattern used throughout
// Listen for click on the search form submit button
$('#searchForm').on('submit', function(e) { ... });
```

## Future Phases
- Phase 2: Add PHP/Node backend, connect AJAX calls
- Phase 3: User dashboard (booking history, profile)
- Phase 4: Hotel owner dashboard (listings management)
- Phase 5: Admin dashboard (approvals, analytics)
