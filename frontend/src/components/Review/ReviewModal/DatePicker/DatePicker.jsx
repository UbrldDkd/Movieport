import { useEffect, useRef, useState } from 'react';
import DayView from './DayView';
import MonthView from './MonthView';
import YearView from './YearView';

export default function DatePicker({ value, min, max, onChange, onClose }) {
  const [mode, setMode] = useState('day');
  const [view, setView] = useState(() => {
    const d = new Date(value + 'T00:00:00');
    return { month: d.getMonth(), year: d.getFullYear() };
  });
  const [yearRangeStart, setYearRangeStart] = useState(() => {
    const d = new Date(value + 'T00:00:00');
    return Math.floor(d.getFullYear() / 12) * 12;
  });
  const ref = useRef(null);

  const minDate = new Date(min + 'T00:00:00');
  const maxDate = new Date(max + 'T00:00:00');
  const selected = new Date(value + 'T00:00:00');

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleSelectDay = (day) => {
    const d = new Date(view.year, view.month, day);
    if (d < minDate || d > maxDate) return;
    onChange(d.toISOString().split('T')[0]);
    onClose();
  };

  const handleSelectMonth = (mIdx) => {
    setView((v) => ({ ...v, month: mIdx }));
    setMode('day');
  };

  const handleSelectYear = (yr) => {
    setView((v) => ({ ...v, year: yr }));
    setMode('month');
  };

  const handleHeaderClick = () => {
    if (mode === 'day') setMode('month');
    else if (mode === 'month') setMode('year');
  };

  const handlePrev = () => {
    if (mode === 'day')
      setView((v) =>
        v.month === 0
          ? { month: 11, year: v.year - 1 }
          : { ...v, month: v.month - 1 }
      );
    if (mode === 'month') setView((v) => ({ ...v, year: v.year - 1 }));
    if (mode === 'year') setYearRangeStart((y) => y - 12);
  };

  const handleNext = () => {
    if (mode === 'day')
      setView((v) =>
        v.month === 11
          ? { month: 0, year: v.year + 1 }
          : { ...v, month: v.month + 1 }
      );
    if (mode === 'month') setView((v) => ({ ...v, year: v.year + 1 }));
    if (mode === 'year') setYearRangeStart((y) => y + 12);
  };

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

  const canPrev = (() => {
    if (mode === 'day')
      return (
        new Date(view.year, view.month, 1) >
        new Date(minDate.getFullYear(), minDate.getMonth(), 1)
      );
    if (mode === 'month') return view.year > minDate.getFullYear();
    return yearRangeStart - 12 >= minDate.getFullYear() - 11;
  })();

  const canNext = (() => {
    if (mode === 'day')
      return (
        new Date(view.year, view.month, 1) <
        new Date(maxDate.getFullYear(), maxDate.getMonth(), 1)
      );
    if (mode === 'month') return view.year < maxDate.getFullYear();
    return yearRangeStart + 12 <= maxDate.getFullYear() + 11;
  })();

  const headerLabel = () => {
    if (mode === 'day') return `${MONTHS[view.month]} ${view.year}`;
    if (mode === 'month') return `${view.year}`;
    return `${yearRangeStart} – ${yearRangeStart + 11}`;
  };

  return (
    <div
      ref={ref}
      className='absolute top-full left-0 mt-1 z-50 bg-zinc-900 border-2 border-zinc-700 rounded-sm shadow-xl p-3 w-64'
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex items-center justify-between mb-3'>
        <button
          type='button'
          onClick={handlePrev}
          disabled={!canPrev}
          className='text-zinc-400 hover:text-zinc-100 disabled:opacity-20 transition-colors w-6 text-lg'
        >
          ‹
        </button>
        <button
          type='button'
          onClick={handleHeaderClick}
          className='text-xs font-semibold tracking-widest uppercase text-zinc-200 hover:text-white transition-colors'
        >
          {headerLabel()}
        </button>
        <button
          type='button'
          onClick={handleNext}
          disabled={!canNext}
          className='text-zinc-400 hover:text-zinc-100 disabled:opacity-20 transition-colors w-6 text-lg'
        >
          ›
        </button>
      </div>

      {mode === 'day' && (
        <DayView
          view={view}
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          onSelectDay={handleSelectDay}
        />
      )}
      {mode === 'month' && (
        <MonthView
          view={view}
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          onSelectMonth={handleSelectMonth}
        />
      )}
      {mode === 'year' && (
        <YearView
          yearRangeStart={yearRangeStart}
          selected={selected}
          minDate={minDate}
          maxDate={maxDate}
          onSelectYear={handleSelectYear}
        />
      )}
    </div>
  );
}
