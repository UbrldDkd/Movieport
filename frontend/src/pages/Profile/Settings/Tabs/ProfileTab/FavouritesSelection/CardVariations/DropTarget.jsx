export default function DropTarget({ status }) {
  return (
    <div className='relative w-full aspect-[2/3] rounded-sm  border-2 border-transparent transition-all duration-100'>
      {status.isDragOver && (
        <div className='absolute inset-0 rounded-sm border-2 border-red-950 border-dashed' />
      )}
      {status.isDropped && (
        <div className='absolute inset-0 rounded-sm animate-drop-expand-fade' />
      )}
    </div>
  );
}
