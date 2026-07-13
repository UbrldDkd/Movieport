import { useState } from 'react';
import { usePositionState } from './usePositionState';

export function useFavoritesHandlers(items, setItems, slotCount = 4) {
  const positionState = usePositionState(items, setItems, slotCount);

  const [draggedPos, setDraggedPos] = useState(null);
  const [dragOverPos, setDragOverPos] = useState(null);
  const [droppedPos, setDroppedPos] = useState(null);

  const onDragStart = (pos) => {
    setDraggedPos(pos);
    setDragOverPos(null);
  };

  const onDragOver = (pos) => {
    if (draggedPos === null) return;
    setDragOverPos(pos);
    positionState.setPreview(draggedPos, pos);
  };

  const onDrop = (pos) => {
    if (draggedPos !== null) {
      positionState.applyPreview();
      setDroppedPos(pos);
    }
    reset();
  };

  const onDragEnd = () => {
    if (draggedPos !== null) {
      positionState.applyPreview();
    }
    reset();
  };

  const reset = () => {
    setDraggedPos(null);
    setDragOverPos(null);
    setDroppedPos(null);
  };

  return {
    slots: positionState.slots,
    draggedPos,
    dragOverPos,
    droppedPos,
    handlers: {
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
      onRemove: positionState.removeItem,
    },
  };
}
