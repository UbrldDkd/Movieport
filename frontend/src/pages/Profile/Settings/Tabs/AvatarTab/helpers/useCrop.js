import { useState, useRef, useCallback, useEffect } from 'react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

function getCoverScale(width, height, size) {
  if (!width || !height) return 1;
  return Math.max(size / width, size / height);
}

function clampOffset(offset, zoom, imageData, cropSize) {
  if (!imageData) return offset;

  const coverScale = getCoverScale(imageData.width, imageData.height, cropSize);
  const effectiveZoom = Math.max(MIN_ZOOM, zoom);
  const scaledWidth = imageData.width * coverScale * effectiveZoom;
  const scaledHeight = imageData.height * coverScale * effectiveZoom;

  const maxShiftX = Math.max(0, (scaledWidth - cropSize) / 2);
  const maxShiftY = Math.max(0, (scaledHeight - cropSize) / 2);

  return {
    x: Math.min(maxShiftX, Math.max(-maxShiftX, offset.x)),
    y: Math.min(maxShiftY, Math.max(-maxShiftY, offset.y)),
  };
}

/**
 * Manages zoom, offset, and pointer/touch drag state for the crop editor.
 * Resets to defaults whenever `imageSrc` changes.
 *
 * @param {string|null} imageSrc
 * @param {number} cropSize
 */
export function useCrop(imageSrc, cropSize = 220) {
  const [zoom, setZoomState] = useState(MIN_ZOOM);
  const [offset, setOffsetState] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [imageData, setImageData] = useState(null);
  const dragStart = useRef(null);

  useEffect(() => {
    if (!imageSrc) {
      setImageData(null);
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageData({ width: img.naturalWidth, height: img.naturalHeight });
      setZoomState(MIN_ZOOM);
      setOffsetState({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const setZoom = useCallback((value) => {
    setZoomState((prev) => {
      const nextValue = typeof value === 'function' ? value(prev) : value;
      return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, nextValue));
    });
  }, []);

  const setOffset = useCallback(
    (value) => {
      setOffsetState((prev) => {
        const nextValue = typeof value === 'function' ? value(prev) : value;
        return clampOffset(nextValue, zoom, imageData, cropSize);
      });
    },
    [cropSize, imageData, zoom]
  );

  useEffect(() => {
    if (!imageData) return;
    setOffsetState((prev) => clampOffset(prev, zoom, imageData, cropSize));
  }, [cropSize, imageData, zoom]);

  // ── Mouse ────────────────────────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      dragStart.current = {
        mx: e.clientX,
        my: e.clientY,
        ox: offset.x,
        oy: offset.y,
      };
    },
    [offset]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!dragging || !dragStart.current) return;
      setOffset({
        x: dragStart.current.ox + (e.clientX - dragStart.current.mx),
        y: dragStart.current.oy + (e.clientY - dragStart.current.my),
      });
    },
    [dragging, setOffset]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  // ── Touch ────────────────────────────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e) => {
      const t = e.touches[0];
      setDragging(true);
      dragStart.current = {
        mx: t.clientX,
        my: t.clientY,
        ox: offset.x,
        oy: offset.y,
      };
    },
    [offset]
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!dragging || !dragStart.current) return;
      const t = e.touches[0];
      setOffset({
        x: dragStart.current.ox + (t.clientX - dragStart.current.mx),
        y: dragStart.current.oy + (t.clientY - dragStart.current.my),
      });
    },
    [dragging, setOffset]
  );

  const onTouchEnd = useCallback(() => setDragging(false), []);

  const reset = useCallback(() => {
    setZoom(MIN_ZOOM);
    setOffsetState({ x: 0, y: 0 });
  }, [setZoom]);

  const clampedZoom = useCallback(
    (delta) => setZoom((z) => z + delta),
    [setZoom]
  );

  return {
    zoom,
    setZoom,
    offset,
    setOffset,
    dragging,
    reset,
    clampedZoom,
    handlers: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
  };
}
