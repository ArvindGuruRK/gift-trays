# Animation System — Seer Varisai Thattu

## 1. Purpose

Create a sophisticated animation system for the Seer Varisai Thattu website that combines **traditional elegance, premium luxury, and modern web interaction**.

Animations should enhance the storytelling and emotional experience of the website without distracting from the products, photography, content, or conversion flow.

The animation system should feel:

* Elegant
* Smooth
* Cinematic
* Premium
* Subtle
* Intentional
* Natural
* Responsive

Avoid excessive animations, unnecessary movement, bouncing elements, flashy effects, or animations that make the website feel like a generic AI-generated landing page.

---

# 2. Animation Libraries

Use two animation libraries with clearly separated responsibilities.

## Motion for React

Use **Motion for React** for normal React UI interactions and component-level animations.

Primary use cases:

* Button interactions
* Hover effects
* Card animations
* Dropdowns
* Mobile navigation
* Modals
* Dialogs
* Form interactions
* Small entrance animations
* Component transitions
* Layout animations
* Micro-interactions
* Simple scroll-triggered reveals

Motion should be the default animation solution for most UI components.

---

## GSAP

Use **GSAP** for advanced, cinematic, timeline-based, and scroll-driven animations.

Primary use cases:

* Hero animations
* Complex timelines
* Scroll storytelling
* Parallax
* Pinned sections
* Horizontal scrolling sections
* Image transformations
* Large-scale page transitions
* Text reveal sequences
* Multi-element synchronized animations
* Advanced visual effects

Use GSAP only when the animation complexity genuinely benefits from it.

Do not use GSAP for simple button, card, or modal animations.

---

# 3. Animation Philosophy

The website should follow the principle:

> **Motion should guide attention, communicate hierarchy, and enhance emotion — never distract.**

Animations should feel like part of the brand identity.

The website represents a traditional family business, so movement should feel **refined and graceful rather than energetic or playful**.

Prefer:

* Slow image reveals
* Elegant fades
* Gentle vertical movement
* Smooth scaling
* Subtle parallax
* Mask reveals
* Soft text transitions
* Cinematic scroll sequences

Avoid:

* Excessive bouncing
* Spinning elements
* Large rotations
* Flashing effects
* Aggressive zooms
* Constant floating animations
* Excessive particle effects
* Random animations

---

# 4. Animation Timing

Create a consistent timing system.

```text
Instant       100ms
Fast          180ms
Normal        300ms
Medium        450ms
Slow          650ms
Cinematic     900–1400ms
```

Use shorter durations for UI interactions and longer durations for visual storytelling.

### Recommended usage

```text
Button hover          180ms
Card hover            300ms
Menu                  300–450ms
Modal                 300–450ms
Content reveal        500–700ms
Image reveal          700–1000ms
Hero animation        900–1400ms
Page transition       500–800ms
```

Do not make every animation slow.

---

# 5. Easing

Prefer natural easing curves.

Primary easing:

```text
cubic-bezier(0.22, 1, 0.36, 1)
```

Use this for elegant entrances and transitions.

For subtle UI:

```text
ease-out
```

For smooth visual transitions:

```text
power2.out
power3.out
```

For cinematic GSAP sequences:

```text
power3.out
power4.out
expo.out
```

Avoid excessive use of:

```text
bounce
elastic
back
```

These should only be used when there is a deliberate design reason.

---

# 6. Hero Animation

The hero section should be the most cinematic part of the website.

Suggested sequence:

```text
Page loads
      ↓
Logo appears
      ↓
Background image reveals
      ↓
Eyebrow text fades upward
      ↓
Main heading reveals
      ↓
Supporting text appears
      ↓
CTA appears
      ↓
Decorative element subtly moves
```

The hero should not animate everything simultaneously.

Use a staggered sequence.

Example:

```text
Logo              0ms
Eyebrow           150ms
Heading           300ms
Description       500ms
CTA               700ms
Decorative        900ms
```

Use GSAP for the complete hero timeline.

---

# 7. Text Reveal Animation

Large editorial headings can use elegant reveal animations.

Preferred animation:

```text
opacity: 0 → 1
transform: translateY(30px) → translateY(0)
```

For major hero headings, use line-by-line or word-by-word reveals.

Avoid letter-by-letter animations across large amounts of text because they can feel artificial and affect readability.

Use text masking only for important display headings.

---

# 8. Image Reveal Animation

Product and editorial images should reveal elegantly.

Preferred patterns:

### Fade + Scale

```text
opacity: 0 → 1
scale: 1.04 → 1
```

### Mask Reveal

Image begins behind a clipping container and smoothly reveals itself.

### Vertical Reveal

```text
clip-path / container reveal
```

Use these effects primarily for:

* Hero images
* Collection images
* Gallery images
* Featured products
* Editorial sections

---

# 9. Image Hover

Product and collection images should have subtle hover interactions.

Preferred:

```text
scale: 1 → 1.03
```

Duration:

```text
300–500ms
```

The image should remain inside its container.

Avoid excessive zooming.

Optional:

* Slight brightness change
* Soft overlay
* Caption reveal
* Small icon movement

---

# 10. Card Animations

Cards should animate when entering the viewport.

Example:

```text
opacity: 0
translateY: 30px

        ↓

opacity: 1
translateY: 0
```

Use staggered reveals for grids.

Example:

```text
Card 1 → 0ms
Card 2 → 80ms
Card 3 → 160ms
Card 4 → 240ms
```

Do not make large product grids animate excessively.

---

# 11. Scroll Reveal

Sections should reveal naturally as users scroll.

Use Motion for simple section reveals.

Use GSAP when scroll position directly controls the animation.

Preferred reveal:

```text
opacity: 0 → 1
y: 40px → 0
```

Trigger when approximately 15–25% of the element enters the viewport.

Avoid triggering animations too late.

---

# 12. Parallax

Use subtle parallax effects for selected visual sections.

Example:

```text
Background image:
y: -10% → +10%
```

Use parallax only for:

* Hero
* Large editorial imagery
* Selected storytelling sections

Do not use parallax on every section.

Keep the movement subtle.

---

# 13. Horizontal Scroll

A horizontal scrolling storytelling section may be used for:

* Collections
* Gallery
* Wedding occasions
* Featured arrangements

Use GSAP ScrollTrigger when horizontal scrolling is tied directly to vertical scroll.

The animation should feel smooth and intentional.

Avoid creating horizontal scrolling for simple product lists where normal scrolling would provide a better UX.

---

# 14. Pinned Storytelling Sections

Use GSAP ScrollTrigger for selected storytelling sections.

Example:

```text
Traditional Arrangement

      ↓

Flowers

      ↓

Fruits

      ↓

Gifts

      ↓

Final Seer Varisai Thattu
```

The section can remain pinned while visual elements change.

Use this sparingly.

Pinned sections should communicate a story rather than simply showcase an animation.

---

# 15. Navigation Animation

Desktop navigation should remain mostly static.

Use subtle interactions:

```text
Nav link
   ↓
underline / color transition
```

Mobile navigation can use:

```text
menu button
      ↓
navigation panel
      ↓
staggered menu items
```

Use Motion for the mobile navigation.

Animation should be approximately:

```text
300–450ms
```

---

# 16. Button Animation

Buttons should have subtle feedback.

Example:

```text
Default
   ↓
Hover
   ↓
slight color transition
   +
small icon movement
```

For arrow buttons:

```text
→
```

the arrow may move slightly to the right on hover.

Avoid buttons that jump, bounce, or dramatically scale.

---

# 17. Page Transitions

If page transitions are implemented, keep them extremely subtle.

Possible pattern:

```text
Current page
opacity: 1
      ↓
opacity: 0

New page
opacity: 0
      ↓
opacity: 1
```

Optional elegant curtain/mask transition may be used for major collection pages.

Do not introduce long page transitions that make navigation feel slow.

---

# 18. Gallery Animation

The gallery should feel editorial.

Use:

* Image reveal
* Staggered entrance
* Hover zoom
* Lightbox transition
* Smooth image scaling

When opening a gallery image:

```text
Thumbnail
    ↓
Expand into
    ↓
Full-screen image
```

Use Motion for the lightbox transition.

---

# 19. Micro-interactions

Use small interactions to make the interface feel polished.

Examples:

* Arrow moves on CTA hover
* Underline grows on navigation hover
* Image subtly zooms
* Menu icon transforms
* Form field highlights on focus
* Close button rotates slightly
* Gallery image reveals caption
* Scroll indicator moves subtly

Every micro-interaction should have a clear purpose.

---

# 20. Reduced Motion

Accessibility is mandatory.

Respect:

```text
prefers-reduced-motion
```

When reduced motion is enabled:

* Disable parallax
* Disable complex scroll animations
* Disable large transforms
* Remove unnecessary page transitions
* Reduce animation duration
* Keep simple opacity transitions where appropriate

The website must remain completely usable without animations.

---

# 21. Performance Rules

Animations must not negatively affect website performance.

Prefer animating:

```text
transform
opacity
```

Avoid animating expensive layout properties such as:

```text
width
height
top
left
margin
padding
```

unless absolutely necessary.

Use:

```text
transform: translate()
transform: scale()
transform: rotate()
opacity
```

whenever possible.

Avoid excessive simultaneous animations.

Do not animate large numbers of DOM elements continuously.

---

# 22. Mobile Animation Rules

Animations should be simplified on mobile.

Desktop may use:

* Parallax
* Complex scroll sequences
* Large image transformations
* Horizontal scrolling

Mobile should prioritize:

* Fade
* Slide
* Small scale
* Simple reveals

Avoid heavy animations that can cause performance problems on mobile devices.

---

# 23. Component Animation Rules

Every reusable component should have predictable animation behavior.

Example:

```text
Button
→ hover animation

ProductCard
→ image hover + entrance reveal

CollectionCard
→ image reveal + hover

Modal
→ fade + scale

Navbar
→ mobile menu transition

Gallery
→ image reveal + lightbox

Section
→ scroll reveal
```

Do not independently invent new animation behavior for every page.

---

# 24. Animation Naming

Use consistent animation names.

Examples:

```text
fadeIn
fadeUp
fadeDown
scaleIn
imageReveal
textReveal
staggerChildren
heroIntro
imageParallax
cardHover
menuOpen
menuClose
modalEnter
modalExit
pageEnter
pageExit
```

Create reusable animation utilities instead of duplicating animation configurations.

---

# 25. GSAP Architecture

GSAP animations should be isolated from normal React component logic where possible.

Use:

* GSAP timelines
* ScrollTrigger
* `gsap.context()` or appropriate cleanup patterns
* React refs
* Proper cleanup on unmount

Every GSAP animation must be cleaned up when the component is destroyed.

Avoid memory leaks and duplicated ScrollTrigger instances.

---

# 26. Motion Architecture

Use reusable Motion variants for common UI animations.

For example:

```text
fadeUp
fadeIn
scaleIn
staggerContainer
staggerItem
modal
mobileMenu
```

Prefer reusable variants instead of writing different animation definitions for every component.

---

# 27. Animation Hierarchy

The website should follow this hierarchy:

### Level 1 — Micro-interactions

Small UI feedback.

Use:

**Motion**

### Level 2 — Component animations

Cards, menus, forms, modals.

Use:

**Motion**

### Level 3 — Section animations

Scroll reveals and visual transitions.

Use:

**Motion or GSAP depending on complexity**

### Level 4 — Cinematic storytelling

Hero, parallax, pinned sections, complex timelines.

Use:

**GSAP**

This hierarchy prevents unnecessary complexity.

---

# 28. Final Animation Philosophy

The website should feel as though the content is **gently coming to life**.

The user should notice:

> "This website feels premium."

rather than:

> "Wow, there are a lot of animations."

The animation system should support the brand's core message:

**Tradition, beautifully arranged.**

Every animation should therefore answer at least one of these questions:

1. Does it improve usability?
2. Does it guide attention?
3. Does it communicate hierarchy?
4. Does it enhance the storytelling?
5. Does it make the brand feel more premium?

If the answer is no, **do not add the animation**.
