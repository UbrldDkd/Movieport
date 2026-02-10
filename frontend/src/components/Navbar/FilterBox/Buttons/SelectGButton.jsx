export default function SelectGButton({ item, id, selectedItems, onSelect }) {
  return (
    <button
      key={id}
      id={id}
      onClick={() => onSelect(id)}
      className={`flex item-center cursor-pointer p-1 rounded w-full h-7 mt-0 text-left text-sm min-w-[125px] ${
        selectedItems.includes(id)
          ? 'bg-red-950 text-zinc-300 hover:bg-zinc-300/90 hover:text-red-950 transition-colors duration-80'
          : 'bg-zinc-950/40 text-zinc-300/90 hover:text-zinc-300 hover:bg-zinc-800 min-w-[100px] transition-colors duration-80'
      }`}
    >
      {item}
    </button>
  );
}
