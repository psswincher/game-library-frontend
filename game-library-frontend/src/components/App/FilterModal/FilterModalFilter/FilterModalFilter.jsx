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
      </div>
      <ul className={`filter-modal-filter__options`}>
        {gameFilter.options.map((option) => {
          return (
            <Button
              key={option}
              text={option}
              isOn={isOptionActive(gameFilter.name, option)}
              onClick={() => onFilterOptionClick(gameFilter.name, option)}
              style={gameFilter.buttonStyle}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default FilterModalFilter;
