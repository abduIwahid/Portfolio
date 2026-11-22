# 2026-11-22 — Gallery touch fix: first tap expands, second tap opens

Change → Owner's report: on touch screens a tap on a collapsed project jumped straight into the case study instead of expanding the panel. Cause: touch browsers fire a synthetic mouseenter before the click, so by click time the tapped panel already counted as "active" and the click-to-open branch fired. Fix: the panel records which panel was open at pointerdown (pressedActive ref); the click expands unless the panel was already open when the press began.
Reason → Owner's live report from his phone, same morning.
Affected Area → components/project-gallery.tsx only (home gallery).
Impact → Touch now works in two taps as intended: tap a strip → it expands and stays; tap the open panel → its case study opens. Desktop hover/click behaviour unchanged.
Evidence → Verified with real touch emulation against the local production build (CDP touch events at 414px): initial active = Plan Banao; tap strip 02 → still on /, panel 02 active; tap open panel 02 → navigated to /projects/medisight-ai. tsc clean, build passes.
Status → Shipped.
