// Standard library imports

// Third-party imports

// Local application imports

export default function EditListHeader({ newList, handleChange }) {
  return (
    <div className='flex flex-col md:flex-row gap-6 mb-6 w-full opacity-0 animate-fadeIn'>
      {/* Left column - Title and visibility */}
      <div className='flex flex-1 flex-col gap-3 w-full'>
        {/* Title input */}
        <div className='w-full'>
          <label className='text-xs font-semibold tracking-wider text-zinc-400/90'>
            TITLE
          </label>
          <input
            value={newList?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder='Enter list title...'
            className='mt-1 placeholder:font-semibold placeholder:tracking-wide w-full max-w-full border-2 border-zinc-700/90 px-2 py-1.5 rounded-sm text-zinc-200/90 bg-zinc-800/80 tracking-wide focus:bg-zinc-700 focus:outline-none transition-colors text-[16.3px] duration-120 box-border placeholder:text-zinc-600'
          />
        </div>

        {/* Public / Private toggle */}
        <div className='flex w-full gap-2 tracking-widest font-semibold'>
          <button
            onClick={() => handleChange('public', true)}
            className={`px-3 py-1.5 w-full transition-colors duration-180 text-xs rounded-l-3xl hover:cursor-pointer ${
              newList?.public ? 'bg-red-950' : 'bg-zinc-800'
            }`}
          >
            Public
          </button>
          <button
            onClick={() => handleChange('public', false)}
            className={`px-3 py-1.5 w-full transition-colors duration-180 text-xs rounded-r-3xl hover:cursor-pointer ${
              !newList?.public ? 'bg-red-950' : 'bg-zinc-800'
            }`}
          >
            Private
          </button>
        </div>
      </div>

      {/* Right column - Description */}
      <div className='flex-1 w-full'>
        <label className='text-xs font-semibold tracking-wider text-zinc-400/90'>
          DESCRIPTION
        </label>
        <textarea
          value={newList?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder='Add a description for your list...'
          rows={5}
          className='mt-1 placeholder:font-semibold placeholder:tracking-wide w-full max-w-full tracking-wide bg-zinc-800/70 border-2 border-zinc-700/90 text-zinc-300/90 text-[16px] leading-4.5 px-2 py-1.5 rounded-sm resize-none focus:outline-none focus:bg-zinc-700 scrollbar-hide box-border placeholder:text-zinc-600'
        />
      </div>
    </div>
  );
}
