import "./FilterMenu.css";
import { motion } from "framer-motion";
import dropdownArrowIcon from "../../../../assets/dropdown-arrow-icon.svg";
import { useGameFilters } from "../../../../hooks/useGameFilter";
import Button from "../../Buttons/Button";
function FilterMenu({ gameFilter, onFilterClick, activeFilter }) {
  const {
    isFilterActive,
    onFilterOptionClick,
    getFilterTitle,
    isOptionActive,
  } = useGameFilters();

  const isActive = isFilterActive(gameFilter.name);
  const isOpen = activeFilter === gameFilter.name;
  function handleFilterClick() {
    onFilterClick(gameFilter.name);
  }

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.015,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      x: 0,
    },
    hidden: { opacity: 0, x: -50 },
  };
  return (
    <div
      className={`filter-menu__list-container ${
        isOpen && "filter-menu__open"
      } ${isActive ? "filter-menu__active" : ""}`}
      onClick={handleFilterClick}
    >
      <div className="filter-menu__title">
        <img
          className={`filter-menu__filter-arrow-icon ${
            isOpen ? "filter-menu__open" : ""
          }`}
          src={dropdownArrowIcon}
        />
        <div className="filter-menu__title-text">
          {getFilterTitle(gameFilter)}
        </div>
      </div>
      <motion.ul
        className={`filter-menu__options ${isOpen ? "filter-menu__open" : ""}`}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={listVariants}
      >
        {gameFilter.options.map((option, index) => {
          return (
            <motion.li key={index} variants={itemVariants}>
              <Button
                text={option}
                isOn={isOptionActive(gameFilter.name, option)}
                onClick={() => onFilterOptionClick(activeFilter, option)}
                isOpen={isOpen}
                style="mechanic"
                size="regular"
              />
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export default FilterMenu;
