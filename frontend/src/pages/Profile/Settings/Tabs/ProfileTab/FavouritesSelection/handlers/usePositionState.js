import { useState, useEffect } from 'react';

export function usePositionState(initialItems, slotCount) {
  const [items, setItems] = useState([...initialItems]);
  const [previewSlots, setPreviewSlots] = useState(null);

  useEffect(() => {
    setItems([...initialItems]);
  }, [initialItems]);

  const getSlots = (itemsArray) =>
    Array.from({ length: slotCount }, (_, i) =>
      itemsArray.find((item) => item.position === i) ?? null
    );

  const calculatePreview = (fromPos, hoverPos) => {
    if (fromPos === hoverPos || fromPos === null) return null;

    const newItems = items.map((item) => ({ ...item }));
    const draggedItem = newItems.find((item) => item.position === fromPos);

    if (!draggedItem) return null;
    const targetSlot = newItems.find((item) => item.position === hoverPos);

    if (!targetSlot) {
      draggedItem.position = hoverPos;
    } else {
      draggedItem.position = hoverPos;
      newItems.forEach((item) => {
        if (item === draggedItem || item.position === fromPos) return;
        if (fromPos < hoverPos && item.position > fromPos && item.position <= hoverPos) {
          item.position = item.position - 1;
        } else if (fromPos > hoverPos && item.position >= hoverPos && item.position < fromPos) {
          item.position = item.position + 1;
        }
      });
    }

    const slots = new Array(slotCount).fill(null);
    newItems.forEach((item) => {
      if (item.position >= 0 && item.position < slotCount) slots[item.position] = item;
    });
    return slots;
  };

  const setPreview = (from, to) => {
    setPreviewSlots(calculatePreview(from, to));
  };

  const applyPreview = () => {
    if (previewSlots) {
      setItems((prev) =>
        previewSlots
          .filter(Boolean)
          .map((slot) => {
            const existing = prev.find((item) => item.poster_path === slot.poster_path);
            return existing ? { ...existing, position: slot.position } : slot;
          })
      );
      setPreviewSlots(null);
    }
  };

  const removeItem = (pos) => {
    setItems((prev) => prev.filter((item) => item.position !== pos));
  };

  return { slots: previewSlots || getSlots(items), setPreview, applyPreview, removeItem };
}