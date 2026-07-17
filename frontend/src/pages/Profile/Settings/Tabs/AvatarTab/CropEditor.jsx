/**
 * CropEditor
 * Renders the circular crop viewport, zoom slider, and action buttons.
 * All crop state (zoom, offset, dragging) is owned by the parent via the
 * `cropState` prop (returned from useCrop) so this component stays pure UI.
 */
import { useEffect, useState } from 'react';

export function CropEditor({
  imageSrc,
  cropState,
  cropSize,
  onSave,
  onCancel,
  saving,
}) {
  const { zoom, setZoom, offset, dragging, reset, clampedZoom, handlers } =
    cropState;

  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!imageSrc) {
      setImageSize({ width: 0, height: 0 });
      return;
    }

    const img = new Image();
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const aspect =
    imageSize.width && imageSize.height
      ? imageSize.width / imageSize.height
      : 1;
  const displayScale =
    imageSize.width && imageSize.height
      ? aspect > 1
        ? cropSize / imageSize.height
        : cropSize / imageSize.width
      : 1;
  const effectiveZoom = Math.max(1, zoom);
  const scaledWidth = imageSize.width
    ? imageSize.width * displayScale * effectiveZoom
    : cropSize;
  const scaledHeight = imageSize.height
    ? imageSize.height * displayScale * effectiveZoom
    : cropSize;
  const maxShiftX = Math.max(0, (scaledWidth - cropSize) / 2);
  const maxShiftY = Math.max(0, (scaledHeight - cropSize) / 2);
  const clampedOffset = {
    x: Math.min(maxShiftX, Math.max(-maxShiftX, offset.x)),
    y: Math.min(maxShiftY, Math.max(-maxShiftY, offset.y)),
  };
  const translateX = (cropSize - scaledWidth) / 2 + clampedOffset.x;
  const translateY = (cropSize - scaledHeight) / 2 + clampedOffset.y;

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-[11px] font-semibold text-zinc-500 -mb-1'>
        Drag to reposition · scroll or use slider to zoom
      </p>

      {/* ── Circle viewport ───────────────────────────────────────────────── */}
      <div className='flex justify-center'>
        <div
          onMouseMove={handlers.onMouseMove}
          onTouchMove={handlers.onTouchMove}
          onTouchEnd={handlers.onTouchEnd}
          onWheel={(e) => {
            e.preventDefault();
            clampedZoom(-e.deltaY * 0.002);
          }}
          style={{ width: cropSize, height: cropSize }}
          className='relative rounded-full overflow-hidden bg-bg-secondary border-2 border-zinc-700 select-none flex-shrink-0'
        >
          <img
            src={imageSrc}
            alt='crop preview'
            draggable={false}
            onMouseDown={handlers.onMouseDown}
            onTouchStart={handlers.onTouchStart}
            style={{
              transform: `translate(${translateX}px, ${translateY}px)`,
              transformOrigin: 'center center',
              position: 'absolute',
              top: 0,
              left: 0,
              maxWidth: 'none',
              cursor: dragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              width: scaledWidth,
              height: scaledHeight,
              objectFit: 'contain',
              objectPosition: 'center',
              backgroundColor: 'rgba(24,24,27,0.7)',
            }}
          />
          <div
            className='absolute inset-0 rounded-full pointer-events-none border border-zinc-600/70'
            style={{ boxShadow: 'inset 0 0 20px 6px rgba(0,0,0,0.45)' }}
          />
        </div>
      </div>

      {/* ── Zoom slider ───────────────────────────────────────────────────── */}
      <div className='flex items-center gap-3'>
        <span className='text-zinc-600 text-xs w-4'>−</span>
        <input
          type='range'
          min='1'
          max='4'
          step='0.01'
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className='flex-1 accent-zinc-400 h-1'
        />
        <span className='text-zinc-600 text-xs w-4'>+</span>
      </div>

      {/* ── Actions ───────────────────────────────────────────────────────── */}
      <div className='flex gap-2'>
        <button
          onClick={reset}
          className='text-xs text-zinc-500 hover:text-text-primary transition-colors px-2 py-1'
        >
          Reset
        </button>
        <div className='flex-1' />
        <button
          onClick={onCancel}
          className='px-4 py-1.5 rounded text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-700 hover:border-zinc-600 transition-all'
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={saving}
          className='px-4 py-1.5 rounded text-xs bg-zinc-200 text-zinc-900 hover:bg-white transition-all font-semibold disabled:opacity-50'
        >
          {saving ? 'Saving…' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
