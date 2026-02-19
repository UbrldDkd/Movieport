import { useDragState } from './useDragState';
import { usePositionState } from './usePositionState';

export function useFavoritesHandlers(initialItems, slotCount = 4) {
  const dragState = useDragState();
  const positionState = usePositionState(initialItems, slotCount);

  const onDragStart = (pos) => {
    dragState.setDraggedPos(pos);
    dragState.setDragOverPos(null);

    // Immediately remove from source slot logically
    positionState.setPreview(pos, null);
  };

  const onDragOver = (pos) => {
    if (dragState.draggedPos === null) return;
    dragState.setDragOverPos(pos);
    positionState.setPreview(dragState.draggedPos, pos);
  };

  const onDrop = (pos) => {
    if (dragState.draggedPos !== null) {
      positionState.applyPreview();
      dragState.setDroppedPos(pos);
    }
    dragState.resetDragState();
  };

  const onDragEnd = () => {
    if (dragState.draggedPos !== null) {
      positionState.applyPreview();
    }
    dragState.resetDragState();
  };

  return {
    slots: positionState.slots,
    draggedPos: dragState.draggedPos,
    dragOverPos: dragState.dragOverPos,
    droppedPos: dragState.droppedPos,
    handlers: {
      onDragStart,
      onDragOver,
      onDrop,
      onDragEnd,
      onRemove: positionState.removeItem,
    },
  };
}
