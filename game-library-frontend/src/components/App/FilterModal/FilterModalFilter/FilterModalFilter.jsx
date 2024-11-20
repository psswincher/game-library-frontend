import { useContext } from "react";
import "./FilterModalFilter.css";
import FilterModalButton from "./FilterModalButton/FilterModalButton";
import Button from "../../Buttons/Button";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";

function FilterModalFilter({ gameFilter }) {
  const { onFilterOptionClick, isOptionActive } = useContext(GameFilterContext);

  console.log(gameFilter);

  return (
    <li className="filter-modal-filter__list-container">
      <div className="filter-modal-filter__title">{gameFilter.name}</div>
      <ul className={`filter-modal-filter__options`}>
        {gameFilter.options.map((option) => {
          return (
            <Button
              key={option}
              text={option}
              isActive={isOptionActive(gameFilter.name, option)}
              onClick={() => onFilterOptionClick(gameFilter.name, option)}
              variant={gameFilter.buttonVariant}
            />
          );
        })}
      </ul>
    </li>
  );
}

export default FilterModalFilter;
