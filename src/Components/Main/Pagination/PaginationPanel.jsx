import PaginationBar from "./PaginationBar";

export default function PaginationPanel({ totalPages, currentPage, onPageChange }) {
  return (
    <div className="flex justify-center space-x-2 mt-4 w-24 mx-auto">

      {Array.from({ length: totalPages }, (_, i) => (

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
