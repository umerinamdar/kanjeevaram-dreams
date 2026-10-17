# Kanjeevaram Dreams

Build a premium Indian wedding invitation microsite — a single page a guest opens on their phone. This is a luxury product people pay for, so the finish matters far more than the feature count. The benchmark is invitima.com.

THE AESTHETIC — "Kanjeevaram"
Palette: deep maroon Kanjeevaram silk with gold zari.
Scene: a South Indian temple courtyard at dawn — a carved stone gopuram, strung jasmine garlands, rows of brass oil lamps, a kolam drawn on the floor, soft early light.
Feeling: sacred, warm, unhurried.
OPENING: HEAVY SILK DRAPES. Two heavy maroon Kanjeevaram silk curtains with woven gold zari borders, drawn closed across a carved temple proscenium, with the wax seal at the join. They sweep apart when tapped.

THE ARTWORK IS THE MOST IMPORTANT PART
Generate original illustrations that are photoreal and painterly, in the register of high-end wedding stationery: carved stone with real depth and shadow in the recesses, silk with genuine weight and fold, warm practical light from oil lamps, dense crafted detail in the carving and the zari weave.
NOT acceptable: flat vector, clip art, stock-photo look, plain colour gradients, or a geometric pattern standing in for a scene.

Produce these four image files:

1. sealed-backdrop.jpg (1536x1024) — THE DRAPES SCENE. Two heavy maroon silk curtains with gold zari borders hanging closed across a carved stone temple archway, brass oil lamps burning either side, jasmine garlands. COMPOSE IT AROUND THE CURTAINS — they are the object the guest taps, so they must be centred and be the subject of the painting, hanging in deep folds and meeting in the middle.

2. hero-backdrop.jpg (1536x1024) — the temple courtyard revealed once the curtains part. Carved gopuram, strung jasmine, rows of brass oil lamps, a kolam on the stone floor, dawn light. THE MIDDLE MUST BE OPEN AND QUIET because the couple's names and the date card are drawn on top of it.

3. wax-seal.png (816x816) — THIS ONE MATTERS. A RICHLY TEXTURED WAX SEAL: thick dimensional wax with soft irregular scalloped edges where it spread when pressed, a glossy sheen catching the light, subtle depth across the surface. Deep maroon wax. Pressed into it, a RAISED GOLD ORNAMENT — a temple-style floral ring or laurel wreath rendered as embossed metal with its own highlights and shadow. LEAVE THE MIDDLE CLEAR: the ornament is a ring around an empty centre, about 40% of the width, where our engine prints the couple's initials as live text. So: gold ornament YES, lettering NO. No initials, no monogram, no letters anywhere. Transparent background, viewed straight down.

4. paper-texture.jpg (800x800) — subtle tileable silk or paper grain in the palette.

Every image: no text, no words, no lettering, no numbers, no watermarks, no human faces.

THE EXPERIENCE, IN ORDER
1. A sealed opening: the whole screen is the painted curtains scene, with a small "Tap to open" plate and the couple's names in gold script beneath. No navigation, no header, no scrollbar. One tap sweeps the curtains apart over about 1.7 seconds, heavy and weighted.
2. A cinematic reveal of about 6 seconds: the courtyard settles, names fade up, then the page becomes scrollable. One continuous motion into the same page, not a second screen.
3. Music fades in over 8 seconds to about 60% volume, only after the tap. Prime it muted on the tap gesture so mobile browsers allow playback. Keep the seal-tap sound and background music as two separate audio elements.
4. A scratch-to-reveal date card: a gold foil panel the guest rubs; at about 38% cleared it auto-reveals the date and time then unmounts so the page scrolls normally. Also keyboard accessible.
5. Scrollable sections below: venue with a Google Maps link, a live countdown, the ceremony programme (Mehendi, Muhurtham, Wedding, Reception), a photo gallery, a quote, a closing panel.

BUILD RULES
Mobile first, 320px to 4K. All colours as CSS custom properties on :root, never hardcoded in components. Two Google Fonts: a display serif for names, a clean sans for labels. Anchor the countdown and all dates to an explicit +05:30 offset, never the guest's clock. Respect prefers-reduced-motion. Placeholder content: "Aarav & Anaya", 14 February 2027, "The Grand Pavilion".

WHEN YOU FINISH, TELL ME
1. Every colour as a hex value labelled by role: accent, accent-soft, tint, paper, paper-light, paper-dark, highlight, surface, scratch-foil, scratch-ink, background, foreground, muted, border.
2. The two Google Font names.
3. Where the four image files are.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/81e35f5d-caf6-4789-9340-b15fcbeafd70).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
