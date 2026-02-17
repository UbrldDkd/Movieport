export default function NavButton({ label }) {
  return (
    <button className='select-none cursor-pointer text-zinc-300 font-semibold tracking-wider px-3 py-2 rounded  hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
      {label}
    </button>
  );
}
