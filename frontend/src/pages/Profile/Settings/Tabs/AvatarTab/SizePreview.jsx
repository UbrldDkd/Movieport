import { AvatarDisplay } from './AvatarDisplay';
import { PRESET_AVATARS } from './presetAvatars';

const SIZES = [
  { px: 64, label: 'Large' },
  { px: 40, label: 'Medium' },
  { px: 28, label: 'Small' },
  { px: 20, label: 'Tiny' },
];

/**
 * Preview strip showing the current avatar across standard sizes,
 * plus a mock comment row for real-world context.
 */
export function SizePreview({ selected, customDataUrl }) {
  const preset = PRESET_AVATARS.find((p) => p.id === selected);
  const isCustom = selected === 'custom';

  return (
    <div>
      <p className='text-xs uppercase tracking-widest text-zinc-500 mb-3'>
        Preview
      </p>
      <div className='bg-zinc-900/60 rounded-lg px-5 py-4 border border-zinc-800'>
        <div className='flex flex-col md:flex-row'>
          <div className='flex items-end gap-6'>
            {SIZES.map(({ px, label }) => (
              <div key={label} className='flex flex-col items-center gap-1'>
                <AvatarDisplay
                  selected={selected}
                  customDataUrl={customDataUrl}
                  size={px}
                />
                <span className='text-zinc-400 text-[10px]'>{label}</span>
              </div>
            ))}
          </div>

          {/* Contextual mock — comment row */}
          <div className='flex-1 flex items-center gap-2 mb-0.5 ml-2 border-l border-zinc-800 pl-6'>
            <div
              style={{
                background: isCustom ? '#18181b' : preset?.bg,
                width: 28,
                height: 28,
              }}
              className='rounded-full border border-zinc-700 overflow-hidden flex items-center justify-center flex-shrink-0'
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
            <div className='flex flex-col gap-1'>
              <div className='flex items-baseline gap-2'>
                <span className='text-zinc-300 text-xs font-semibold'>You</span>
                <span className='text-zinc-600 text-[10px]'>just now</span>
              </div>
              <span className='text-zinc-500 text-[10px]'>
                ★★★★½ — what a film.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
