# Magnifying Glass Demo

Small dependency-free demo that provides a magnifying lens for images. Works with mouse, keyboard, and touch (tap-to-zoom fallback).

Files
- `WERTY.HTML` — demo page (open in a browser)
- `assets/style.css` — styles for the demo and lens
- `assets/magnify.js` — magnifier implementation. Targets images with class `magnifiable` and supports `data-zoom` and `data-lens-size`.

Usage
1. Open `WERTY.HTML` in a browser.
2. Hover the image to see the magnifier. On touch devices, tap to toggle zoom.

Customization
- Add `class="magnifiable"` to any `<img>`.
- Set `data-zoom="3"` for stronger zoom, and `data-lens-size="200"` to change lens diameter.

Accessibility
- Images are focusable (`tabindex="0"`) and support arrow-key movement and Escape to dismiss the lens.

Release
- A `scripts/release.ps1` script is included to produce a ZIP archive of the project in `dist/`.

Development notes
- The magnifier uses the image's natural size to compute the background for high-quality zoom.
