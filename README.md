# Agent IAM site

The product landing page for Agent IAM: identity, authorization and audit for AI agents.

It is a static site with no build step and no external requests: `index.html`, `styles.css`, `main.js` and `favicon.svg`. No web fonts, frameworks or trackers.

## Run it locally

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765.

## Editing

- **Demo link.** Every "Book a demo" button points to `mailto:demo@example.com`. Replace that address in `index.html` with your real one.
- **Theme.** Dark by default. The toggle in the header switches to light and remembers the choice in `localStorage`. Colours are CSS variables at the top of `styles.css`.
- **Numbers.** The figures in the numbers band are measured on an Apple M2 with post-quantum signatures. Update them there if you re-measure.
- **Sections.** Hero with live traffic diagram, governs strip, the problem, three questions, live authorization (three scenarios), the three platform pillars, lifecycle, delegation, before/after anatomy, attack tests, deploy, standards, measured numbers, compliance, teams, FAQ and a closing call to action.
- **Motion.** Line-pattern backgrounds, the hero traffic diagram, the ledger and the authorization walkthrough animate only while on screen. With reduced motion turned on, everything shows its final state and nothing moves.

## Publishing

Any static host works. To use GitHub Pages, go to Settings → Pages and serve the `main` branch from `/`.
