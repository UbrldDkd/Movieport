import { useState } from 'react';
import { useCreateList } from '../../../api/lists/useCreateList';

export default function MiniCreateListModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const createList = useCreateList();

  const handleCreate = async () => {
    if (!title.trim()) return;
    await createList({ title, description, public: isPublic });
    onClose();
  };

  return (
    <div className='fixed inset-0 z-[9999] flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black/20 backdrop-blur-xs'
        onClick={onClose}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-zinc-900 border z-2 border-zinc-700 rounded-sm p-4 flex flex-col gap-3 w-full max-w-sm text-zinc-200 shadow-xl'
      >
        <h2 className='font-semibold tracking-widest'>Create New List</h2>

        {/* Title + Public/Private toggle on same row */}
        <div className='flex items-center gap-2'>
          <input
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='px-2 py-1 border-2 placeholder:font-light placeholder:tracking-wider border-zinc-700/90 rounded bg-zinc-800 outline-none flex-1'
          />
          <div className='flex gap-1'>
            <button
              className={`py-1 px-2  transition-colors duration-150 rounded-l-2xl hover:cursor-pointer border-2 border-zinc-700 text-xs tracking-widest font-semibold ${
                isPublic
                  ? 'bg-red-950 text-zinc-300 hover:text-zinc-400'
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:text-zinc-300'
              }`}
              onClick={() => setIsPublic(true)}
            >
              Public
            </button>
            <button
              className={`py-1 px-2 transition-colors duration-150 rounded-r-2xl hover:cursor-pointer border-2 border-zinc-700 text-xs font-semibold tracking-widest ${
                !isPublic
                  ? 'bg-red-950 text-zinc-300 hover:text-zinc-400'
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-900 hover:text-zinc-300'
              }`}
              onClick={() => setIsPublic(false)}
            >
              Private
            </button>
          </div>
        </div>

        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='px-2 py-1 placeholder:font-light placeholder:tracking-wider border-2 border-zinc-700/90 resize-none scrollbar-hide rounded bg-zinc-800 outline-none w-full'
        />

        {/* Footer buttons */}
        <div className='flex font-semibold text-sm tracking-widest justify-end gap-2'>
          <button className='px-3 py-1.5 bg-zinc-700 rounded' onClick={onClose}>
            Cancel
          </button>
          <button
            className='px-3 py-1.5 bg-red-950 rounded text-zinc-100'
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
