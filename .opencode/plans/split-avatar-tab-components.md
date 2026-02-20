# Plan: Separate AvatarTab into CustomUpload and PresetGrid Components

## Goal
Extract two distinct UI components from `AvatarTab.jsx`:
1. **CustomUpload** - Handles upload button and crop editor UI
2. **PresetGrid** - Displays the preset avatar selection grid

Both components will be lightweight UI components that receive state and handlers as props from the parent.

---

## Current Structure

```
AvatarTab/
├── AvatarTab.jsx (191 lines - contains ALL logic and UI)
├── AvatarDisplay.jsx
├── CropEditor.jsx (already separate)
├── SizePreview.jsx (already separate)
├── useCrop.js (already separate)
├── renderCrop.js (already separate)
└── presetAvatars.js (already separate)
```

---

## New Structure After Separation

```
AvatarTab/
├── AvatarTab.jsx (simplified - manages state, imports components)
├── CustomUpload.jsx (NEW - upload UI + crop editor)
├── PresetGrid.jsx (NEW - preset selection grid)
├── AvatarDisplay.jsx
├── CropEditor.jsx (used by CustomUpload)
├── SizePreview.jsx
├── useCrop.js
├── renderCrop.js
└── presetAvatars.js
```

---

## Component 1: PresetGrid.jsx

### Description
Renders the grid of preset avatar options with selection highlighting.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `selectedId` | `string` | Currently selected preset ID |
| `onSelect` | `(id: string) => void` | Callback when preset is selected |

### Code to Extract (lines 79-123 of AvatarTab.jsx)

```jsx
import { PRESET_AVATARS } from './presetAvatars';

export function PresetGrid({ selectedId, onSelect }) {
  return (
    <div>
      <p className='text-xs uppercase tracking-widest text-zinc-500 mb-3'>
        Choose a rider
      </p>
      <div className='grid grid-cols-4 gap-3'>
        {PRESET_AVATARS.map(({ id, icon: Icon, label, color, bg, ring }) => {
          const isActive = selectedId === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className='flex flex-col items-center gap-2 group focus:outline-none'
            >
              <div
                style={{
                  background: bg,
                  boxShadow: isActive
                    ? `0 0 0 2px ${ring}, 0 0 12px 2px ${ring}`
                    : undefined,
                }}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-200 border-2
                  ${
                    isActive
                      ? 'border-zinc-700 scale-105'
                      : 'border-zinc-700 opacity-60 group-hover:opacity-90 group-hover:scale-105'
                  }
                `}
              >
                <Icon size={34} color={color} />
              </div>
              <span
                style={{ color: isActive ? color : undefined }}
                className={`text-[11px] tracking-wide transition-colors duration-150 ${
                  isActive ? '' : 'text-zinc-500 group-hover:text-zinc-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
```

---

## Component 2: CustomUpload.jsx

### Description
Renders the upload button and crop editor. Shows upload button when not in crop mode, shows crop editor when in crop mode.

### Props
| Prop | Type | Description |
|------|------|-------------|
| `isSelected` | `boolean` | Whether custom upload is currently selected |
| `croppedDataUrl` | `string \| null` | URL of the cropped image (for button text) |
| `cropMode` | `boolean` | Whether crop editor is active |
| `uploadedSrc` | `string \| null` | Uploaded image source |
| `cropState` | `object` | Crop state from useCrop hook |
| `saving` | `boolean` | Whether save operation is in progress |
| `canvasRef` | `RefObject` | Canvas ref for rendering crop |
| `onUploadClick` | `() => void` | Callback when upload button is clicked |
| `onSaveCrop` | `() => Promise<void>` | Callback when crop is saved |
| `onCancelCrop` | `() => void` | Callback when crop is cancelled |

### Code to Extract (lines 135-178 of AvatarTab.jsx)

```jsx
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
      <p className='text-xs uppercase tracking-widest text-zinc-500 mb-3'>
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
```

---

## Modified AvatarTab.jsx

### Changes
1. Extract file input handling to `CustomUpload`
2. Import and use `PresetGrid` and `CustomUpload` components
3. Pass appropriate props to child components

### After Refactoring (simplified)

```jsx
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

  const fileRef = useRef(null);
  const canvasRef = useRef(null);
  const cropState = useCrop(uploadedSrc);

  useEffect(() => {
    const up = () => cropState.handlers.onMouseUp();
    window.addEventListener('mouseup', up);
    return () => window.removeEventListener('mouseup', up);
  }, [cropState.handlers]);

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
    <div className='flex flex-col gap-6'>
      <div className='text-lg font-semibold tracking-wider text-zinc-300'>
        Avatar
      </div>

      <PresetGrid selectedId={selected} onSelect={handleSelectPreset} />

      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-zinc-800' />
        <span className='text-[10px] uppercase tracking-widest text-zinc-600'>
          or
        </span>
        <div className='flex-1 h-px bg-zinc-800' />
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

      <SizePreview selected={selected} customDataUrl={croppedDataUrl} />

      <div className='flex justify-end pt-1'>
        <button className='px-5 py-2 rounded text-sm bg-zinc-200 text-zinc-900 hover:bg-white font-semibold tracking-wide transition-all'>
          Save avatar
        </button>
      </div>
    </div>
  );
}
```

---

## File Summary

| File | Action | Lines |
|------|--------|-------|
| `PresetGrid.jsx` | CREATE | 55 lines |
| `CustomUpload.jsx` | CREATE | 70 lines |
| `AvatarTab.jsx` | MODIFY | Reduce from 191 to ~140 lines |

---

## Benefits

1. **Separation of Concerns** - Each component has a single clear responsibility
2. **Reusability** - `PresetGrid` and `CustomUpload` can be reused if needed
3. **Readability** - AvatarTab is now ~50 lines shorter and easier to understand
4. **Maintainability** - Changes to upload UI or preset grid are isolated
5. **Testability** - Smaller components are easier to test individually