export default function PaginationPanel({
  currentPage,
  totalPages,
  handlePageChange,
}) {
  // Hide pagination entirely if there's only one page
  if (!totalPages || totalPages <= 1) return null;

  const button =
    'font-semibold tracking-wider text-sm transition-colors duration-200 disabled:opacity-40 disabled:cursor-default';

  return (
    <div className='flex justify-center items-center mt-6'>
      {/* First */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`w-[60px] py-1 rounded-l-3xl ${button}
        bg-zinc-300 text-red-950 hover:bg-zinc-200`}
      >
        First
      </button>

      {/* Previous */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-1.5 min-w-28 ${button}
        bg-gradient-to-r from-red-950 to-zinc-950 text-zinc-400
        hover:text-zinc-200`}
      >
        Previous
      </button>

      {/* Page */}
      <div className='px-4 py-2 bg-zinc-900 border-x border-zinc-800'>
        <p className='text-sm font-semibold tracking-widest text-zinc-400'>
          {currentPage}
          <span className='text-zinc-600 mx-1'>/</span>
          {totalPages}
        </p>
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-1.5 min-w-28 ${button}
        bg-gradient-to-l from-red-950 to-zinc-950 text-zinc-400
        hover:text-zinc-200`}
      >
        Next
      </button>

      {/* Last */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`w-[60px] py-1 rounded-r-3xl ${button}
        bg-zinc-300 text-red-950 hover:bg-zinc-200`}
      >
        Last
      </button>
    </div>
  );
}
