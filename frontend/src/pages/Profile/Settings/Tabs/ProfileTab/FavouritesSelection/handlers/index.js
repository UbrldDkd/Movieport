import { useRef } from 'react';
import { useDragState } from './useDragState';
import { usePositionState } from './usePositionState';

export function useFavoritesHandlers(initialItems, slotCount = 4) {
  const dragState = useDragState();
  const positionState = usePositionState(initialItems, slotCount);
  const lastDragOverRef = useRef(null); // ← tracks last hovered pos

  const onDragStart = (pos) => {
    dragState.dragRef.current = pos;
    lastDragOverRef.current = null;
    dragState.setDraggedPos(pos);
    dragState.setDroppedPos(null);
  };

  const onDragOver = (pos) => {
    if (dragState.dragRef.current !== null) {
      lastDragOverRef.current = pos; // ← always update last known target
      dragState.setDragOverPos(pos);
      positionState.setPreview(dragState.dragRef.current, pos);
    }
  };

  const onDrop = (pos) => {
    if (
      dragState.dragRef.current !== null &&
      dragState.dragRef.current !== pos
    ) {
      positionState.applyPreview();
      dragState.setDroppedPos(pos);
    }
    dragState.resetDragState();
    lastDragOverRef.current = null;
  };

  const onDragEnd = () => {
    const target = lastDragOverRef.current;

    if (
      target !== null &&
      dragState.dragRef.current !== null &&
      dragState.dragRef.current !== target
    ) {
      positionState.applyPreview();
      dragState.setDroppedPos(target);
    } else {
      // Dropped nowhere — reset preview without applying
      positionState.setPreview(null, null);
    }

    dragState.resetDragState();
    lastDragOverRef.current = null;
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
