const SearchBar = ({ setSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or author"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchBar;