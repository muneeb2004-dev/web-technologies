# PakStay — Complete Site Architecture & Navigation Map

## 📂 CSS Architecture Explanation

### ⚠️ IMPORTANT: CSS Files are SEPARATE, Not Nested

**The CSS files are NOT linked to each other.** Each HTML page includes multiple CSS files directly in its `<head>` section.

### CSS Loading Pattern:
```html
<!-- Every page loads style.css FIRST (global styles) -->
<link rel="stylesheet" href="css/style.css">

<!-- Then loads page-specific CSS -->
<link rel="stylesheet" href="css/home.css">  <!-- or hotels.css, auth.css, etc. -->

<!-- Font Awesome is always last -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
```

### CSS File Breakdown:

| CSS File | Purpose | Used By |
|----------|---------|---------|
| **style.css** | **Global foundation** — Design tokens, CSS variables, reset, navbar, footer, buttons, utilities, responsive base | **ALL pages** (always loaded first) |
| **home.css** | Homepage-specific — Hero section, search card, stats bar, destinations, testimonials | index.html, hotel-details.html |
| **hotels.css** | Hotel listing styles — Filter sidebar, hotel cards, pagination, search bar | hotels.html, about.html, contact.html |
| **hotel-details.css** | Single hotel page — Gallery, lightbox, tabs, booking widget, reviews, room cards | hotel-details.html |
| **auth.css** | Authentication pages — Split layout, forms, password strength meter | login.html, signup.html |
| **pages.css** | Static pages — About mission, team cards, contact form, FAQ accordion | about.html, contact.html |

### How It Works:
1. **style.css** provides the foundation (colors, typography, navbar, footer, buttons)
2. **Page-specific CSS** adds unique layouts and components for that page type
3. **No CSS imports between files** — Each page loads what it needs directly in HTML

---

## 🗺️ Complete Site Navigation Map

```
┌─────────────────────────────────────────────────────────────────┐
│                         🏠 Homepage                              │
│                      (index.html)                                │
│                                                                  │
│  Components:                                                     │
│  • Hero with search form                                        │
│  • Stats bar (500+ hotels, 50+ cities)                          │
│  • Destination cards (Hunza, Lahore, Karachi, etc.)            │
│  • Featured hotels                                               │
│  • Features section                                              │
│  • Testimonials                                                  │
│  • CTA section                                                   │
│                                                                  │
│  CSS: style.css + home.css                                       │
│  JS: main.js + home.js                                          │
└────────────┬────────────────────────────────────────────────────┘
             │
             ├─────────────────────────────────────────────────────┐
             │                                                     │
             ▼                                                     ▼
┌─────────────────────────┐                    ┌─────────────────────────┐
│   🏨 Hotels Listing     │                    │   👤 Authentication     │
│    (hotels.html)        │                    │                         │
│                         │                    │  ┌───────────────────┐ │
│ Components:             │                    │  │   🔐 Login        │ │
│ • Page header           │                    │  │   (login.html)    │ │
│ • Search bar            │                    │  │                   │ │
│ • Filter sidebar:       │                    │  │  CSS: style.css   │ │
│   - Price range         │                    │  │       + auth.css  │ │
│   - Star rating         │                    │  │  JS: auth.js      │ │
│   - Amenities           │                    │  └─────────┬─────────┘ │
│   - City                │                    │            │           │
│ • Hotel cards grid      │                    │            ▼           │
│ • Grid/List toggle      │                    │  ┌───────────────────┐ │
│ • Sorting dropdown      │                    │  │  ✍️ Sign Up       │ │
│ • Pagination            │                    │  │   (signup.html)   │ │
│                         │                    │  │                   │ │
│ CSS: style.css          │                    │  │  CSS: style.css   │ │
│      + hotels.css       │                    │  │       + auth.css  │ │
│ JS: main.js             │                    │  │  JS: auth.js      │ │
│     + hotels.js         │                    │  │                   │ │
│                         │                    │  │  Features:        │ │
│                         │                    │  │  • Email validate │ │
└────────────┬────────────┘                    │  │  • Password meter │ │
             │                                  │  │  • Phone format   │ │
             │                                  │  │  • Account type   │ │
             ▼                                  │  │  • OAuth buttons  │ │
┌─────────────────────────┐                    │  └───────────────────┘ │
│  🏨 Hotel Details       │                    └─────────────────────────┘
│  (hotel-details.html)   │
│                         │
│ Components:             │
│ • Breadcrumb nav        │
│ • Image gallery (6+)    │
│ • Lightbox viewer       │
│ • Hotel overview        │
│ • Tabs:                 │
│   - Overview            │
│   - Rooms & Rates       │
│   - Amenities           │
│   - Reviews             │
│   - Location            │
│ • Booking widget        │
│   - Date picker         │
│   - Room selector       │
│   - Price calculator    │
│ • Reviews section       │
│ • Similar hotels        │
│                         │
│ CSS: style.css          │
│      + hotel-details.css│
│      + home.css         │
│ JS: main.js             │
│     + hotel-details.js  │
│                         │
│ ┌─────────────────────┐│
│ │  BOOKING WIDGET     ││
│ │  • Check-in/out     ││
│ │  • # of guests      ││
│ │  • Room type        ││
│ │  • Price total      ││
│ │  → Book Now button  ││
│ └─────────────────────┘│
└─────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      ℹ️ About Page                              │
│                      (about.html)                                │
│                                                                  │
│  Components:                                                     │
│  • Page header                                                   │
│  • Mission section                                               │
│  • Stats grid (hotels, guests, partners, cities)                │
│  • Values cards (Quality, Trust, Innovation, Sustainability)    │
│  • Team members grid                                             │
│  • CTA section                                                   │
│                                                                  │
│  CSS: style.css + pages.css + hotels.css                         │
│  JS: main.js                                                     │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     📧 Contact Page                             │
│                     (contact.html)                               │
│                                                                  │
│  Components:                                                     │
│  • Page header                                                   │
│  • Contact form (name, email, subject, message)                 │
│  • Contact info cards (Email, Phone, Address)                   │
│  • FAQ accordion (6 questions)                                   │
│                                                                  │
│  CSS: style.css + pages.css + hotels.css                         │
│  JS: main.js + contact.js ⚠️ (MISSING - needs to be created)    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Complete Navigation Flow

### Primary Navigation (Navbar - appears on ALL pages):
```
┌──────────────────────────────────────────────────────────────┐
│  PakStay    [Home] [Hotels] [About] [Contact]  [Sign In] [Register] │
└──────────────────────────────────────────────────────────────┘
```

### User Journey Paths:

#### Path 1: Browse & Book Flow
```
Index (Homepage) 
    → Search Hotels (hotels.html)
        → Select Hotel (hotel-details.html)
            → Click "Book Now"
                → ⚠️ Redirect to Login (if not logged in)
                    → Complete Booking
```

#### Path 2: Authentication Flow
```
Any Page
    → Click "Sign In" (login.html)
        → Or click "Create Account" → (signup.html)
            → After login → Return to previous page
```

#### Path 3: Information Flow
```
Index (Homepage)
    → Click "About" (about.html) - Learn about PakStay
    → Click "Contact" (contact.html) - Send message or read FAQ
```

#### Path 4: Direct Search Flow
```
Index (Homepage - Hero Search)
    → Enter: Destination + Dates + Guests
        → Click "Search"
            → Redirects to hotels.html with filters applied
```

---

## 📄 Complete Page Inventory

| # | Page | File | CSS Files Loaded | JS Files Loaded | Purpose |
|---|------|------|------------------|-----------------|---------|
| 1 | **Homepage** | `index.html` | style.css, home.css | main.js, home.js | Landing page, search, destinations |
| 2 | **Hotels Listing** | `hotels.html` | style.css, hotels.css | main.js, hotels.js | Browse & filter hotels |
| 3 | **Hotel Details** | `hotel-details.html` | style.css, hotel-details.css, home.css | main.js, hotel-details.js | View hotel, book room |
| 4 | **Login** | `login.html` | style.css, auth.css | auth.js | User sign in |
| 5 | **Sign Up** | `signup.html` | style.css, auth.css | auth.js | User registration |
| 6 | **About** | `about.html` | style.css, pages.css, hotels.css | main.js | Company info |
| 7 | **Contact** | `contact.html` | style.css, pages.css, hotels.css | main.js, contact.js | Contact form & FAQ |

---

## 🎨 CSS Layer Architecture

### Loading Order (Every Page):

```
1. style.css (Global Foundation)
   ├── Design Tokens (colors, spacing, shadows)
   ├── CSS Reset
   ├── Typography (Newsreader + Manrope fonts)
   ├── Navbar (transparent & solid variants)
   ├── Footer
   ├── Buttons (primary, secondary, sizes)
   ├── Forms (inputs, selects, checkboxes)
   ├── Utilities (text, spacing, display)
   └── Responsive Base

2. Page-Specific CSS (Extends Foundation)
   └── Unique layouts and components for that page type

3. Font Awesome (Icons)
   └── External CDN for all icons
```

### Example for Homepage (index.html):
```html
<head>
    <!-- 1. Global foundation -->
    <link rel="stylesheet" href="css/style.css">
    
    <!-- 2. Homepage-specific styles -->
    <link rel="stylesheet" href="css/home.css">
    
    <!-- 3. Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/.../font-awesome/6.5.0/css/all.min.css">
</head>
```

---

## 🔄 Interactive Features Map

### Global Features (All Pages):
- ✅ Navbar scroll behavior (transparent → glass effect)
- ✅ Mobile hamburger menu
- ✅ Scroll-to-top button
- ✅ Active nav link highlighting
- ✅ Footer with social links

### Homepage (index.html):
- ✅ Hero background parallax
- ✅ Search form with tabs (Hotels/Resorts/Guesthouses)
- ✅ Guest counter (+/- buttons)
- ✅ Animated stat counters (500+, 50+, 25000+)
- ✅ Wishlist toggle on destination cards
- ✅ Scroll indicator animation

### Hotels Page (hotels.html):
- ✅ Grid/List view toggle
- ✅ Price range slider
- ✅ Checkbox filter groups
- ✅ Sort dropdown
- ✅ Pagination
- ✅ Wishlist toggle on cards
- ⚠️ AJAX search (placeholder ready for backend)

### Hotel Details (hotel-details.html):
- ✅ Image gallery with lightbox (keyboard navigation)
- ✅ Tab switching (Overview/Rooms/Amenities/Reviews/Location)
- ✅ Date picker with validation
- ✅ Guest counter
- ✅ Room type selector
- ✅ Dynamic price calculation
- ✅ Review pagination
- ⚠️ Booking submission (placeholder ready for backend)

### Auth Pages (login.html, signup.html):
- ✅ Email validation
- ✅ Password strength meter (4 levels)
- ✅ Password visibility toggle
- ✅ Phone number formatting
- ✅ Form validation with error messages
- ⚠️ OAuth buttons (placeholder ready for backend)

### Contact Page (contact.html):
- ❌ Contact form validation (NEEDS contact.js)
- ❌ FAQ accordion toggle (NEEDS contact.js)
- ❌ Form submission (NEEDS contact.js)

---

## 📦 File Size Summary

### HTML Files (Total: 7 pages)
- index.html: ~788 lines
- hotels.html: ~701 lines
- hotel-details.html: ~737 lines
- about.html: ~292 lines
- contact.html: ~369 lines
- login.html: ~147 lines
- signup.html: ~213 lines
**Total: ~3,247 lines of HTML**

### CSS Files (Total: 6 files)
- style.css: ~819 lines (Global)
- home.css: ~866 lines (Homepage)
- hotels.css: ~652 lines (Listing)
- hotel-details.css: ~805 lines (Details)
- auth.css: ~399 lines (Auth)
- pages.css: ~523 lines (About/Contact)
**Total: ~4,064 lines of CSS**

### JavaScript Files (Total: 5 files, 1 missing)
- main.js: ~120 lines (Global)
- home.js: ~215 lines (Homepage)
- hotels.js: ~375 lines (Listing)
- hotel-details.js: ~410 lines (Details)
- auth.js: ~406 lines (Auth)
- contact.js: ❌ **MISSING** (needs to be created)
**Total: ~1,526 lines of JavaScript (complete), 1 file missing**

---

## ⚠️ Critical Notes

### CSS Architecture:
1. **No CSS file imports CSS from another file**
2. **Each HTML page loads multiple CSS files directly**
3. **style.css is ALWAYS loaded first** (provides foundation)
4. **Order matters** - Global → Specific → External

### Navigation Notes:
1. All internal links use **relative paths** (e.g., `href="hotels.html"`)
2. Navbar is **consistent across all pages** (same structure)
3. Footer is **identical on all pages** (same links)
4. Mobile menu is **shared JavaScript** (main.js)

### Missing Implementation:
1. ❌ **contact.js** - Critical file missing
2. ⚠️ **Backend API** - All AJAX calls are placeholders
3. ⚠️ **Database** - No real data, using static HTML

---

## 🎯 Quick Reference: "Which page uses which CSS?"

| Page | style.css | home.css | hotels.css | hotel-details.css | auth.css | pages.css |
|------|-----------|----------|------------|-------------------|----------|-----------|
| index.html | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| hotels.html | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ |
| hotel-details.html | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| login.html | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| signup.html | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| about.html | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| contact.html | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |

**Note:** hotel-details.html includes home.css for reusing search card and testimonial components.

---

## 🚀 Next Steps

1. **Create contact.js** to complete the frontend
2. **Test all navigation paths** end-to-end
3. **Verify responsive design** on all breakpoints
4. **Prepare for backend integration** (Phase 2)
