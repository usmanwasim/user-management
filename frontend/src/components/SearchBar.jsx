const SearchBar = ({ email, setEmail }) => {
  return (
    <input
      type="text"
      placeholder="Search by email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        padding: "7px 10px",
        borderRadius: "5px",
        marginBottom: "20px",
      }}
    />
  );
};

export default SearchBar;
