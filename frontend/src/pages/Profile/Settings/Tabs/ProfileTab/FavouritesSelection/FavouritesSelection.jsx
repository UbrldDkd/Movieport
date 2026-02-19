import { SLOT_COUNT, MOCK_ITEMS } from './constants';
import { useFavoritesHandlers } from './handlers';
import { PosterSlot } from './CardVariations';

export default function FavoritesSelection({ items = MOCK_ITEMS }) {
  const { slots, draggedPos, dragOverPos, droppedPos, handlers } =
    useFavoritesHandlers(items, SLOT_COUNT);

  return (
    <div className='flex flex-col bg-zinc-900 mx-auto  items-start justify-start'>
      <p className='block tracking-widest text-xs font-medium text-zinc-300 mb-3'>
        FAVORITE FILMS
      </p>
      <div className='flex gap-2.5 flex-wrap sm:flex-nowrap'>
        {slots.map((item, pos) => (
          <PosterSlot
            key={pos}
            item={item}
            pos={pos}
            status={{
              isDragging: draggedPos === pos,
              isDragOver: dragOverPos === pos,
              isDropped: droppedPos === pos,
            }}
            handlers={handlers}
          />
        ))}
      </div>
      <div className='text-xs font-semibold  mt-3 text-zinc-500 tracking-wider '>
        {' '}
        Drag and drop to reorder{' '}
      </div>
    </div>
  );
}
