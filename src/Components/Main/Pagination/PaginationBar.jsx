export default function PaginationBar({i , onClick, currentPage}) {
    return (
        <button 
        onClick={() => onClick(i)}
        className={`h-1 sm:h-1.5 rounded-2xl cursor-pointer transition-all duration-300 focus:outline-none min-w-8 sm:min-w-10 touch-manipulation
          ${currentPage === i ? 'bg-red-950' : 'bg-zinc-400'}`}>
        

            
        </button>
    )
}