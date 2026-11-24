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
- **Motion.** The live authorization demo plays once when scrolled into view and can be replayed. With reduced motion turned on it shows the final result straight away.

## Publishing

Any static host works. To use GitHub Pages, go to Settings → Pages and serve the `main` branch from `/`.
