export default function SelectCButton({ item, selectedItems, onSelect }) {
  const isSelected = selectedItems.some(
    (selected) => selected.code === item.code
  );

  return (
    <button
      id={item.code}
      onClick={() => onSelect(item)}
      className={`flex items-center cursor-pointer p-1 rounded w-full h-7 mt-0 text-left text-sm min-w-[125px] ${
        isSelected
          ? 'bg-red-950 text-white hover:bg-white hover:text-red-950 transition-colors duration-80'
          : 'bg-zinc-900 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 transition-colors duration-80'
      }`}
    >
      {item.name}
    </button>
  );
}
