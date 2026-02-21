import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Manages zoom, offset, and pointer/touch drag state for the crop editor.
 * Resets to defaults whenever `imageSrc` changes.
 *
 * @param {string|null} imageSrc
 */
export function useCrop(imageSrc) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  // Reset state on new image
  useEffect(() => {
    if (!imageSrc) return;
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, [imageSrc]);

  // ── Mouse ────────────────────────────────────────────────────────────────────
  const onMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(true);
      dragStart.current = { mx: e.clientX, my: e.clientY, ox: offset.x, oy: offset.y };
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
    [dragging]
  );

  const onMouseUp = useCallback(() => setDragging(false), []);

  // ── Touch ────────────────────────────────────────────────────────────────────
  const onTouchStart = useCallback(
    (e) => {
      const t = e.touches[0];
      setDragging(true);
      dragStart.current = { mx: t.clientX, my: t.clientY, ox: offset.x, oy: offset.y };
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
    [dragging]
  );

  const onTouchEnd = useCallback(() => setDragging(false), []);

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  const clampedZoom = useCallback(
    (delta) => setZoom((z) => Math.min(4, Math.max(0.5, z + delta))),
    []
  );

  return {
    zoom,
    setZoom,
    offset,
    setOffset,
    dragging,
    reset,
    clampedZoom,
    handlers: { onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd },
  };
}
