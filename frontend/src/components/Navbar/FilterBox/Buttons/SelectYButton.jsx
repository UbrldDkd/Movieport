export default function SelectButton({ item, id, selectedItems, onSelect }) {
  return (
    <button
      key={id}
      id={id}
      onClick={() => onSelect(id)}
      className={`flex items-center justify-center cursor-pointer p-1 rounded w-full h-7 mt-0 text-sm min-w-[125px] ${
        selectedItems.includes(id)
          ? 'bg-red-950 text-white hover:bg-white hover:text-red-950 transition-colors duration-80'
          : 'bg-bg-secondary text-zinc-400 hover:text-text-primary hover:bg-zinc-800 min-w-[100px] transition-colors duration-80'
      }`}
    >
      {item}
    </button>
  );
}
