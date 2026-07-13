import { useState, useEffect } from 'react';

export function usePositionState(items, setItems, slotCount) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setPreview(null);
  }, [items]);

  const getSlots = (arr) =>
    Array.from(
      { length: slotCount },
      (_, i) => arr.find((item) => (item?.favourited ?? -1) === i) ?? null
    );

  const calculatePreview = (from, to) => {
    if (from === null || to === null) return null;

    const updated = items.map((i) => ({ ...i }));

    const dragged = updated.find((i) => (i?.favourited ?? -1) === from);

    if (!dragged) return getSlots(updated);

    const without = updated.filter((i) => (i?.favourited ?? -1) !== from);

    const moved = { ...dragged, favourited: to };
    without.push(moved);

    for (const item of without) {
      if (item === moved) continue;

      const pos = item?.favourited ?? -1;

      if (from < to && pos > from && pos <= to) {
        item.favourited -= 1;
      }

      if (from > to && pos >= to && pos < from) {
        item.favourited += 1;
      }
    }

    return getSlots(without);
  };

  const setPreviewState = (from, to) => {
    setPreview(calculatePreview(from, to));
  };

  const applyPreview = () => {
    if (!preview) return;

    const reordered = preview.filter(Boolean).map((item) => ({ ...item }));

    setItems(reordered);
    setPreview(null);
  };
  const removeItem = (pos) => {
    setItems((prev) =>
      prev
        .filter((i) => (i?.favourited ?? -1) !== pos)
        .map((i) =>
          (i?.favourited ?? -1) > pos
            ? { ...i, favourited: i.favourited - 1 }
            : i
        )
    );
  };

  return {
    slots: preview || getSlots(items),
    setPreview: setPreviewState,
    applyPreview,
    removeItem,
  };
}
