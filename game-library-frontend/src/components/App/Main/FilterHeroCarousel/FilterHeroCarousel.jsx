import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FilterHeroCarousel.css";
import arrow from "../../../../assets/arrow-icon styleWhite.svg";
import FilterHeroFilterButton from "./FilterHeroFilterButton/FilterHeroFilterButton";
import { filters } from "../../../../utils/constants";
import { useGameFilters } from "../../../../hooks/useGameFilter";
import Button from "../../Buttons/Button";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
function FilterHeroCarousel() {
  const { isFilterActive, onFilterOptionClick, isOptionActive } =
    useContext(GameFilterContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    let newIndex = (currentIndex + 1) % filters.length;
    while (!filters[newIndex].heroFilter) {
      newIndex = (newIndex + 1) % filters.length;
    }
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    let newIndex = (currentIndex - 1 + filters.length) % filters.length;
    while (!filters[newIndex].heroFilter) {
      newIndex = (newIndex - 1 + filters.length) % filters.length;
    }
    setCurrentIndex(newIndex);
  };

  const currentFilter = filters[currentIndex];

  return (
    <section className="filter-hero">
      <div className="filter-hero__carousel-container">
        <div className="filter-hero__info-block">
          <div className="filter-hero__title">Find Your Game</div>
          <motion.div
            className="filter-hero__subheader"
            key={currentIndex}
            initial={{ y: -25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -25, opacity: 0 }}
            transition={{
              duration: 0.25,
              delay: 0.5,
            }}
          >
            {currentFilter.heroSubtitle}
          </motion.div>
        </div>
        <AnimatePresence>
          <motion.div
            className="filter-hero__carousel-image"
            key={currentIndex}
            initial={{ x: "150%" }}
            animate={{ x: 0 }}
            exit={{ x: "-150%" }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 23,
              duration: 0.75,
            }}
            style={{
              backgroundImage: `url(${currentFilter.heroImg})`,
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <div className="filter-hero__info-placeholder"></div>
            <button
              className="prev filter-hero__carousel-button"
              onClick={prevSlide}
            >
              <img className="filter-hero__arrow_prev" src={arrow}></img>
            </button>
            <div className="filter-hero__filter-button-block">
              {currentFilter.options.map((option) => {
                return (
                  <Button
                    key={option}
                    text={option}
                    isActive={isOptionActive(currentFilter.name, option)}
                    onClick={() => {
                      if (!isFilterActive(currentFilter.name)) {
                        setTimeout(() => {
                          nextSlide();
                        }, 350);
                      }
                      onFilterOptionClick(currentFilter.name, option);
                    }}
                    variant={currentFilter.buttonVariant}
                  />
                );
              })}
            </div>
            <button
              className={`next filter-hero__carousel-button ${
                isFilterActive(currentFilter.name) &&
                "filter-hero__carousel-button_active"
              }`}
              onClick={nextSlide}
            >
              <img className="filter-hero__arrow_next" src={arrow}></img>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default FilterHeroCarousel;
