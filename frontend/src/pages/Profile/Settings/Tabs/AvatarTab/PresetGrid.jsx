import { PRESET_AVATARS } from './constants/presetAvatars';

export function PresetGrid({ selectedId, onSelect }) {
  return (
    <div>
      <p className='text-xs tracking-widest text-zinc-500 font-semibold  mb-2'>
        Choose from default riders
      </p>

      <div className='flex  w-fit gap-3'>
        {PRESET_AVATARS.map(({ id, icon: Icon, label, color, bg, ring }) => {
          const isActive = selectedId === id;
          return (
            <button
              key={id}
              onClick={() => onSelect(id)}
              className='flex flex-col items-center gap-1 group focus:outline-none'
            >
              <div
                style={{
                  background: bg,
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
                style={{ color: isActive ? color : null }}
                className={`text-[11px] font-semibold tracking-wide transition-colors duration-150 ${
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
