import "./FilterMenu.css";
import dropdownArrowIcon from "../../../../assets/dropdown-arrow-icon.svg";
import FilterOptionButton from "./FilterOptionButton/FilterOptionButton";
import { useGameFilters } from "../../../../hooks/useGameFilter";

function FilterMenu({ gameFilter, onFilterClick, activeFilter }) {
  const {
    isFilterActive,
    onFilterOptionClick,
    getFilterTitle,
    isOptionActive,
    filterCount,
  } = useGameFilters();

  const isActive = isFilterActive(gameFilter.name);
  const isOpen = activeFilter === gameFilter.name;
  function handleFilterClick() {
    onFilterClick(gameFilter.name);
  }
  return (
    <li
      className="filter-menu__list-container"
      style={{ width: `calc(90% / ${filterCount()})` }}
    >
      <div
        className={`filter-menu__button ${isOpen ? "filter-menu__open" : ""} ${
          isActive ? "filter-menu__active" : ""
        }
         `}
        role="button"
        onClick={handleFilterClick}
      >
        <div className="filter-menu__title">
          <img
            className={`filter-menu__filter-arrow-icon ${
              isOpen ? "filter-menu__open" : ""
            }`}
            src={dropdownArrowIcon}
          />
          {getFilterTitle(gameFilter)}
        </div>
        <div
          className={`filter-menu__options ${
            isOpen ? "filter-menu__open" : ""
          }`}
        >
          {gameFilter.options.map((option) => {
            return (
              <FilterOptionButton
                key={option}
                option={option}
                isActive={isOptionActive(gameFilter.name, option)}
                onClick={() => onFilterOptionClick(activeFilter, option)}
              />
            );
          })}
        </div>
      </div>
    </li>
  );
}

export default FilterMenu;
