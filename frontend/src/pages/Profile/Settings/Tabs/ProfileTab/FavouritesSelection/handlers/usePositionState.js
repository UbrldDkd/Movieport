import { useState, useEffect } from 'react';

export function usePositionState(initialItems, slotCount) {
  const [items, setItems] = useState([...initialItems]);
  const [previewSlots, setPreviewSlots] = useState(null);

  useEffect(() => {
    setItems([...initialItems]);
  }, [initialItems]);

  const getSlots = (itemsArray) =>
    Array.from(
      { length: slotCount },
      (_, i) => itemsArray.find((item) => item.position === i) ?? null
    );

  const calculatePreview = (fromPos, hoverPos) => {
    if (fromPos === null) return null;

    // Remove dragged item from source slot
    const newItems = items
      .filter((item) => item.position !== fromPos)
      .map((i) => ({ ...i }));

    const draggedItem = items.find((item) => item.position === fromPos);
    if (!draggedItem) return getSlots(newItems);

    // Assign dragged item to hover position
    const draggedClone = { ...draggedItem, position: hoverPos ?? fromPos };
    newItems.push(draggedClone);

    // Shift other items
    newItems.forEach((item) => {
      if (item === draggedClone) return;
      if (
        fromPos < hoverPos &&
        item.position > fromPos &&
        item.position <= hoverPos
      ) {
        item.position -= 1;
      } else if (
        fromPos > hoverPos &&
        item.position >= hoverPos &&
        item.position < fromPos
      ) {
        item.position += 1;
      }
    });

    // Build preview slots
    const slots = new Array(slotCount).fill(null);
    newItems.forEach((item) => {
      if (item.position >= 0 && item.position < slotCount)
        slots[item.position] = item;
    });

    return slots;
  };

  const setPreview = (from, to) => {
    setPreviewSlots(calculatePreview(from, to));
  };

  const applyPreview = () => {
    if (previewSlots) {
      setItems(previewSlots.filter(Boolean).map((slot) => ({ ...slot })));
      setPreviewSlots(null);
    }
  };

  const removeItem = (pos) => {
    setItems((prev) => prev.filter((item) => item.position !== pos));
  };

  return {
    slots: previewSlots || getSlots(items),
    setPreview,
    applyPreview,
    removeItem,
  };
}
