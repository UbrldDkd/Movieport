export default function NavButton({ label}) {
  return (
    <div>
      <button className="bg-red-950 select-none cursor-pointer text-zinc-200 px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base rounded md:ml-2 hover:text-zinc-400 transition-colors duration-300">
        {label}
      </button>
    </div>
  );
}
