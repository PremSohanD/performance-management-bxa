const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Helper styles
  const buttonClass = "px-4 py-2 text-sm font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-100";

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous Button */}
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className={buttonClass}
      >
        Previous
      </button>

      {/* Page Indicator */}
      <span className="text-sm font-medium text-slate-500">
        Page <span className="text-slate-900 font-bold">{page + 1}</span> of <span className="text-slate-900 font-bold">{totalPages}</span>
      </span>

      {/* Next Button */}
      <button
        disabled={page + 1 === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={buttonClass}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;