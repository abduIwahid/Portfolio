# Complete Website Responsive Design, Alignment & Adaptive Layout Fix

> Source: User-provided prompt · Saved 2026-10-16
> Use this prompt with any AI coding agent (Antigravity, Claude Code, Cursor, etc.) to audit and fix the entire website's layout, alignment, responsiveness, and behavior across different screen sizes and browser zoom levels.

---

## ROLE

Act as a Senior Frontend Engineer, Responsive UI/UX Specialist, CSS Architecture Expert, and Cross-Device Testing Engineer.

Your task is to thoroughly audit, debug, and fix the entire existing website so that every page, section, component, image, text element, button, card, navigation bar, and interactive element is properly aligned, responsive, readable, and functional across all devices, screen resolutions, aspect ratios, and browser zoom levels.

This is an existing project. Your responsibility is to inspect the actual codebase, identify the root causes of layout problems, implement proper fixes, and verify the results.

Do not simply add a few media queries or make the homepage look good. Fix the underlying layout system across the entire website.

---

## PRIMARY OBJECTIVE

Make the website adapt intelligently to different viewport sizes and browser zoom levels without breaking its design, functionality, content hierarchy, or visual consistency.

The website must work correctly on:
- Small mobile phones.
- Standard and large mobile phones.
- Mobile devices in portrait and landscape orientations.
- Tablets and iPads in portrait and landscape orientations.
- Small laptops.
- Standard laptops.
- Large laptops.
- Desktop monitors.
- Large desktop monitors and ultrawide displays.
- Browsers at different zoom levels, including 50%, 67%, 75%, 80%, 90%, 100%, 110%, 125%, 150%, 175%, and 200%.

These percentages are testing targets, not a requirement to create separate CSS rules for every zoom level. The design must respond naturally to the available viewport dimensions rather than relying on fixed screen sizes.

---

## PHASE 1: AUDIT THE EXISTING CODEBASE

Before changing anything, inspect the entire project.

Identify:
- The frontend framework and version.
- The styling system (CSS, SCSS, Tailwind CSS, CSS Modules, styled-components, or other).
- The routing system and every accessible page.
- Shared layouts, headers, footers, navigation bars, sidebars, and reusable components.
- Global styles, design tokens, CSS variables, typography, spacing, and breakpoints.
- Existing responsive rules.
- Image assets, icons, fonts, and media.
- Third-party UI libraries and their default styling.
- Existing layout bugs, overflow problems, alignment inconsistencies, and conflicting CSS rules.

Check for common problems such as:
- Fixed widths that prevent elements from shrinking.
- Fixed heights that clip text or images.
- Excessive absolute positioning.
- Hardcoded margins and padding.
- Inconsistent container widths.
- Incorrect flexbox or grid configurations.
- Elements that overflow their parent containers.
- Images with incorrect aspect ratios.
- Text that wraps unexpectedly.
- Buttons that become too small or too large.
- Navigation items that overlap.
- Sections that become excessively narrow or wide.
- Content that shifts or breaks when zooming.
- Unnecessary horizontal scrolling.
- Conflicting media queries.
- Inconsistent spacing between sections.
- Layouts that work only at the developer's current screen resolution.

Create a brief internal checklist of the problems found and the components that need correction. Do not stop after the audit — continue through implementation and testing.

---

## PHASE 2: ESTABLISH A CONSISTENT RESPONSIVE LAYOUT SYSTEM

### 2.1 Global box sizing

```css
*, *::before, *::after { box-sizing: border-box; }
```

### 2.2 Responsive page containers

```css
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}
```

Requirements:
- Maintain consistent left and right alignment.
- Prevent content from touching the viewport edges on small screens.
- Avoid unnecessarily wide text and content areas on large displays.
- Keep section boundaries aligned across the page.
- Allow specialized sections to have different widths when the design requires it.

### 2.3 Fluid spacing

Use `clamp()`, `min()`, `max()`, `minmax()`, `calc()`:

```css
.section { padding-block: clamp(3rem, 7vw, 6rem); }
.section-content { gap: clamp(1rem, 3vw, 2rem); }
```

### 2.4 Responsive grid and flexbox

```css
grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
```

Requirements:
- Cards must resize naturally.
- Columns must collapse when insufficient space is available.
- Content must wrap without overlapping.
- Use `min-width: 0` where necessary to prevent flex/grid children from causing overflow.

---

## PHASE 3: FIX ALL TEXT ALIGNMENT AND TYPOGRAPHY

Requirements:
1. Headings must align consistently with their related content.
2. Text must never overlap nearby elements.
3. Long words and unbroken strings must not break the layout.
4. Buttons must accommodate their labels without clipping.
5. Line heights and font sizes must remain appropriate at different viewport widths.

```css
h1 { font-size: clamp(2rem, 4vw + 1rem, 4.5rem); line-height: 1.1; text-wrap: balance; }
p { line-height: 1.7; }
```

---

## PHASE 4: FIX ALL IMAGE, LOGO, AND MEDIA ALIGNMENT

```css
img { max-width: 100%; height: auto; }
/* For fixed-ratio cards: */
.card-img { object-fit: cover; object-position: center; }
```

Requirements:
- Prevent images from stretching or overflowing their containers.
- Keep consistent spacing between images and surrounding content.
- Ensure profile pictures and avatars remain correctly shaped.

---

## PHASE 5: FIX EVERY SECTION AND COMPONENT

Audit the entire website from top to bottom. Sections to check:
- **Header/nav:** logo alignment, nav item spacing, mobile collapse, sticky header behavior.
- **Hero:** heading/description/button/image alignment, stacking on mobile, no excessive height.
- **Cards/grids:** internal padding, equal-height behavior, gap consistency, wrap behavior.
- **Forms/inputs:** fit containers, labels associated, buttons don't overflow, stack on mobile.
- **Tables:** horizontal scrolling within container, no page-wide overflow.
- **Modals/dropdowns/overlays:** stay within viewport, scrollable content, accessible close.
- **Footer:** columns stack, links wrap, social links don't overlap.
- **All remaining sections:** sidebars, testimonials, stats, timelines, galleries, FAQs, banners.

Fix shared components rather than introducing page-specific workarounds.

---

## PHASE 6: MAKE THE WEBSITE WORK AT DIFFERENT SCREEN SIZES

| Category | Approximate CSS viewport width |
|---|---|
| Very small mobile | 320–359px |
| Standard mobile | 360–389px |
| Large mobile | 390–479px |
| Small tablet | 480–767px |
| Tablet/iPad | 768–1023px |
| Small laptop | 1024–1279px |
| Standard desktop | 1280–1535px |
| Large desktop | 1536px+ |

Use breakpoints based on when content begins to fail, not device assumptions.

**Mobile requirements:** No unintended horizontal scrolling, no clipped headings/buttons, no tiny touch targets, no content beyond viewport.

**Tablet requirements:** Two-column layouts remain balanced; portrait and landscape both work.

**Desktop requirements:** Content centered, no excessively wide text, consistent section alignment.

**Ultrawide requirements:** Sensible max-widths, no stretched text across entire screen.

---

## PHASE 7: HANDLE BROWSER ZOOM AND DYNAMIC VIEWPORT CHANGES

Test at: 50%, 67%, 75%, 80%, 90%, 100%, 110%, 125%, 150%, 175%, 200%.

Pay particular attention to 80%, 125%, 150%, and 200%.

Use:
- Relative units: `rem`, `em`, `%`
- Viewport units where appropriate
- `clamp()` for fluid dimensions
- CSS Grid and Flexbox
- Content-aware maximum widths
- Natural text wrapping

Do NOT use `transform: scale()` or CSS zoom tricks. Do NOT disable browser zoom.

---

## PHASE 8: SUPPORT MOBILE LANDSCAPE AND DIFFERENT ASPECT RATIOS

- Hero sections must not become excessively tall in landscape.
- Navigation must remain usable.
- Fixed/sticky elements must not obscure important content.
- Consider `dvh` for mobile browser toolbar behavior.

---

## PHASE 9: ACCESSIBILITY AND INTERACTION

- Keyboard navigation.
- Visible focus indicators (do not remove focus outlines).
- Sufficient text contrast (WCAG AA).
- Appropriate button and link sizes.
- `prefers-reduced-motion` honored.
- Usability with browser zoom up to 200%.

---

## PHASE 10: TECHNICAL CSS AND CODE QUALITY

1. Remove genuinely redundant conflicting CSS rules.
2. Consolidate repeated responsive rules.
3. Avoid unnecessary `!important` declarations.
4. Avoid excessive absolute positioning.
5. Prefer CSS solutions over JavaScript layout fixes.
6. Follow the existing styling architecture (Tailwind, CSS Modules, SCSS, etc.).
7. Do not introduce additional styling libraries.

---

## PHASE 11: TESTING AND VERIFICATION

Test every page and every route. Test at minimum these viewport widths:
320, 360, 375, 390, 414, 480, 768, 820, 1024, 1280, 1366, 1440, 1920, 2560px.

Quick overflow check (browser console):
```js
const overflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
console.log("Unexpected horizontal page overflow:", overflow);
```

Do not use `overflow-x: hidden` on `body` to conceal layout bugs.

---

## PHASE 12: PRESERVE EXISTING FUNCTIONALITY

Do not break: routes, navigation links, forms, validation, authentication, API integrations, buttons, animations, modals, SEO metadata, accessibility features, PWA functionality, branding, typography.

---

## PHASE 13: FINAL QUALITY ASSURANCE

Before finishing:
1. Review all changed files.
2. Run existing linting tools.
3. Run type checking.
4. Run the production build.
5. Run available automated tests.
6. Resolve any errors introduced.
7. Recheck main routes and shared components.
8. Recheck mobile, tablet, and desktop layouts.
9. Recheck high-zoom behavior.
10. Confirm no important functionality has regressed.

---

## STRICT RULES

- Do not stop after inspecting the code.
- Do not provide recommendations without implementing the fixes.
- Do not fix only the homepage.
- Do not use a single media query as the entire solution.
- Do not use fixed dimensions unnecessarily.
- Do not hide overflow to conceal layout bugs.
- Do not sacrifice accessibility for appearance.
- Do not redesign the website unnecessarily.
- Do not remove existing content or functionality.
- Do not introduce unnecessary dependencies.
- Do not claim browser zoom was tested when it was not.

---

## DEFINITION OF DONE

The task is complete only when:
- All pages have been inspected.
- All major alignment issues have been corrected.
- Text wraps and aligns properly.
- Images scale and position correctly.
- Mobile layouts work without unintended horizontal scrolling.
- Tablet layouts work in portrait and landscape.
- Browser zoom up to 200% does not make essential content inaccessible.
- Navigation, forms, modals, and interactive components remain usable.
- The production build and applicable tests pass.
- Remaining limitations are documented honestly.

---

## FINAL REPORT FORMAT

Provide a concise report with:
1. **Issues Found:** Main alignment and responsiveness problems discovered.
2. **Changes Made:** Components, pages, and styles corrected.
3. **Responsive Improvements:** Specific fixes for mobile, tablet, laptop, desktop.
4. **Zoom Improvements:** What was corrected and which zoom levels were tested.
5. **Files Modified:** Relevant files and brief explanation of each change.
6. **Testing Results:** Actual viewport sizes, build results, automated tests completed.
7. **Remaining Issues:** Anything that could not be verified or fully resolved.
