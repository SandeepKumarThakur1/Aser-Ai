# ASER AI — Unified Website Project

## Shared architecture
Every page loads the same two stylesheets and the same JavaScript file.

```text
aser-ai/
├── index.html
├── platform.html
├── style/
│   ├── main.css
│   └── responsive.css
├── script/
│   └── main.js
└── assets/
    └── images/
```

## Typography
- **Headings:** Space Grotesk — geometric, modern, technical and suited to an AI platform.
- **Body/UI:** Inter — highly readable for paragraphs, navigation, labels and interface copy.
- Fonts load from Google Fonts. System fallbacks are included in CSS.

## CSS responsibility
- `style/main.css`: shared design tokens, colours, header/footer, buttons, cards, page sections and all base styling for every page.
- `style/responsive.css`: shared tablet/mobile/large-screen media queries extracted from the original stylesheet and kept in their original order.

There is no separate CSS file per page. Unique section styling remains in the single shared `main.css` and is scoped with section-specific class names.

## JavaScript
`script/main.js` contains the shared, null-safe vanilla JS for homepage parallax, Pantheon parallax, scroll reveals, card pointer lighting and in-page navigation.

## Run
Open the project folder in VS Code and run `index.html` with Live Server. `platform.html` uses the same shared CSS and JS.

## Source coverage
The provided ZIP included `index.html`, `platform.html`, the original main stylesheet, the original script, and `homeHerosection.png`. Links to other pages are retained, but their HTML files were not included in the supplied ZIP.
