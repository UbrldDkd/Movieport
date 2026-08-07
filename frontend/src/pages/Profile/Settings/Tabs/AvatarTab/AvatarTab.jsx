import { useState, useRef, useEffect } from 'react';
import { PresetGrid } from './PresetGrid';
import { CustomUpload } from './CustomUpload';
import { useCrop } from './helpers/useCrop';
import { renderCrop } from './helpers/renderCrop';
import { SizePreview } from './SizePreview';
import { useUpdateAvatar } from '../../../../../api/account/profile/settings/useSaveAvatar';

const CROP_SIZE = 220;

export default function AvatarTab({ avatar }) {
  const [selected, setSelected] = useState('war');
  const [uploadedSrc, setUploadedSrc] = useState(null);
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);
  const [cropMode, setCropMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');

  const [originalAvatar, setOriginalAvatar] = useState(null);
  const [originalType, setOriginalType] = useState(null); // 'custom' | 'preset'
  const [dirty, setDirty] = useState(false);

  const canvasRef = useRef(null);
  const cropState = useCrop(uploadedSrc, CROP_SIZE);

  const { updateAvatar, isLoading, error } = useUpdateAvatar();

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || window?.location?.origin || '';
  const normalize = (src) =>
    !src
      ? null
      : src.startsWith('http')
        ? src
        : src.startsWith('/')
          ? API_BASE_URL
            ? `${API_BASE_URL}${src}`
            : src
          : API_BASE_URL
            ? `${API_BASE_URL}/${src}`
            : src;

  const isCustom = selected === 'custom' && croppedDataUrl;

  const isReverted =
    originalType === 'custom' && selected !== 'custom' && !dirty;

  useEffect(() => {
    const up = () => cropState.handlers.onMouseUp();
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, [cropState.handlers]);

  useEffect(() => {
    if (!avatar) return;

    if (avatar.avatar_image) {
      const src = normalize(avatar.avatar_image);

      setOriginalAvatar(src);
      setOriginalType('custom');

      setSelected('custom');
      setUploadedSrc(src);
      setCroppedDataUrl(src);
    } else if (avatar.avatar) {
      setOriginalAvatar(avatar.avatar);
      setOriginalType('preset');

      setSelected(avatar.avatar);
      setUploadedSrc(null);
      setCroppedDataUrl(null);
    }

    setDirty(false);
  }, [avatar]);

  const handleFileChange = (dataUrl) => {
    setUploadedSrc(dataUrl);
    setCroppedDataUrl(null);
    setCropMode(true);
    setSelected('custom');
    setSuccess('');
    setDirty(true);
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
    setDirty(true);
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
    setUploadedSrc(null);
    setCroppedDataUrl(null);
    setCropMode(false);
    setSuccess('');
    setDirty(true);
  };

  const handleRevert = () => {
    if (originalType === 'custom') {
      setSelected('custom');
      setUploadedSrc(originalAvatar);
      setCroppedDataUrl(originalAvatar);
    } else {
      setSelected(originalAvatar);
      setUploadedSrc(null);
      setCroppedDataUrl(null);
    }

    setDirty(false);
  };

  const handleSaveAvatar = async () => {
    try {
      setSuccess('');

      if (!dirty) return;

      await updateAvatar({
        avatar: isCustom ? null : selected,
        croppedDataUrl: isCustom ? croppedDataUrl : null,
      });

      setOriginalAvatar(isCustom ? 'custom' : selected);
      setOriginalType(isCustom ? 'custom' : 'preset');
      setDirty(false);

      setSuccess('Avatar updated successfully');
    } catch (e) {}
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

      {originalType === 'custom' && dirty && (
        <div className='flex justify-start pt-2'>
          <button
            onClick={handleRevert}
            className='text-xs font-semibold tracking-widest text-zinc-300 hover:text-white'
          >
            Revert to current avatar
          </button>
        </div>
      )}

      <SizePreview
        selected={selected}
        customDataUrl={croppedDataUrl}
        username='Machvi'
      />

      {success && (
        <div className='text-amber-200/80 font-medium tracking-wider text-sm'>
          {success}
        </div>
      )}

      {error && (
        <div className='text-red-400 font-medium tracking-wider text-sm'>
          {error?.avatar || error?.avatar_image || 'Failed to update avatar'}
        </div>
      )}

      <div className='flex justify-start pt-1'>
        <button
          onClick={handleSaveAvatar}
          disabled={isLoading || saving || !dirty}
          className='bg-zinc-800/90 w-fit px-3 py-1.5 hover:cursor-pointer transition-colors duration-120 hover:bg-zinc-700 text-xs font-semibold rounded tracking-widest disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'SAVING...' : 'SAVE AVATAR'}
        </button>
      </div>
    </div>
  );
}
