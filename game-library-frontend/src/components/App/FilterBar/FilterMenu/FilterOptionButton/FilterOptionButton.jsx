import "./FilterOptionButton.css";

function FilterOptionButton({ option, isActive, onClick }) {
  function handleFilterOptionClick(event) {
    event.stopPropagation();
    onClick();
  }
  return (
    <li className="filter-option-button__list-container">
      <button
        className={`filter-option-button__button ${
          isActive ? "filter-option-button__on" : ""
        }`}
        type="button"
        onClick={handleFilterOptionClick}
      >
        {option}
      </button>
    </li>
  );
}

export default FilterOptionButton;
