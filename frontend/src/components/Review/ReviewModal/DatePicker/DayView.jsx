const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function DayView({
  view,
  selected,
  minDate,
  maxDate,
  onSelectDay,
}) {
  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <>
      <div className='grid grid-cols-7 mb-1'>
        {DAYS.map((d) => (
          <div
            key={d}
            className='text-center text-[10px] tracking-wider text-zinc-600 py-1'
          >
            {d}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-7'>
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const date = new Date(view.year, view.month, day);
          const isDisabled = date < minDate || date > maxDate;
          const isSelected = date.toDateString() === selected.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <button
              key={day}
              type='button'
              onClick={() => onSelectDay(day)}
              disabled={isDisabled}
              className={`text-xs py-1.5 rounded-sm transition-colors
                ${isSelected ? 'bg-red-950 text-red-200' : ''}
                ${isToday && !isSelected ? 'text-red-400' : ''}
                ${!isSelected && !isDisabled ? 'text-zinc-300 hover:bg-zinc-800' : ''}
                ${isDisabled ? 'text-zinc-700 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}
