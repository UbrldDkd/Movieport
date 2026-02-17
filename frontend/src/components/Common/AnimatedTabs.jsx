import { useEffect, useRef, useState } from 'react';

export default function AnimatedTabs({ tabs, activeKey, onChange }) {
  const refs = useRef({});
  const [borderStyle, setBorderStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    const el = refs.current[activeKey];
    if (!el) return;

    setBorderStyle({
      width: el.offsetWidth,
      left: el.offsetLeft,
    });
  }, [activeKey]);

  return (
    <div className='relative flex gap-2 sm:gap-4 text-xs font-semibold tracking-widest mb-3'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          ref={(el) => (refs.current[tab.key] = el)}
          onClick={() => onChange(tab.key)}
          className={`whitespace-nowrap ${
            activeKey === tab.key
              ? 'text-zinc-200 '
              : 'text-zinc-400 cursor-pointer'
          }`}
        >
          {tab.label.toUpperCase()}
        </button>
      ))}

      <div
        className='absolute bottom-0 h-px bg-zinc-300/90 transition-all duration-300'
        style={{
          width: borderStyle.width,
          transform: `translateX(${borderStyle.left}px)`,
        }}
      />
    </div>
  );
}
