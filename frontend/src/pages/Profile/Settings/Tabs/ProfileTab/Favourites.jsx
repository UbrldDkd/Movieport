import { useState, useRef, useLayoutEffect } from 'react';
import { posterSizes } from '../../../../../utils/constants/posterSizes';

const MOCK_MOVIES = [
  {
    id: 'f1',
    tmdb_id: 1001,
    position: 0,
    poster_path: '/9cqNxx0GxF0bAY74W56MAxi5q5c.jpg',
    title: 'Trainspotting',
  },
  {
    id: 'f2',
    tmdb_id: 1002,
    position: 1,
    poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    title: 'The Lighthouse',
  },
  {
    id: 'f3',
    tmdb_id: 1003,
    position: 2,
    poster_path: '/5KcQri5y8k7XzY0Wz9y0Z0Wz9y0.jpg',
    title: 'Enter the Void',
  },
  {
    id: 'f4',
    tmdb_id: 1004,
    position: 3,
    poster_path: '/sV2KZ9mK7Z9mK7Z9mK7Z9mK7Z9m.jpg',
    title: 'Mulholland Dr.',
  },
];

const POOL = [
  {
    id: 'p1',
    tmdb_id: 2001,
    poster_path: '/example1.jpg',
    title: 'Hereditary',
  },
  {
    id: 'p2',
    tmdb_id: 2002,
    poster_path: '/example2.jpg',
    title: '2001: Odyssey',
  },
];

function MoviePoster({ card, onRemove }) {
  const [loaded, setLoaded] = useState(false);
  const { tmdb } = posterSizes.favouritesSelection;

  return (
    <div className='group relative w-full aspect-[2/3] rounded-sm overflow-hidden bg-zinc-800 shadow-md border-2 border-zinc-800 outline outline-transparent hover:outline-2 hover:outline-zinc-800 hover:scale-105 transition-all duration-300'>
      {!loaded && (
        <div className='absolute inset-0 bg-zinc-700 animate-pulse-slow' />
      )}
      <img
        src={`https://image.tmdb.org/t/p/${tmdb}${card.poster_path}`}
        alt={card.title}
        draggable={false}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 will-change-transform transform-gpu backface-hidden ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
      <div className='absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-sm transition-all duration-200' />
      <span className='absolute inset-x-0 bottom-0 px-2 pb-2 pt-6 text-[10px] leading-tight font-medium text-white bg-gradient-to-t from-black/70 to-transparent'>
        {card.title}
      </span>
      <button
        onClick={onRemove}
        className='absolute top-1.5 left-1.5 z-10 w-5 h-5 flex items-center justify-center bg-black/70 hover:bg-red-950 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200'
      >
        ✕
      </button>
    </div>
  );
}

function Placeholder({ isDragging }) {
  return (
    <div
      className={`
        w-full aspect-[2/3] bg-zinc-800 rounded-sm flex items-center justify-center
        ${!isDragging ? 'hover:border-zinc-700' : ''}
        cursor-pointer border-2 border-zinc-700/20 shadow-md shadow-zinc-950/20
        outline outline-transparent hover:outline-2 hover:outline-zinc-800
      `}
    >
      <div className='shadow-[0_0_10px_rgba(0,0,0,0.10)] shadow-zinc-900/90 w-8 h-8 flex items-center justify-center bg-zinc-700 text-text-primary text-xl rounded-xs transition-all duration-200'>
        +
      </div>
    </div>
  );
}

export default function Favourites({ movies = MOCK_MOVIES }) {
  const [cards, setCards] = useState(
    movies.filter((m) => m.poster_path).slice(0, 4)
  );
  const poolRef = useRef(POOL);

  const refsMap = useRef({});
  const prevRects = useRef({});

  const [draggedPos, setDraggedPos] = useState(null);
  const [dragOverPos, setDragOverPos] = useState(null);
  const [droppedPos, setDroppedPos] = useState(null);
  const [previewCards, setPreviewCards] = useState(null);
  const dragFromPos = useRef(null);
  const isDragging = useRef(false);

  const displayCards = previewCards || cards;

  const snapshot = () => {
    prevRects.current = {};
    for (const [id, node] of Object.entries(refsMap.current)) {
      if (node) prevRects.current[id] = node.getBoundingClientRect();
    }
  };

  const flip = () => {
    for (const [id, node] of Object.entries(refsMap.current)) {
      if (!node || !prevRects.current[id]) continue;
      const prev = prevRects.current[id];
      const next = node.getBoundingClientRect();
      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      if (dx === 0 && dy === 0) continue;
      node.style.transition = 'none';
      node.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        node.style.transition = 'transform 250ms ease';
        node.style.transform = '';
      });
    }
  };

  useLayoutEffect(() => {
    flip();
  });

  const calculatePreview = (fromPos, toPos) => {
    if (fromPos === null || fromPos === toPos) return null;
    const newSlots = [...cards];
    const draggedItem = newSlots[fromPos];
    if (!draggedItem) return null;
    newSlots[fromPos] = newSlots[toPos];
    newSlots[toPos] = cards[fromPos];
    return newSlots;
  };

  const resetDragState = () => {
    setDraggedPos(null);
    setDragOverPos(null);
    setPreviewCards(null);
    dragFromPos.current = null;
    isDragging.current = false;
  };

  const handleDragStart = (pos) => {
    if (!cards[pos]?.poster_path) return;

    snapshot();
    isDragging.current = true;
    dragFromPos.current = pos;
    setDraggedPos(pos);
  };

  const handleDragOver = (hoverPos) => {
    if (dragFromPos.current === null) return;

    setDragOverPos(hoverPos);
    const preview = calculatePreview(dragFromPos.current, hoverPos);
    setPreviewCards(preview);
  };

  const handleDragEnd = () => {
    resetDragState();
  };

  const handleDrop = (dropPos) => {
    if (dragFromPos.current === null) return;
    const fromPos = dragFromPos.current;

    if (fromPos !== dropPos && previewCards) {
      setCards(previewCards);
      setDroppedPos(dropPos);
      setTimeout(() => setDroppedPos(null), 500);
    }

    resetDragState();
  };

  const remove = (id) => {
    if (isDragging.current) return;

    snapshot();

    const next = poolRef.current.length
      ? (() => {
          const [n, ...rest] = poolRef.current;
          poolRef.current = rest;
          return n;
        })()
      : null;

    setCards((prev) => prev.filter((c) => c.id !== id));

    if (next) {
      setTimeout(() => {
        snapshot();
        setCards((prev) => [...prev, next]);
      }, 220);
    }
  };

  return (
    <div className='flex flex-col bg-bg-secondary min-h-screen p-8 items-start justify-start'>
      <p className='block tracking-widest text-xs font-medium text-text-primary mb-3'>
        FAVORITE FILMS
      </p>
      <div className='flex gap-2.5 flex-wrap sm:flex-nowrap'>
        {[0, 1, 2, 3].map((slot) => {
          const card = displayCards[slot];
          const isDragged = draggedPos === slot;
          const isDragTarget = dragOverPos === slot && draggedPos !== slot;
          const justDropped = droppedPos === slot;

          return (
            <div key={slot} className='relative'>
              <div
                draggable={!!card?.poster_path}
                onDragStart={() => handleDragStart(slot)}
                onDragEnter={(e) => {
                  e.preventDefault();
                  handleDragOver(slot);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  handleDragOver(slot);
                }}
                onDrop={() => handleDrop(slot)}
                onDragEnd={handleDragEnd}
                ref={(node) => {
                  if (node && card) refsMap.current[card.id] = node;
                  if (!node && card) delete refsMap.current[card.id];
                }}
                className={`
                  group relative rounded-sm shadow-md
                  ${!card?.poster_path ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}
                  aspect-[2/3]
                  ${posterSizes.favouritesSelection.width}
                  ${isDragged ? 'border-dashed border-red-950' : ''}
                `}
                style={{ willChange: 'transform' }}
              >
                {justDropped && (
                  <div
                    className='absolute inset-0 rounded-sm border-2 border-red-950 animate-drop-expand-fade'
                    style={{ transformOrigin: 'center' }}
                  />
                )}
                {isDragTarget && card?.poster_path && (
                  <div className='absolute inset-0 rounded-sm ring-2 ring-red-950 ring-inset' />
                )}
                {card?.poster_path ? (
                  <MoviePoster card={card} onRemove={() => remove(card.id)} />
                ) : (
                  <Placeholder isDragging={isDragged} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
