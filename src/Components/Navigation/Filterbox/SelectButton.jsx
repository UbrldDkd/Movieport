export default function SelectButton({item, selectedItem, onSelect}) {
    return (
      <button
      key={item}
      onClick={() => onSelect(item)}
      className={`p-1.5 rounded w-full h-10 text-base mt-0 text-left ml-1 min-w-[100px] ${
                selectedItem === item
                  ? 'bg-red-950 text-white hover:bg-white hover:text-red-950 transition-colors duration-300'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 min-w-[100px] transition-colors duration-300'
              }`}

      >
      {item}
      </button>
    )
  }