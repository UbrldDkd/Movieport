export default function NavButton({ label }) {
  return (
    <button className='select-none cursor-pointer text-text-primary font-semibold tracking-wider text-sm md:text-base px-3  py-2 md:py-2 rounded  hover:text-zinc-400 transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis max-w-full'>
      {label}
    </button>
  );
}
