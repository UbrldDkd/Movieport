export default function PaginationBar({ i, onClick, currentPage }) {
  return (
    <button
      onClick={() => onClick(i)}
      className={`h-1  rounded-2xl cursor-pointer transition-all hover:bg-zinc-600 duration-300 focus:outline-none min-w-8 touch-manipulation
          ${currentPage === i ? 'bg-red-950' : 'bg-zinc-400'}`}
    ></button>
  );
}
