import { PRESET_AVATARS } from './presetAvatars';

/**
 * Renders a single circular avatar at `size` px.
 * Works for both preset icons and a custom cropped image.
 */
export function AvatarDisplay({ selected, customDataUrl, size }) {
  const isCustom = selected === 'custom';
  const preset = PRESET_AVATARS.find((p) => p.id === selected);

  if (!selected) {
    return (
      <div
        style={{ width: size, height: size }}
        className='rounded-full bg-zinc-800 border-2 border-zinc-700 flex-shrink-0'
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        background: isCustom ? '#18181b' : preset?.bg,
      }}
      className='rounded-full border-2 border-zinc-600 overflow-hidden flex items-center justify-center flex-shrink-0'
    >
      {isCustom && customDataUrl ? (
        <img
          src={customDataUrl}
          alt='avatar'
          className='w-full h-full object-cover'
        />
      ) : preset ? (
        <preset.icon size={size * 0.6} color={preset.color} />
      ) : null}
    </div>
  );
}
