export default function DropTarget({ showBorder }) {
  return (
    <div
      className={`relative w-full aspect-[2/3] rounded-sm shadow-md border-2  transition-all duration-100  ${showBorder ? ' border-red-950 border-dashed border-2 ' : ' border-zinc-800 border-2'}`}
    />
  );
}
