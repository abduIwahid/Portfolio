# Session 20 — Pointer-follow glow removed everywhere

Date: 2026-11-22

## What Wadi asked
"abhi background mai aik light sa orange effect hai, cursor
jahan jata hai wo light orange effect usay follow krta hai —
wo hta do."

## Changes
- components/pointer-glow.tsx DELETED (both layers: the global
  PointerGlow and the hero-scoped HeroGlow).
- Usages removed: <PointerGlow /> + import from app/layout.tsx;
  <HeroGlow /> + imports from app/page.tsx and app/about/page.tsx.
- CSS removed from app/globals.css: the .pointer-glow and
  .hero-glow rule blocks, and their selectors in the
  reduced-motion, print and coarse-pointer media blocks (the
  coarse-pointer block existed only for the glow and went with
  it; its dated comment now records the removal). The .hero /
  .hero-stage positioning rules stay. Two stale comments that
  referenced the glow were updated.
- Untouched: the custom cursor (session 16 lerp build), the
  magnetic buttons, and the parked cursor-reactive hero
  background decision — this removal is separate from that.

## Verification
- Production build passes; local home HTML contains zero
  pointer-glow / hero-glow markup; hero screenshot unchanged
  apart from the now-flat background.
