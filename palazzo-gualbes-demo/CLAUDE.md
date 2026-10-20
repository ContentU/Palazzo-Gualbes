# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static demo prototype for the Palazzo Gualbes website (Italian-language, Oct 2026). No build step, no package manager, no tests, no backend. Deploy = upload the folder contents as-is (see `LEGGIMI.txt`). To preview, open `index.html` or serve the folder (`python3 -m http.server`).

Pages: `index` (home), `about`, `camere`, `suite` (Family Suite detail), `journal`, `articolo`, `contatti` (demo form, never sends).

## Architecture: every page is self-contained and duplicates the shared code

Each HTML file contains, in this order:
- **Lines 9–12**: `@font-face` for Bricolage Grotesque (local woff2 in `assets/fonts/`).
- **Lines 13–642**: one `<style>` block with the whole site CSS, **including Evolve font faces inlined as base64 on ~70KB single lines (≈ lines 14–19)**. Never print/cat these lines; use `awk 'length($0)<400'` or targeted `sed -n`/grep.
- **Body**: header (`#hdr`), menu (`#menu`), page-specific markup, footer.
- **Scripts**: local `assets/js/gsap.min.js`, `ScrollTrigger.min.js`, `lenis.min.js`, then one inline IIFE.

The CSS block and the inline JS are **byte-identical across all 7 pages**. Any change to shared CSS/JS must be applied to every page and kept identical — verify with:

```sh
for f in *.html; do echo "$f $(sed -n '9,642p' $f | md5) $(awk '/<script>$/,/<\/script>/' $f | md5)"; done
```

The shared JS is feature-detected by element ID: each block runs only if its element exists (`#galTrack` suite gallery, `#jFilters` journal filters, `#acc`/`#ctForm` contatti, `#hhImg` home hero, `#heroFrame` inner-page hero, `#suitesTrack` horizontal scroll, `#expMq` marquee, `#fullImg` about). Generic scroll animations are opt-in via data attributes: `data-words`, `data-fade`, `data-par`, `data-reveal`, `data-rot`, `data-drift`, `data-px`.

Motion rules baked into the JS: everything after `if (!hasG || reduce) return;` is GSAP-only and skipped under `prefers-reduced-motion`; Lenis smooth scroll drives `ScrollTrigger.update`; pinned/horizontal and desktop-only parallax are gated by `min-width: 901px`.

## Conventions

- Design tokens on `:root` (`--red #962C2C`, `--olive`, `--ivory`, `--night`, `--display` Evolve, `--text` Bricolage, fluid `clamp()` sizes, `--ease-out`/`--ease-in-out`). Use them, not raw values.
- Comments and UI copy are in Italian.
- Hover styles go inside `@media (hover:hover) and (pointer:fine)`.
- No CDNs: all libraries and fonts must stay local.
- Demo photos in `assets/demo/NN.webp` are replaced by overwriting files with the same name.
- Pages are `noindex` + `robots.txt` disallows all; keep that for the demo.
- Brand logos (SVG, red/ivory/b&w variants) live in `../Loghi/`.
