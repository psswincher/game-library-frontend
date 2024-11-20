import "./FilterModalButton.css";

function FilterModalButton({ option, isActive, onClick }) {
  function handleFilterOptionClick(event) {
    event.stopPropagation();
    onClick();
  }
  return (
    <button
      className={`filter-modal-button ${
        isActive ? "filter-modal-button__on" : ""
      }`}
      type="button"
      onClick={handleFilterOptionClick}
    >
      {option}
    </button>
  );
}

export default FilterModalButton;
