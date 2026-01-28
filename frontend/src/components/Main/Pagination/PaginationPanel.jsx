import PaginationBar from './PaginationBar';

export default function PaginationPanel({
  totalPages,
  currentPage,
  onPageChange,
}) {
  const pagesToDisplay = Math.min(totalPages, 10);

  return (
    <div className='flex justify-center space-x-1  mt-3  w-20 mx-auto'>
      {Array.from({ length: pagesToDisplay }, (_, i) => (
        <PaginationBar
          key={i}
          i={i}
          onClick={onPageChange}
          currentPage={currentPage}
          style={{ flex: 1 }}
        />
      ))}
    </div>
  );
}
