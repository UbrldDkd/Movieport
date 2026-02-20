import { useState, useRef, useEffect } from 'react';
import { PresetGrid } from './PresetGrid';
import { CustomUpload } from './CustomUpload';
import { useCrop } from './useCrop';
import { renderCrop } from './renderCrop';
import { SizePreview } from './SizePreview';

const CROP_SIZE = 220;

export default function AvatarTab() {
  const [selected, setSelected] = useState('war');
  const [uploadedSrc, setUploadedSrc] = useState(null);
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);
  const [cropMode, setCropMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const canvasRef = useRef(null);

  const cropState = useCrop(uploadedSrc);

  // Release drag if cursor escapes the crop area
  useEffect(() => {
    const up = () => cropState.handlers.onMouseUp();
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, [cropState.handlers]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleFileChange = (dataUrl) => {
    setUploadedSrc(dataUrl);
    setCropMode(true);
    setSelected('custom');
  };

  const handleSaveCrop = async () => {
    if (!uploadedSrc || !canvasRef.current) return;
    setSaving(true);
    const dataUrl = await renderCrop(
      canvasRef.current,
      uploadedSrc,
      cropState.offset,
      cropState.zoom,
      CROP_SIZE
    );
    setCroppedDataUrl(dataUrl);
    setSaving(false);
    setCropMode(false);
  };

  const handleCancelCrop = () => {
    setCropMode(false);
    if (!croppedDataUrl) {
      setSelected('war');
      setUploadedSrc(null);
    }
  };

  const handleSelectPreset = (id) => {
    setSelected(id);
    setCropMode(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className='flex flex-col gap-6'>
      <div className='text-lg font-semibold tracking-wider text-zinc-300'>
        Avatar
      </div>

      {/* ── Preset grid ───────────────────────────────────────────────────── */}
      <PresetGrid selectedId={selected} onSelect={handleSelectPreset} />

      {/* ── Divider ───────────────────────────────────────────────────────── */}
      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-zinc-800' />
        <span className='text-[10px] uppercase tracking-widest text-zinc-600'>
          or
        </span>
        <div className='flex-1 h-px bg-zinc-800' />
      </div>

      {/* ── Custom upload ─────────────────────────────────────────────────── */}
      <CustomUpload
        isSelected={selected === 'custom'}
        croppedDataUrl={croppedDataUrl}
        cropMode={cropMode}
        uploadedSrc={uploadedSrc}
        cropState={cropState}
        saving={saving}
        canvasRef={canvasRef}
        onUploadClick={handleFileChange}
        onSaveCrop={handleSaveCrop}
        onCancelCrop={handleCancelCrop}
      />

      {/* ── Size preview ──────────────────────────────────────────────────── */}
      <SizePreview selected={selected} customDataUrl={croppedDataUrl} />

      {/* ── Save ──────────────────────────────────────────────────────────── */}
      <div className='flex justify-end pt-1'>
        <button className='px-5 py-2 rounded text-sm bg-zinc-200 text-zinc-900 hover:bg-white font-semibold tracking-wide transition-all'>
          Save avatar
        </button>
      </div>
    </div>
  );
}