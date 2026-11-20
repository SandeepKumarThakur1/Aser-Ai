# Website corrections — Sharath review (20 Nov 2026)

All 29 review points plus the new "Pantheon in Action" section. CSS changes are in
`style/design-system.css` (block "WEBSITE CORRECTIONS"); JS additions are at the end of `script/main.js`.

## Site-wide (header + footer on all pages)
1. Header shows the logo only (wordmark removed), left-aligned with the page content at every width.
2. Header is fixed: it no longer scrolls away. Content behind it is blurred (frosted glass).
6. Footer LinkedIn icon is the real LinkedIn mark; on hover the whole icon turns LinkedIn blue. Links to linkedin.com/company/aser-ai.
7. Footer wordmark removed; logo only.
8. Footer phone / email / location use the same line icons as the Contact page.
9. Footer tagline is now "From Risk Visibility to Risk Foresight".
16. Footer logo is the same size on every page (R&D included).

## Home
3. "How ASER AI delivers": the output dots now sit on the bottom edge of ASER PANTHEON, exactly where the 4 lines to the cards start.
4. Our Ecosystem logos shown in their original colours on white tiles.
5. "Prioritise" in the closing band is no longer highlighted.

## Platform
10. Hero: the "Time to act" dot sits on the top line, with the label above it.
11. Architecture arrows are drawn from the real card positions, so they stop at the card edges and never overlap.
12. All 19 icons (3 inputs, 3 Pantheon modules, 4 outcomes, 6 capabilities, 3 BESS tags) redrawn as matching line icons for their text.
NEW. "Aser Pantheon in action" section between Architecture and Capabilities: 11 dashboard screens in the given order, each with its one-liner above the image. Tabs, arrows, keyboard, swipe, auto-advance (pauses on hover). Hero "See Pantheon in Action" button now scrolls to it. Images: `assets/images/platform-demo/` (WebP).

## Battery Energy Storage System
13. Hero lines start at the BESS unit and flow out to each dashboard; battery-health panel sits on its connection point; the separate dotted line on Performance Outlook removed; mini-charts draw forward, fade, and restart (no reverse).
15/17/19. Closing line "Anticipate risk. Prioritise action. Protect value." uses one style everywhere (under the button, cyan vertical rule), matching The ASER AI Way.

## Insurance Risk Intelligence
14. Hero container redrawn as a proper BESS enclosure (battery cabinet doors with vents and status LEDs, HVAC units on the end wall, plinth). Lines: 4 signals → BESS are static; BESS → Risk profile is an animated dotted line.
15. Closing line moved under the "Discuss a BESS Insurance Pilot" button.

## Research & Development
16. Footer logo size fixed. 17. Closing line added under "Discuss an R&D Collaboration".

## The ASER AI Way
18. "Who we are" uses the meeting-room photo (`aboutAser/aserAbout4.png`). Please confirm this is Baljit's photo — if he supplied a different file, drop it in and update the src.

## Careers
20. Business & Partnerships uses a handshake icon.

## Investors
21. Hero chip reads "Capital & Expertise" only; "Follow-on round · 2025" removed.
22. Repeated "ASER AI is backed by strategic investors…" statement removed.
23. "Follow-on round closed · Dec 2025" chip removed.
24. Closing band uses the home-page structure: "Shape a future where organisations can act before risk becomes loss." + "Connect with ASER AI →".

## Our Leadership
25. New hero heading and intro (2nd line highlighted).
26. "Our Leadership / Experience that moves us forward" heading block removed (profiles kept).
27. Closing band: SEE PANTHEON IN ACTION / See what earlier risk insight makes possible. / intro / Request a Demo →.

## News & Media
28. Closing band: STAY CONNECTED / Follow our progress. Be part of what's next. / intro / Connect with ASER AI.
29. Hero: NEWS & MEDIA / Stories from our work / new intro.

Cache-busting: `main.js` and `design-system.css` links now carry `?v=20261120`.
