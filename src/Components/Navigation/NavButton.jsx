export default function NavButton({ label }) {
  return (
    <div>
      <button className="bg-red-950 text-zinc-200 px-4 py-2 rounded ml-2 hover:text-zinc-100">
        {label}
      </button>
    </div>
  );
}
