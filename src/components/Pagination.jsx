import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    let startPage, endPage;
    if (totalPages <= 3) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 2;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pageNumbers = getPageNumbers();

  const buttonClass = "px-3 py-2 border border-gray-300 text-sm font-medium";
  const activeButtonClass = "z-10 bg-indigo-100 text-indigo-700";
  const inactiveButtonClass = "bg-white text-gray-500 hover:bg-gray-50";
  const disabledButtonClass = "opacity-50 cursor-not-allowed";

  return (
    <nav className="flex justify-center mt-4" aria-label="Pagination">
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <button
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            className={`${buttonClass} ${currentPage === 1 ? disabledButtonClass : inactiveButtonClass} first-page`}
          >
            First
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${buttonClass} ${currentPage === 1 ? disabledButtonClass : inactiveButtonClass} previous-page`}
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`${buttonClass} ${
                currentPage === number ? activeButtonClass : inactiveButtonClass
              }`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`${buttonClass} ${currentPage === totalPages ? disabledButtonClass : inactiveButtonClass} next-page`}
          >
            &raquo;
          </button>
        </li>
        <li>
          <button
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`${buttonClass} rounded-r-md ${currentPage === totalPages ? disabledButtonClass : inactiveButtonClass} last-page`}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;