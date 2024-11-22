import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./FilterBar.css";
import FilterMenu from "./FilterMenu/FilterMenu";
import { filters } from "../../../utils/constants";

function FilterBar({ onFilterClick, activeFilter }) {
  const itemWindowPortion = window.innerWidth / filters.length;
  const baseItemWidth = itemWindowPortion * 0.5;
  const itemWidth = `${baseItemWidth}px`;

  const scaledPosition = (index) => {
    return baseItemWidth * index;
  };

  const itemColumnGap = 24;
  const scaledColumnGap = (index) => {
    return itemColumnGap * index;
  };

  const startingPosition = window.innerWidth * -0.3;

  const calcLeftPosition = (index) => {
    return `${
      scaledPosition(index) + startingPosition + scaledColumnGap(index)
    }px`;
  };
  const calcHeight = (gameFilter) => {
    const calc = (gameFilter.options.length / 5) * 25;
    return calc > 25 ? `${calc}px` : `40px`;
  };

  const [currentActiveFilter, setCurrentActiveFilter] = useState("");

  useEffect(() => {
    setCurrentActiveFilter(activeFilter);
  }, [activeFilter]);

  return (
    <div className="filter-bar">
      <div className="filter-bar__container filter-bar__container-desktop">
        {filters.map((gameFilter, index) => {
          const isOpen = currentActiveFilter === gameFilter.name;
          const height = calcHeight(gameFilter);
          const startingPosition = calcLeftPosition(index);
          return (
            <motion.div
              key={index}
              initial={{
                left: `${startingPosition}`,
                height: "30px",
                width: `${itemWidth}`,
                top: "-10px",
              }}
              animate={{
                left: isOpen ? `-40vw` : `${startingPosition}`,
                top: isOpen ? `5vh` : -10,
                width: isOpen ? "80vw" : `${itemWidth}`,
                height: isOpen ? `${height}` : "25px",
                transition: {
                  left: {
                    duration: 0.35,
                    ease: "easeInOut",
                    delay: isOpen ? 0 : 0.25,
                  },
                  top: {
                    duration: 0.35,
                    ease: "easeInOut",
                    delay: isOpen ? 0 : 0.25,
                  },
                  width: {
                    duration: 0.25,
                    ease: "easeInOut",
                    delay: isOpen ? 0.4 : 0,
                  },
                  height: {
                    duration: 0.25,
                    ease: "easeInOut",
                    delay: isOpen ? 0.4 : 0,
                  },
                },
              }}
              style={{
                position: "absolute",
                top: "30px",
              }}
            >
              <FilterMenu
                gameFilter={gameFilter}
                onFilterClick={onFilterClick}
                activeFilter={activeFilter}
              />
            </motion.div>
          );
        })}
      </div>
      <div className="filter-bar__container filter-bar__container-mobile"></div>
    </div>
  );
}

export default FilterBar;
