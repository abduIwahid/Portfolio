# Session 15 — Hero rebuilt to the approved preview composition (Home + About)

Date: 2026-11-22

## What Wadi asked
After seeing the three cursor-effect previews, Wadi parked the
background decision for later and ordered everything ELSE in the
preview applied as-is: "heading jesy yahan preview ki, photo or
baki cheezen same aisy kro — landing page or about dono ke lia."
The preview's composition differs from the live centred hero, so
this session rebuilds both heroes to the preview layout.

## Changes
- One appended CSS section in app/globals.css ("Hero composition:
  preview layout") + two small markup moves:
  - Eyebrow, headline, copy, actions and socials LEFT-aligned
    (were centred).
  - Headline sentence case (uppercase transform removed); Anton
    line 9.4cqw on both pages, serif line ~8.7/8.6cqw.
  - Serif line: solid muted tone (color-mix foreground 54%),
    gradient fade and lowercase transform removed — it now reads
    "Question the result." / "Serious about the system." as
    written.
  - Portrait stands at the RIGHT of the headline (was centred
    below it), height clamp(300px, 36vw, 480px); hover lift kept,
    re-based to the new position.
  - The availability badge moved INSIDE the portrait unit
    (markup: home badge nested; about portrait wrapped in the
    same .hero-portrait span) and sits on its top-left shoulder,
    desktop top:-20px so it clears the Anton line.
  - About desktop: its longer first line ran into the portrait
    zone, so the About portrait drops below the Anton line
    (top clamp(96px, 10.5vw, 128px)) — only the serif tail passes
    behind it, exactly as on Home.
  - Mobile (<=560px): cqw sizes that fit (Anton 8.6cqw, serif
    7.9cqw home / 6.7cqw about); About gets a taller wrap
    (padding-bottom 152px) so its portrait sits in a clear band
    below both lines; badge hangs under the portrait there.
  - Copy wording, header, and the hero glow are UNTOUCHED — the
    cursor-reactive background stays a later decision.

## Verification (local build, screenshots)
- Home 1150 / 768 / 390 and dark mode: composition matches the
  preview, no clipped or covered headline text.
- About 1150 / 390: both lines fully readable; portrait and badge
  clear of the Anton line at both sizes.
- npm run build passes.
