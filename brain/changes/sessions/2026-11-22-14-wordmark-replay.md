# 2026-11-22 — Footer wordmark animation replays on every page

Change → Owner's report: the footer "ABDUL WAHID" rise animation played only once per visit, because the footer sits in the shared layout and never remounts on client-side navigation (and mobile Safari restores refreshes from bfcache without remounting). FooterWordmark now resets and re-arms its IntersectionObserver on every route change (usePathname) and on a bfcache pageshow restore, so the letters rise again on every page load and every refresh. Nothing else changed — same letters, timing, stagger, threshold, CSS and reduced-motion behaviour.
Reason → Owner's explicit request, same day: "har bar refresh page ya jab bhi koi new page khuly to har bar wo animation dekhy — kuch change na krna."
Affected Area → components/footer-wordmark.tsx only.
Impact → The signature animation is now seen on every page, as intended.
Evidence → Local production build, CDP check: home footer gains .in-view on scroll; after client-side navigation to /about the class is absent again (reset) and returns on scroll (replay). tsc clean, build passes.
Status → Shipped.
