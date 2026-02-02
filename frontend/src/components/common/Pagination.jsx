const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>

      <span>
        Page {page + 1} of {totalPages}
      </span>

      <button
        disabled={page + 1 === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
