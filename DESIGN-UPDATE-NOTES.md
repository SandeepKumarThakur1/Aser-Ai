# ASER AI: design alignment update (Nov 2026)

## Bugs fixed
- **JavaScript crash on every page** (`finePointer is not defined`). The insurance-page block sat outside any function scope, so it threw an error and every script after it stopped running: research-page reveals, the shared mobile menu, smooth scrolling and the Company-page counters. It is now wrapped in its own scope.
- **Solutions / Company dropdowns** only worked on two pages. Six copies of an inline nav script competed with `main.js`. They have been replaced by one handler in `main.js` (click, hover on desktop, arrow keys, Escape, outside click).
- **Mobile menu** used two different class names (`menu-open` and `mobile-open`), so it did not open on some pages. The panel was also see-through. Both are fixed.
- **Homepage diagram connectors** ("From early signals to informed action") were invisible. They are now drawn from the real card positions, so they line up at every screen width.
- Duplicate `</footer>` tags on platform.html.

## Design alignment (new file: `style/design-system.css`, loaded last)
- Colours: deeper navy background (#010d18), one cyan (#2ee8f6), amber for risk.
- Type: Source Serif 4 for display headings (as in the designs), Inter for UI and body. The homepage hero keeps its bold sans headline.
- Spacing: one content width (1312px) and one vertical rhythm on every page, with hairline section dividers.
- One shared button, card and eyebrow style.
- Header: Platform / Solutions / Company / Insights plus an outlined "Contact us" button. Shows the current page.
- Footer: the compact three-column footer from the designs, on all 8 pages.

## Content and images
- Fixed the typo "Pan theon" on the homepage.
- Dead links (`#`, `#contact`) now go to the right page.
- Partner logos had wrong alt text ("Synvista" ×6). Each now has its own name.
- Homepage BESS section now uses the real battery-storage photo, with animated signal lines.
- Homepage gained the closing "Anticipate risk…" CTA band from the design.
- Platform: the BESS section uses the battery photo. The closing band uses the mountain photo.
- Operational: the circuit-board CTA photo is replaced by an animated data-flow wave (`assets/images/flow-wave.svg`).

## Still to do (not in the ZIP)
- `investors.html` and `news-media.html` (the "Insights" link) do not exist yet.
- Footer address reads "Kuala Lumpur · Zürich". Please check this.
- LinkedIn, Privacy and Terms links are placeholders (`#`).
