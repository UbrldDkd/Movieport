export default function SettingInput({
  label,
  name,
  type = 'text',
  multiline = false,
  required = false,
  placeholder = '',
}) {
  const baseClass =
    'w-full bg-zinc-800 border-2 border-zinc-700 text-zinc-300 px-3 sm:py-0.5 md:py-1 rounded-xs focus:outline-none focus:border-red-950 focus:bg-zinc-700 cursor-pointer transition duration-200';

  return (
    <div className='flex bg-zinc-400w-full flex-col'>
      <label className='block tracking-widest text-xs font-medium text-zinc-300 mb-1 sm:mb-2 md:mb-2'>
        {label}
      </label>
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          className={`${baseClass} max-h-[300px] min-h-full scrollbar-hide resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
