const Pagination = ({ page, setPage, total }) => {
  const totalPages = Math.ceil(total / 20);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "30px",
      }}
    >
      <span>
        {page} / {totalPages}
      </span>
      <div style={{ display: "flex", gap: "30px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          style={{
            padding: "5px 20px",
          }}
        >
          Prev
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          style={{
            padding: "5px 20px",
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
