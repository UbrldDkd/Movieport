export default function SelectButton({item, selectedItem, onSelect}) {
    return (
      <button
      key={item}
      onClick={() => onSelect(item)}
      className={`flex item-center p-1 rounded w-full h-7 mt-0 text-left text-sm min-w-[125px] ${
                selectedItem === item
                  ? 'bg-red-950 text-white hover:bg-white hover:text-red-950 transition-colors duration-100'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800 min-w-[100px] transition-colors duration-100'
              }`}

      >
      {item}
      </button>
    )
  }