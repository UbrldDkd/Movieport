import { AvatarDisplay } from './AvatarDisplay';
import { PRESET_AVATARS } from './constants/presetAvatars';

const SIZES = [
  { px: 64, label: 'LG' },
  { px: 40, label: 'MD' },
  { px: 28, label: 'SM' },
];

/**
 * Preview strip showing the current avatar across standard sizes,
 * plus a mock comment row for real-world context.
 */
export function SizePreview({ selected, customDataUrl, username }) {
  const preset = PRESET_AVATARS.find((p) => p.id === selected);
  const isCustom = selected === 'custom';

  return (
    <div>
      <p className='text-xs font-semibold  tracking-widest text-zinc-500 mb-2'>
        Preview:
      </p>
      <div className=' rounded-lg pb-2 px-2 pt-3 border-2 w-fit border-zinc-800'>
        <div className='flex flex-col md:flex-row'>
          <div className='flex items-baseline gap-3'>
            {SIZES.map(({ px, label }) => (
              <div key={label} className='flex flex-col items-center'>
                <AvatarDisplay
                  selected={selected}
                  customDataUrl={customDataUrl}
                  size={px}
                />
                <span className='text-zinc-500 text-xs font-semibold'>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Contextual mock — comment row */}
          <div className='flex-1 flex   items-center gap-2  ml-2 border-l border-zinc-800 pl-2'>
            <div
              style={{
                background: isCustom ? '#18181b' : preset?.bg,
                width: 28,
                height: 28,
              }}
              className='rounded-full border-2 border-zinc-700 overflow-hidden flex items-center justify-center flex-shrink-0'
            >
              {isCustom && customDataUrl ? (
                <img
                  src={customDataUrl}
                  className='w-full h-full object-cover'
                  alt='avatar'
                />
              ) : preset ? (
                <preset.icon size={16} color={preset.color} />
              ) : null}
            </div>
            <div className='flex items-baseline font-semibold tracking-wider  gap-2'>
              <span className='text-text-primary text-xs font-semibold'>
                {username}
              </span>
              <span className='text-zinc-600 text-[10px]'>rated</span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='text-zinc-500 font-semibold tracking-wider text-[10px]'>
                ★★★★½ — what a film.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
