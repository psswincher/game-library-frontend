import "./FilterBar.css";
import FilterMenu from "./FilterMenu/FilterMenu";
import { filters } from "../../../utils/constants";
function FilterBar({ onFilterClick, activeFilter }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__container filter-bar__container-desktop">
        {filters.map((gameFilter, index) => {
          return (
            <FilterMenu
              key={index}
              gameFilter={gameFilter}
              onFilterClick={onFilterClick}
              activeFilter={activeFilter}
            />
          );
        })}
      </div>
      <div className="filter-bar__container filter-bar__container-mobile"></div>
    </div>
  );
}

export default FilterBar;
