export default function SettingsCheckbox({ checked, onChange, label }) {
  const holes = Array.from({ length: 4 });

  return (
    <label className='flex items-center gap-3 cursor-pointer select-none'>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className='peer sr-only'
      />

      <div
        className='
        relative flex-shrink-0 w-8 h-10
        bg-[#1e1e1e] flex items-center justify-center
        transition-colors duration-200
        peer-checked:bg-[#1e0505]
      '
      >
        <div className='absolute left-0 top-0 bottom-0 w-[7px] bg-[#111] flex flex-col items-center justify-evenly py-1'>
          {holes.map((_, i) => (
            <div
              key={i}
              className='w-1 h-1 rounded-[0.5px] bg-[#333] transition-colors peer-checked:bg-[#4a0a0a]'
            />
          ))}
        </div>
        <div className='absolute right-0 top-0 bottom-0 w-[7px] bg-[#111] flex flex-col items-center justify-evenly py-1'>
          {holes.map((_, i) => (
            <div
              key={i}
              className='w-1 h-1 rounded-[0.5px] bg-[#333] transition-colors peer-checked:bg-[#4a0a0a]'
            />
          ))}
        </div>

        <div className='w-4 h-7 bg-[#2a2a2a] flex items-center justify-center transition-colors peer-checked:bg-[#2a0808]'>
          <svg
            viewBox='0 0 10 10'
            className='w-[10px] h-[10px] transition-opacity duration-200'
            style={{ opacity: checked ? 1 : 0 }}
            stroke='#e03333'
            strokeWidth='2.5'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <polyline points='1.5,5 4,7.5 8.5,2.5' />
          </svg>
        </div>
      </div>

      <span className='text-text-primary tracking-wider text-sm font-semibold'>
        {label}
      </span>
    </label>
  );
}
