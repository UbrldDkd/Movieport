export default function NavButton({ label }) {
  return (
    <div>
      <button className='select-none cursor-pointer text-zinc-300 font-semibold tracking-wider px-3 py-1.5 md:py-2 text-sm md:text-base rounded md:ml-2 hover:text-zinc-400 transition-colors duration-300'>
        {label}
      </button>
    </div>
  );
}
