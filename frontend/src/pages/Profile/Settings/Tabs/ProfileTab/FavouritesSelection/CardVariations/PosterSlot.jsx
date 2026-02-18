import { posterSizes } from '../../../../../../../utils/constants/posterSizes';
import Filled from './Filled';
import Placeholder from './Placeholder';
import DropTarget from './DropTarget';

export default function PosterSlot({ item, pos, status, handlers }) {
  const { width } = posterSizes.md;
  const showDropTarget = status.isDragOver && item;

  return (
    <div
      draggable={!!item}
      onDragStart={() => handlers.onDragStart(pos)}
      onDragEnter={(e) => {
        e.preventDefault();
        handlers.onDragOver(pos);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        handlers.onDragOver(pos);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
      }}
      onDrop={() => handlers.onDrop(pos)}
      onDragEnd={handlers.onDragEnd}
      className={`group relative rounded-sm overflow-hidden shadow-md ${!item ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'} transition-all duration-200 ${width} ${item && !status.isDragOver ? 'hover:scale-105' : ''} ${status.isDragging ? 'border-dashed border-red-950' : ''}`}
      style={{ aspectRatio: '2/3' }}
    >
      {status.isDropped && (
        <div
          className='absolute inset-0 rounded-sm border-2 border-red-950 animate-drop-expand-fade'
          style={{ transformOrigin: 'center' }}
        />
      )}
      {showDropTarget ? (
        <DropTarget showBorder />
      ) : item ? (
        <Filled item={item} onRemove={() => handlers.onRemove(pos)} />
      ) : (
        <Placeholder />
      )}
    </div>
  );
}
