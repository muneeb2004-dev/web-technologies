# ShopPK - Responsive E-Commerce Landing Page

This folder contains the fully responsive version of the ShopPK e-commerce landing page.

## What Was Changed

### Files Created
- **labtask-1/index.html** - Same as assignment-1 HTML structure
- **labtask-1/css/style.css** - Enhanced CSS with comprehensive responsive media queries

### Responsive Features Added

#### 1. Tablet Layout (max-width: 1024px)
- Product grid reduced from 4 columns to 2 columns
- Footer grid reduced from 4 columns to 2 columns
- Section padding reduced for better fit

#### 2. Mobile Layout (max-width: 768px)

**Top Bar:**
- Contact info hidden to save space
- Smaller font size and reduced padding

**Navbar:**
- Logo size reduced (28px → 22px)
- Search bar hidden on mobile
- Cart icon size reduced (24px → 20px)
- Login button made smaller with reduced padding
- Navigation links wrapped with reduced spacing

**Hero Section:**
- Heading size reduced (52px → 32px)
- Tag and subtext font sizes reduced
- Button size reduced with adjusted padding
- Section padding reduced (90px → 50px)

**Category Cards:**
- Grid changed from 6 columns to 3 columns
- Icon size reduced (36px → 28px)
- Card padding reduced
- Gap between cards reduced

**Product Cards:**
- Grid changed from 4 columns to 2 columns
- Smaller font sizes for product info
- Reduced padding throughout
- Gap between cards reduced

**Promo Banner:**
- Heading size reduced (50px → 32px)
- Section padding reduced (70px → 45px)
- Button and text sizes adjusted

**Newsletter:**
- Form layout changed from row to column (stacked)
- Input and button made full width
- Fully rounded corners on all sides
- Reduced padding

**Footer:**
- Grid changed from 4 columns to 2 columns
- All font sizes reduced
- Padding reduced

#### 3. Small Mobile Layout (max-width: 480px)

**Category Cards:**
- Grid changed from 3 columns to 2 columns

**Product Cards:**
- Grid changed from 2 columns to 1 column (single column)
- Images made 100% width
- Buttons full width

**Footer:**
- Grid changed to single column
- All content center-aligned
- Social links centered
- Hover padding effect removed

**Hero & Promo:**
- Headings further reduced (32px → 26px)
- Buttons made full width with max-width constraint

**General:**
- Container padding reduced
- Section titles made smaller (20px → 18px)

### CSS Comments

Every media query and CSS rule inside them includes detailed comments explaining:
- What the rule does
- Why it's needed
- How it improves mobile experience

Example comment patterns used:
- `/* DISPLAY NONE: hiding search bar on mobile to save space */`
- `/* GRID COLUMNS: changing from 4 columns to 2 columns on mobile */`
- `/* FONT SIZE: making heading smaller so it fits on mobile screen */`
- `/* WIDTH 100%: making button full width on mobile for easier tapping */`
- `/* TEXT ALIGN CENTER: centering footer content on mobile */`

### Testing Recommendations

Test the page on:
- **Desktop** (above 1024px) - Full 4-column product grid, 6-column category grid
- **Tablet** (768px - 1024px) - 2-column product grid, 3-column category grid
- **Mobile** (480px - 768px) - 2-column layouts with hidden search
- **Small Mobile** (below 480px) - Single column product grid, centered footer

### Browser Compatibility

The responsive design uses:
- CSS Grid (modern browsers)
- Flexbox (all modern browsers)
- Media queries (all browsers)
- No JavaScript required

All features work in modern browsers (Chrome, Firefox, Safari, Edge).
