import { useDragState } from './useDragState';
import { usePositionState } from './usePositionState';

export function useFavoritesHandlers(initialItems, slotCount = 4) {
  const dragState = useDragState();
  const positionState = usePositionState(initialItems, slotCount);

  const onDragStart = (pos) => {
    dragState.dragRef.current = pos;
    dragState.setDraggedPos(pos);
    dragState.setDroppedPos(null);
  };

  const onDragOver = (pos) => {
    if (dragState.dragRef.current !== null) {
      dragState.setDragOverPos(pos);
      positionState.setPreview(dragState.dragRef.current, pos);
    }
  };

  const onDrop = (pos) => {
    if (dragState.dragRef.current !== null && dragState.dragRef.current !== pos) {
      positionState.applyPreview();
      dragState.setDroppedPos(pos);
    }
    dragState.resetDragState();
  };

  const onDragEnd = () => {
    dragState.resetDragState();
    positionState.setPreview(null, null);
  };

  return {
    slots: positionState.slots,
    draggedPos: dragState.draggedPos,
    dragOverPos: dragState.dragOverPos,
    droppedPos: dragState.droppedPos,
    handlers: {
      onDragStart, onDragOver, onDrop, onDragEnd, onRemove: positionState.removeItem
    }
  };
}