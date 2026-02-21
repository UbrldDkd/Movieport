import { useRef } from 'react';
import { CropEditor } from './CropEditor';

export function CustomUpload({
  isSelected,
  croppedDataUrl,
  cropMode,
  uploadedSrc,
  cropState,
  saving,
  canvasRef,
  onUploadClick,
  onSaveCrop,
  onCancelCrop,
}) {
  const fileRef = useRef(null);

  return (
    <div>
      <p className='text-xs font-semibold  tracking-wider text-zinc-500 mb-3'>
        Upload your own
      </p>
      <input
        ref={fileRef}
        type='file'
        accept='image/*'
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
            onUploadClick(ev.target.result);
          };
          reader.readAsDataURL(file);
          e.target.value = '';
        }}
        className='hidden'
      />

      {!cropMode && (
        <button
          onClick={() => fileRef.current?.click()}
          className={`
            w-full py-3 rounded-md border-2 border-dashed text-sm tracking-wide transition-all duration-150
            ${
              isSelected && croppedDataUrl
                ? 'border-zinc-600 text-zinc-400 hover:border-zinc-500'
                : 'border-zinc-700 text-zinc-500 hover:border-zinc-600 hover:text-zinc-400'
            }
          `}
        >
          {isSelected && croppedDataUrl ? '↺ Replace image' : '+ Upload image'}
        </button>
      )}

      {cropMode && uploadedSrc && (
        <>
          <CropEditor
            imageSrc={uploadedSrc}
            cropState={cropState}
            cropSize={220}
            onSave={onSaveCrop}
            onCancel={onCancelCrop}
            saving={saving}
          />
          <canvas ref={canvasRef} className='hidden' />
        </>
      )}
    </div>
  );
}
