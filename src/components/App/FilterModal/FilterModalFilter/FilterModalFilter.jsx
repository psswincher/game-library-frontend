import { useContext } from "react";
import "./FilterModalFilter.css";
import Button from "../../Buttons/Button";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
import Toggle from "../../Toggles/Toggle";

function FilterModalFilter({ gameFilter }) {
  const { onFilterOptionClick, isOptionActive, setFilterMode, filterState } =
    useContext(GameFilterContext);

  return (
    <li className="filter-modal-filter__list-container">
      <div className="filter-modal__top">
        <div className="filter-modal-filter__title">{gameFilter.name}</div>

        {gameFilter.showModeToggle && (
          <Toggle
            optionOne="+"
            optionTwo="&"
            startingOption={filterState[gameFilter.name].mode}
            onToggle={() =>
              setFilterMode(gameFilter.name, !filterState[gameFilter.name].mode)
            }
          />
        )}
        {gameFilter.showModeToggle && (
          <div className="filter-modal-filter__toggle-description">
            {filterState[gameFilter.name].mode
              ? "Show titles that have ANY of the selected filters."
              : "Show titles that have ALL of the selected filters."}
          </div>
        )}
      </div>
      <ul className={`filter-modal-filter__options`}>
        {gameFilter.options.map((option) => {
          return (
            <Button
              key={option}
              text={option}
              isOn={isOptionActive(gameFilter.name, option)}
              onClick={() => onFilterOptionClick(gameFilter.name, option)}
              style="mechanic"
            />
          );
        })}
      </ul>
    </li>
  );
}

export default FilterModalFilter;
