# Testing & QA Checklist

Manual checks
- [ ] Open `WERTY.HTML` in Chrome, Firefox, Edge.
- [ ] Hover image with mouse: lens appears and follows pointer.
- [ ] Keyboard: tab to image, use arrow keys to move lens, press Esc to hide.
- [ ] Touch: tap image to toggle zoom on mobile.
- [ ] Verify lens area shows a crisp zoomed region (not blurry).

Automated suggestions
- Use Playwright or Puppeteer to capture screenshots of the demo and compare baseline images for visual regressions.
- Add an accessibility audit (axe-core) to catch missing ARIA attributes.

Performance
- Test with large images and measure layout/paint. Use smaller default lens or lower `data-zoom` for heavy images.
