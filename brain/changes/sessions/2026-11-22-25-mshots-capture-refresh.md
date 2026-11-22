# Session 25 — mShots capture refresh (2026-11-22)

**Owner report:** on abdulwahid.runs-on.dev the WhyRisk gallery panel still
showed the OLD WhyRisk landing (dark hero) after WhyRisk's full redesign
went live.

**Cause:** project panels are mShots captures (`shotUrl(demo, w)`).
mShots caches per (target URL, width) with no purge the site controls;
the w=1200 capture of whyrisk.vercel.app predated the redesign.

**Change:** bump the requested widths — gallery + horizontal scroll
1200 → 1240, case-study `ProjectShot` default 800 → 820, `shotUrl`
default 1200 → 1240 — so every panel requests a fresh capture of the
current live sites. No layout, content or component behaviour changes.

**Verify:** production HTML references w=1240; the new mShots capture of
whyrisk.vercel.app shows the violet template-system landing.
