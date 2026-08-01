export default function YearView({
  yearRangeStart,
  selected,
  minDate,
  maxDate,
  onSelectYear,
}) {
  const years = Array.from({ length: 12 }, (_, i) => yearRangeStart + i);

  const isYearDisabled = (yr) =>
    yr < minDate.getFullYear() || yr > maxDate.getFullYear();

  return (
    <div className='grid grid-cols-4 gap-1'>
      {years.map((yr) => {
        const disabled = isYearDisabled(yr);
        const isSelected = yr === selected.getFullYear();
        return (
          <button
            key={yr}
            type='button'
            onClick={() => onSelectYear(yr)}
            disabled={disabled}
            className={`text-xs py-2 rounded-sm transition-colors
              ${isSelected ? 'bg-red-950 text-red-200' : ''}
              ${!isSelected && !disabled ? 'text-zinc-300 hover:bg-zinc-800' : ''}
              ${disabled ? 'text-zinc-700 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {yr}
          </button>
        );
      })}
    </div>
  );
}
