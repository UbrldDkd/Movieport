import { useState, useRef } from 'react';

export function useDragState() {
  const [draggedPos, setDraggedPos] = useState(null);
  const [dragOverPos, setDragOverPos] = useState(null);
  const [droppedPos, setDroppedPos] = useState(null);
  const dragRef = useRef(null);

  // Rename custom function to avoid shadowing
  const triggerDroppedPos = (pos) => {
    setDroppedPos(pos);
    setTimeout(() => setDroppedPos(null), 500);
  };

  const resetDragState = () => {
    setDraggedPos(null);
    setDragOverPos(null);
    dragRef.current = null;
  };

  return {
    draggedPos,
    dragOverPos,
    droppedPos,
    dragRef,
    setDraggedPos,
    setDragOverPos,
    setDroppedPos: triggerDroppedPos,
    resetDragState,
  };
}
