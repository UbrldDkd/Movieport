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