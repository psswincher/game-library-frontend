import "./FilterOptionButton.css";

function FilterOptionButton({ option, isActive, onClick, isOpen }) {
  function handleFilterOptionClick(event) {
    event.stopPropagation();
    onClick();
  }
  return (
    <div className="filter-option-button__list-container">
      {isOpen ? (
        <button
          className={`filter-option-button__button ${
            isActive && "filter-option-button__on"
          }`}
          type="button"
          onClick={handleFilterOptionClick}
        >
          {option}
        </button>
      ) : (
        <button
          className={`filter-option-button__button ${
            isActive && "filter-option-button__on"
          }`}
          type="button"
        >
          {option}
        </button>
      )}
    </div>
  );
}

export default FilterOptionButton;
