export default function DropTarget({ showBorder }) {
  return (
    <div className={`relative w-full aspect-[2/3] rounded-sm shadow-md border-2 border-zinc-800 outline outline-transparent ${showBorder ? 'ring-2 ring-red-950 ring-inset' : ''}`} />
  );
}