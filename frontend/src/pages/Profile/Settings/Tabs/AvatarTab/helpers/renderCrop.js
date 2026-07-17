/**
 * Renders the current crop state onto a canvas as a clipped circle.
 * Returns a Promise that resolves to a PNG data URL.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {string} imageSrc        - data URL or object URL of the source image
 * @param {{ x: number, y: number }} offset - pixel offset from centre
 * @param {number} zoom            - scale multiplier
 * @param {number} containerSize   - output diameter in px (default 220)
 * @returns {Promise<string>}      - PNG data URL
 */
export function renderCrop(
  canvas,
  imageSrc,
  offset,
  zoom,
  containerSize = 220
) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      const size = containerSize;
      canvas.width = size;
      canvas.height = size;
      ctx.clearRect(0, 0, size, size);

      ctx.save();
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();

      const aspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = 1; // square container

      let displayScale;
      if (aspect > containerAspect) {
        displayScale = size / img.naturalHeight;
      } else {
        displayScale = size / img.naturalWidth;
      }

      const effectiveZoom = Math.max(1, zoom);
      const finalScale = displayScale * effectiveZoom;
      const sw = img.naturalWidth * finalScale;
      const sh = img.naturalHeight * finalScale;

      const maxShiftX = Math.max(0, (sw - size) / 2);
      const maxShiftY = Math.max(0, (sh - size) / 2);
      const clampedOffset = {
        x: Math.min(maxShiftX, Math.max(-maxShiftX, offset.x)),
        y: Math.min(maxShiftY, Math.max(-maxShiftY, offset.y)),
      };

      const sx = (size - sw) / 2 + clampedOffset.x;
      const sy = (size - sh) / 2 + clampedOffset.y;

      ctx.drawImage(img, sx, sy, sw, sh);
      ctx.restore();

      resolve(canvas.toDataURL('image/png'));
    };
    img.src = imageSrc;
  });
}
