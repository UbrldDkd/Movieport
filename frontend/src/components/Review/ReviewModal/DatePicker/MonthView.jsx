const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export default function MonthView({
  view,
  selected,
  minDate,
  maxDate,
  onSelectMonth,
}) {
  const isMonthDisabled = (mIdx) => {
    const start = new Date(view.year, mIdx, 1);
    const end = new Date(view.year, mIdx + 1, 0);
    return end < minDate || start > maxDate;
  };

  return (
    <div className='grid grid-cols-4 gap-1'>
      {MONTHS.map((m, i) => {
        const disabled = isMonthDisabled(i);
        const isSelected =
          i === selected.getMonth() && view.year === selected.getFullYear();
        return (
          <button
            key={m}
            type='button'
            onClick={() => onSelectMonth(i)}
            disabled={disabled}
            className={`text-xs py-2 rounded-sm transition-colors
              ${isSelected ? 'bg-red-950 text-red-200' : ''}
              ${!isSelected && !disabled ? 'text-zinc-300 hover:bg-zinc-800' : ''}
              ${disabled ? 'text-zinc-700 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
}
