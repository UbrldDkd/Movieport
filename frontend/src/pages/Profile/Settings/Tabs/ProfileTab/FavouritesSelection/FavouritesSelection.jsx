import { SLOT_COUNT, MOCK_ITEMS } from './constants';
import { useFavoritesHandlers } from './handlers/useFavouritesHandlers';
import PosterSlot from './PosterSlot/PosterSlot';

export default function FavoritesSelection({ items = MOCK_ITEMS }) {
  const { slots, draggedPos, dragOverPos, droppedPos, handlers } =
    useFavoritesHandlers(items, SLOT_COUNT);

  return (
    <div className='flex flex-col  mx-auto  items-start justify-start'>
      <p className='block tracking-widest text-xs font-medium text-text-primary mb-3'>
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
      <div className='text-xs cursor-default font-semibold  mt-3 text-zinc-500 tracking-wider '>
        {' '}
        Drag and drop to reorder{' '}
      </div>
    </div>
  );
}
