//
import { useState, useRef, useEffect } from 'react';
import { PresetGrid } from './PresetGrid';
import { CustomUpload } from './CustomUpload';
import { useCrop } from './helpers/useCrop';
import { renderCrop } from './helpers/renderCrop';
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

  return (
    <div className='flex flex-col gap-2'>
      <div className='text-lg font-semibold tracking-wider text-text-primary'>
        Avatar
      </div>

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
      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-zinc-800' />
        <span className='text-[10px] uppercase tracking-widest text-zinc-600'>
          or
        </span>
        <div className='flex-1 h-px bg-zinc-800' />
      </div>

      <PresetGrid selectedId={selected} onSelect={handleSelectPreset} />
      <SizePreview
        selected={selected}
        customDataUrl={croppedDataUrl}
        username='Machvi'
      />

      <div className='flex justify-start pt-1'>
        <button className='bg-zinc-800/90 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'>
          SAVE AVATAR
        </button>{' '}
      </div>
    </div>
  );
}
