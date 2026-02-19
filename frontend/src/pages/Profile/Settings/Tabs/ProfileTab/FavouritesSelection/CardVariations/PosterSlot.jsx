import { posterSizes } from '../../../../../../../utils/constants/posterSizes';
import Filled from './Filled';
import Placeholder from './Placeholder';
import DropTarget from './DropTarget';

export default function PosterSlot({ item, pos, status, handlers }) {
  const { width } = posterSizes.md;
  const showDropTarget = status.isDragOver && item;

  return (
    <div className={`relative ${width}`} style={{ aspectRatio: '2/3' }}>
      {status.isDragOver && (
        <div className='absolute inset-0 z-10 pointer-events-none ' />
      )}

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
        className={`absolute inset-0 rounded-sm  shadow-md transition-transform duration-150
          ${!item ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'}
          ${status.isDragging ? 'opacity-70' : ''}
          `}
      >
        {showDropTarget ? (
          <DropTarget showBorder />
        ) : item ? (
          <Filled item={item} onRemove={() => handlers.onRemove(pos)} />
        ) : (
          <Placeholder />
        )}
      </div>
    </div>
  );
}
