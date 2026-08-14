# Sprint Plan — Seer Varisai Thattu Website

## Project Goal

Build a premium, modern, and highly interactive website for a family-run **Seer Varisai Thattu and traditional ceremonial gift arrangement business**.

The website should combine:

**South Indian Tradition + Luxury Branding + Modern UI/UX + Cinematic Animations**

The primary business goal is to showcase the family's work, build trust, attract customers, and generate enquiries for customized Seer Varisai arrangements.

---

# Development Strategy

Build the website incrementally.

Do not attempt to build the entire application at once.

The development should follow:

```text
Brand Foundation
       ↓
Design System
       ↓
Website Foundation
       ↓
Homepage
       ↓
Collections
       ↓
Product Experience
       ↓
Gallery
       ↓
Customization / Enquiry
       ↓
Mobile Optimization
       ↓
SEO + Performance
       ↓
Deployment
       ↓
Future Backend / Admin
```

---

# Sprint 0 — Project Foundation

## Goal

Set up the project and establish the development foundation.

### Tasks

* [x] Create Next.js application
* [x] Configure TypeScript
* [x] Configure Tailwind CSS
* [x] Configure ESLint
* [x] Configure App Router
* [x] Configure import aliases
* [x] Install shadcn/ui
* [x] Install Motion for React
* [x] Install GSAP
* [x] Install required icon library
* [x] Configure project structure
* [x] Create `components` architecture
* [x] Create `lib` utilities
* [ ] Create `data` directory
* [x] Create reusable layout components
* [x] Configure global styles
* [x] Configure fonts
* [x] Configure design tokens

### Deliverable

A clean, running Next.js project with the basic design-system infrastructure.

---

# Sprint 1 — Brand & Design System

## Goal

Create the visual foundation of the brand before building pages.

### Color System

Implement:

* [x] Deep Maroon — `#6B1F2A`
* [x] Antique Gold — `#B08D57`
* [x] Warm Ivory — `#FAF7F0`
* [x] Sand Beige — `#E8DCC8`
* [x] Dark Brown — `#2B2118`
* [x] Soft White — `#FFFDF8`

Create semantic tokens for:

* [x] Background
* [x] Foreground
* [x] Primary
* [x] Secondary
* [x] Accent
* [x] Muted
* [x] Card
* [x] Border
* [x] Success
* [x] Warning
* [x] Error

### Typography

Implement:

**Cormorant Garamond**

For:

* [x] Hero headings
* [x] H1
* [x] H2
* [x] H3
* [x] Editorial content

**Manrope**

For:

* [x] Body
* [x] Navigation
* [x] Buttons
* [x] Forms
* [x] Product information
* [x] UI

### Components

Create:

* [x] Button
* [x] Container
* [x] Section
* [x] Heading
* [x] Badge
* [x] Card
* [x] Image
* [x] Divider
* [x] Input
* [x] Select
* [x] Textarea
* [x] Modal

### Deliverable

A reusable design system that can support the entire website.

---

# Sprint 2 — Animation System

## Goal

Create the animation foundation before implementing complex page animations.

### Motion for React

Create reusable animations:

* [x] Fade In
* [x] Fade Up
* [x] Fade Down
* [x] Scale In
* [x] Stagger Children
* [x] Card Hover
* [x] Modal
* [x] Mobile Menu
* [x] Image Hover

### GSAP

Set up:

* [x] GSAP
* [x] ScrollTrigger
* [x] Animation utilities
* [x] Timeline utilities
* [x] Cleanup patterns
* [x] Reduced-motion handling

### Define

* [x] Animation durations
* [x] Easing curves
* [x] Stagger values
* [x] Scroll thresholds
* [x] Mobile animation rules

### Deliverable

A reusable animation system documented in:

```text
docs/animation.md
```

---

# Sprint 3 — Website Architecture & Navigation

## Goal

Build the global website structure.

### Pages

Create routes for:

```text
/
├── collections
├── collections/[slug]
├── products/[slug]
├── gallery
├── about
├── customize
└── contact
```

### Global Components

Build:

* [x] Navbar
* [x] Mobile navigation
* [x] Footer
* [x] Page container
* [x] Page transition
* [x] Scroll-to-top behavior
* [x] WhatsApp CTA
* [x] Global enquiry CTA

### Navigation

Desktop:

* [x] Logo
* [x] Home
* [x] Collections
* [x] Occasions
* [x] Gallery
* [x] About
* [x] Contact
* [x] Enquire CTA

Mobile:

* [x] Hamburger menu
* [x] Animated navigation panel
* [x] Touch-friendly navigation

### Deliverable

All pages should have a consistent global layout.

---

# Sprint 4 — Homepage Hero

## Goal

Create the most visually impressive section of the website.

### Hero

Build:

* [x] Full-width hero
* [x] Premium photography/video
* [x] Brand eyebrow
* [x] Main headline
* [x] Supporting description
* [x] Primary CTA
* [x] Secondary CTA
* [x] Decorative elements
* [x] Scroll indicator

### Animation

Use GSAP for:

* [x] Hero image reveal
* [x] Heading reveal
* [x] Text sequence
* [x] CTA entrance
* [x] Image scale
* [x] Scroll interaction

### Responsive

Implement:

* [x] Desktop hero
* [x] Tablet hero
- [x] Mobile hero
* [x] Mobile-specific image/video treatment

### Deliverable

A polished cinematic hero that immediately communicates the brand.

---

# Sprint 5 — Homepage Content Sections

## Goal

Build the complete homepage experience.

### Sections

* [x] Brand introduction
* [x] Featured collections
* [x] Signature arrangements
* [x] Occasions
* [x] Customization section
* [x] How it works
* [x] Gallery preview
* [x] About family business
* [x] Testimonials
* [x] Final CTA

### Animation

Implement:

* [x] Scroll reveals
* [x] Staggered cards
* [x] Image reveals
* [x] Subtle parallax
* [x] Hover interactions
* [x] CTA animations

### Deliverable

Complete homepage with polished desktop and mobile experiences.

---

# Sprint 6 — Collections

## Goal

Allow customers to explore different types of arrangements.

### Collection Categories

Possible categories:

* [ ] Wedding
* [ ] Engagement
* [ ] Seer Varisai
* [ ] Thamboolam
* [ ] Baby Shower
* [ ] Seemantham
* [ ] Housewarming
* [ ] Custom Arrangements

### Collection Page

Build:

* [ ] Page hero
* [ ] Category introduction
* [ ] Collection grid
* [ ] Filters if required
* [ ] Collection cards
* [ ] Image hover effects
* [ ] Responsive layout

### Deliverable

Customers can easily browse the business's offerings.

---

# Sprint 7 — Product / Arrangement Details

## Goal

Create a premium product-detail experience.

### Product Page

Include:

* [ ] Large product image
* [ ] Image gallery
* [ ] Product name
* [ ] Description
* [ ] Occasion
* [ ] Number of trays
* [ ] Starting price / price range if applicable
* [ ] Contents
* [ ] Customization information
* [ ] Enquiry CTA
* [ ] WhatsApp CTA
* [ ] Related arrangements

### Interactions

* [ ] Image gallery
* [ ] Thumbnail navigation
* [ ] Image zoom
* [ ] Smooth transitions
* [ ] Related product animations

### Deliverable

A customer can understand an arrangement and enquire about it.

---

# Sprint 8 — Gallery

## Goal

Showcase the family's real-world work.

### Gallery

Create:

* [ ] Masonry-style layout
* [ ] Featured images
* [ ] Category filtering
* [ ] Image hover
* [ ] Lightbox
* [ ] Smooth image transitions
* [ ] Mobile gallery

### Content

Use real photography of:

* [ ] Completed trays
* [ ] Wedding arrangements
* [ ] Flowers
* [ ] Fruits
* [ ] Gifts
* [ ] Decorations
* [ ] Behind-the-scenes preparation

### Deliverable

A visually compelling portfolio that builds customer trust.

---

# Sprint 9 — Customization / Enquiry Experience

## Goal

Create the primary conversion experience.

### Step 1 — Occasion

Allow customers to select:

* [ ] Wedding
* [ ] Engagement
* [ ] Baby Shower
* [ ] Seemantham
* [ ] Housewarming
* [ ] Other

### Step 2 — Requirements

Collect:

* [ ] Number of trays
* [ ] Preferred style
* [ ] Theme
* [ ] Required items
* [ ] Special requirements

### Step 3 — Event Information

Collect:

* [ ] Event date
* [ ] Location
* [ ] Approximate budget

### Step 4 — Customer Details

Collect:

* [ ] Name
* [ ] Phone number
* [ ] Email
* [ ] Additional message

### Step 5 — Confirmation

Display:

> Thank you. We will contact you shortly.

Provide:

* [ ] WhatsApp CTA
* [ ] Call CTA
* [ ] Enquiry confirmation

### Deliverable

A complete enquiry funnel that converts website visitors into potential customers.

---

# Sprint 10 — About & Trust

## Goal

Humanize the family business.

### About Page

Include:

* [ ] Family story
* [ ] Business story
* [ ] Philosophy
* [ ] Craftsmanship
* [ ] Why customers choose us
* [ ] Real family photographs
* [ ] Behind-the-scenes content

### Trust Elements

Add:

* [ ] Years of experience
* [ ] Number of events served
* [ ] Customer testimonials
* [ ] Service locations
* [ ] Quality promise

Only display real statistics and testimonials.

### Deliverable

Customers understand the people behind the business and feel comfortable contacting them.

---

# Sprint 11 — Mobile Experience

## Goal

Make mobile experience equal to or better than desktop.

### Tasks

* [x] Mobile navigation
* [x] Mobile hero
* [x] Mobile typography
* [x] Mobile gallery
* [x] Mobile product pages
* [x] Mobile enquiry form
* [x] Mobile CTA
* [x] Touch interactions
* [x] Animation optimization
* [x] Remove unnecessary desktop effects

### Test

Test on:

* [ ] Small mobile
* [ ] Large mobile
* [ ] Tablet
* [ ] Desktop
* [ ] Large desktop

### Deliverable

Fully responsive website.

---

# Sprint 12 — SEO

## Goal

Make the website discoverable through search engines.

### Tasks

* [ ] Page titles
* [ ] Meta descriptions
* [ ] Open Graph metadata
* [ ] Twitter/X metadata
* [ ] Sitemap
* [ ] Robots.txt
* [ ] Canonical URLs
* [ ] Structured data
* [ ] Image alt text
* [ ] Semantic HTML
* [ ] Local SEO information

### Target Search Intent

Examples:

```text
Seer Varisai Thattu
Seer Varisai Thattu Chennai
Wedding Seer Varisai
Traditional Wedding Gift Trays
Seer Varisai Decoration
Wedding Gift Tray Decoration
```

### Deliverable

SEO-ready website.

---

# Sprint 13 — Performance Optimization

## Goal

Make the premium website fast.

### Images

* [ ] Optimize images
* [ ] Use responsive images
* [ ] Lazy-load non-critical images
* [ ] Use appropriate image formats
* [ ] Optimize hero media

### Code

* [ ] Remove unused dependencies
* [ ] Reduce unnecessary JavaScript
* [ ] Optimize animations
* [ ] Lazy-load heavy components
* [ ] Avoid unnecessary client components

### Animation

* [x] Use transform/opacity where possible
* [x] Reduce mobile animations
* [x] Respect reduced motion
* [x] Prevent animation memory leaks
* [x] Clean up ScrollTrigger instances

### Deliverable

Fast website without sacrificing the premium visual experience.

---

# Sprint 14 — Testing & Quality

## Goal

Ensure the website is production-ready.

### Functional Testing

* [ ] Navigation
* [ ] Links
* [ ] Forms
* [ ] WhatsApp CTA
* [ ] Phone CTA
* [ ] Gallery
* [ ] Product pages
* [ ] Enquiry submission

### Visual Testing

Check:

* [ ] Typography
* [ ] Colors
* [ ] Spacing
* [ ] Images
* [ ] Responsive layouts
* [ ] Animations
* [ ] Hover states
* [ ] Loading states
* [ ] Error states

### Accessibility

* [ ] Keyboard navigation
* [ ] Focus states
* [ ] Contrast
* [ ] Alt text
* [ ] Form labels
* [ ] Reduced motion
* [ ] Screen-reader basics

### Browser Testing

Test:

* [ ] Chrome
* [ ] Safari
* [ ] Firefox
* [ ] Edge

### Deliverable

Production-ready website.

---

# Sprint 15 — Deployment

## Goal

Deploy the website and make it publicly accessible.

### Tasks

* [ ] Production environment
* [ ] Environment variables
* [ ] Domain configuration
* [ ] SSL
* [ ] Production build
* [ ] Deployment
* [ ] Analytics
* [ ] Search Console
* [ ] Sitemap submission
* [ ] Production testing

### Deliverable

Live production website.

---

# Phase 2 — Future Features

These should NOT block the first website launch.

## Admin Dashboard

Future features:

* [ ] Admin authentication
* [ ] Product management
* [ ] Collection management
* [ ] Gallery management
* [ ] Enquiry management
* [ ] Customer management
* [ ] Testimonial management
* [ ] Content management

---

## Database

Potential architecture:

```text
Next.js
    ↓
API
    ↓
PostgreSQL
    ↓
Products
Collections
Customers
Enquiries
Testimonials
Gallery
```

---

## Future Customer Features

Possible future additions:

* [ ] Online ordering
* [ ] Online payments
* [ ] Customer accounts
* [ ] Order tracking
* [ ] Custom arrangement builder
* [ ] Wishlist
* [ ] Reviews
* [ ] Notifications

These should only be implemented after the enquiry-driven website has been validated with real customers.

---

# Definition of Done

A sprint is considered complete only when:

* [ ] Feature works correctly
* [ ] Responsive design is implemented
* [ ] Mobile experience is tested
* [ ] Animations are smooth
* [ ] Accessibility basics are satisfied
* [ ] No console errors
* [ ] No obvious layout issues
* [ ] Loading states are handled
* [ ] Error states are handled where applicable
* [ ] Code is reusable
* [ ] Components follow the design system
* [ ] No unnecessary duplication
* [ ] Production build succeeds

---

# MVP Launch Scope

Do not wait for the entire future platform to be completed.

The first public launch should contain:

```text
Homepage
    ↓
Collections
    ↓
Product / Arrangement Details
    ↓
Gallery
    ↓
About
    ↓
Customization / Enquiry
    ↓
WhatsApp / Contact
```

The first version should focus on one goal:

> **Turn website visitors into genuine customer enquiries.**

---

# Final Product Vision

The finished website should feel like:

**A premium South Indian wedding boutique brought to life on the web.**

It should combine:

```text
Traditional Culture
        +
Premium Branding
        +
Beautiful Photography
        +
Modern UI/UX
        +
Cinematic Animation
        +
Simple Customer Journey
        =
Premium Family Business Website
```

The website should never sacrifice usability for visual effects.

**Beautiful first. Useful always. Fast underneath.**
