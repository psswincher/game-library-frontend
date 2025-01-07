import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FilterHeroCarousel.css";
import arrow from "../../../../assets/arrow-icon styleWhite.svg";
import { filters } from "../../../../utils/constants";
import Button from "../../Buttons/Button";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
function FilterHeroCarousel() {
  const { isFilterActive, onFilterOptionClick, isOptionActive } =
    useContext(GameFilterContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  const heroFilters = filters.filter((filter) => {
    return filter.heroFilter === true;
  }, 0);

  const nextSlide = () => {
    const newIndex =
      currentIndex + 1 > heroFilters.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex =
      currentIndex - 1 < 0 ? heroFilters.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const currentFilter = heroFilters[currentIndex];

  return (
    <section className="filter-hero">
      <div className="filter-hero__carousel-container">
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
            <div className="filter-hero__body">
              <button
                className="filter-hero__carousel-button filter-hero__carousel-button_prev"
                onClick={prevSlide}
              >
                <img className="filter-hero__arrow_prev" src={arrow}></img>
              </button>
              <div className="filter-hero__filter-button-block">
                {currentFilter.options.map((option) => {
                  return (
                    <Button
                      disabled
                      key={option}
                      text={option}
                      isOn={isOptionActive(currentFilter.name, option)}
                      onClick={() => {
                        if (!isFilterActive(currentFilter.name)) {
                          setTimeout(() => {
                            nextSlide();
                          }, 350);
                        }
                        onFilterOptionClick(currentFilter.name, option);
                      }}
                      style={currentFilter.buttonStyle}
                      size="large"
                    />
                  );
                })}
              </div>
              <button
                className={`filter-hero__carousel-button filter-hero__carousel-button_next ${
                  isFilterActive(currentFilter.name) &&
                  "filter-hero__carousel-button_active"
                }`}
                onClick={nextSlide}
              >
                <img className="filter-hero__arrow_next" src={arrow}></img>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default FilterHeroCarousel;
