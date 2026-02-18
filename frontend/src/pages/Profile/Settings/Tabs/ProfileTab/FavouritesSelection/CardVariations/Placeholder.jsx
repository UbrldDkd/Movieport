export default function Placeholder({ onAdd }) {
  return (
    <div className='w-full aspect-2/3 bg-zinc-800 hover:border-zinc-700  rounded-sm flex items-center justify-center cursor-pointer border-2 border-zinc-700/20 shadow-lg shadow-zinc-950 outline outline-transparent hover:outline-2 hover:outline-zinc-800 transition-all duration-150'>
      <div className=' shadow-[0_0_10px_rgba(0,0,0,0.10)] shadow-zinc-900/90 w-8 h-8 flex items-center justify-center bg-zinc-700  text-zinc-300  text-xl rounded-xs transition-all duration-200'>
        +
      </div>
    </div>
  );
}
