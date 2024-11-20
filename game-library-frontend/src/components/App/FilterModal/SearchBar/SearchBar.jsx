import "./SearchBar.css";

function SearchBar({ searchTerm, onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
