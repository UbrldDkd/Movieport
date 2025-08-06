export default function NavButton({ label}) {
  return (
    <div>
      <button className="bg-red-950 select-none cursor-pointer text-zinc-200 px-4 py-2 rounded ml-2 hover:text-zinc-400">
        {label}
      </button>
    </div>
  );
}
