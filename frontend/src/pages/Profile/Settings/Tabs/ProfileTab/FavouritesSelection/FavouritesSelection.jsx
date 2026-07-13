import { useState } from 'react';

import { useFavoritesHandlers } from './handlers/useFavouritesHandlers';
import { cleanItem } from '../../../../../../utils/helpers/cleanItem';

import PosterSlot from './PosterSlot/PosterSlot';
import FavoritePickerModal from './FavouritePickerModal';

export default function FavoritesSelection({ items, setItems }) {
  const [selectedPos, setSelectedPos] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { slots, draggedPos, dragOverPos, droppedPos, handlers } =
    useFavoritesHandlers(items, setItems, 4);

  const handleAddClick = (pos) => {
    setSelectedPos(pos);
    setIsModalOpen(true);
  };

  const handleSelectItem = (item) => {
    if (selectedPos === null) return;

    const cleaned = cleanItem(item);

    setItems((prev) => {
      const withoutCurrentPos = prev.filter(
        (i) => (i?.favourited ?? -1) !== selectedPos
      );

      return [
        ...withoutCurrentPos,
        {
          ...cleaned,
          favourited: selectedPos,
        },
      ];
    });
    console.log(cleaned);

    setSelectedPos(null);
    setIsModalOpen(false);
    console.log('items after select:', items);
  };
  return (
    <>
      <div className='flex flex-col mx-auto items-start justify-start'>
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
              onAddClick={handleAddClick}
            />
          ))}
        </div>

        <div className='text-xs font-semibold mt-3 text-zinc-500 tracking-wider'>
          Drag to reorder favorites
        </div>
      </div>

      <FavoritePickerModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPos(null);
        }}
        onSelect={handleSelectItem}
        items={items}
      />
    </>
  );
}
