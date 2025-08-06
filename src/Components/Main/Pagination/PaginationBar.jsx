export default function PaginationBar({i , onClick, currentPage}) {
    return (
        <button 
        onClick={() => onClick(i)}
        className={`h-1 rounded-2xl cursor-pointer transition-all duration-300 focus:outline-none min-w-10
          ${currentPage === i ? 'bg-red-950' : 'bg-zinc-400'}`}>
        

            
        </button>
    )
}