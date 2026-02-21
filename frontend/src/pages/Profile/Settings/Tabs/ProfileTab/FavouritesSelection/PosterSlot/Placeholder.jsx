import { IoMdAdd } from 'react-icons/io';

export default function Placeholder({ onAdd, status }) {
  return (
    <div
      className={`w-full aspect-2/3 hover:border-zinc-700  rounded-sm flex items-center justify-center cursor-pointer border-2 border-zinc-700/20 shadow-sm shadow-zinc-950/50  transition-all duration-150 ${status?.isDragging ? 'bg-zinc-800/70 border-zinc-800 ' : 'bg-zinc-800'}`}
    >
      <div className=' shadow-[0_0_10px_rgba(0,0,0,0.10)] shadow-zinc-900/90 w-8 h-8 flex items-center justify-center bg-zinc-700  text-text-primary  text-xl rounded-xs transition-all duration-200'>
        <IoMdAdd />
      </div>
    </div>
  );
}
