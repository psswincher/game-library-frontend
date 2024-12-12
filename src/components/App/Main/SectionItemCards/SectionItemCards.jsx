import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SectionItemCards.css";
import arrow from "../../../../assets/arrow-icon styleWhite.svg";
import ItemCard from "../ItemCard/ItemCard";
import { useGameFilters } from "../../../../hooks/useGameFilter";
import NoGamesCard from "../NoGamesCard/NoGamesCard";
import { useProgressBar } from "../../../../hooks/useProgressBar";
import { useCarousel } from "../../../../hooks/useCarousel";

function SectionItemCards({
  onItemClick,
  category,
  title,
  subtitle,
  onFilterModalClick,
}) {
  const { filteredGames } = useGameFilters();
  const categoryGames = filteredGames.filter(
    (game) => game.category === category
  );

  const carouselTransition = { type: "spring", stiffness: 200, damping: 25 };
  const { indexRef, maxMovesRef, moveToNext, moveToPrevious, carouselScope } =
    useCarousel(categoryGames, carouselTransition, 198, 8);

  const { progressBarRef, updateProgressBar } = useProgressBar(
    maxMovesRef,
    indexRef
  );

  const onNextClick = () => {
    moveToNext();
    updateProgressBar();
  };

  const onPreviousClick = () => {
    moveToPrevious();
    updateProgressBar();
  };

  useEffect(() => {
    updateProgressBar();
  }, [categoryGames]);

  const itemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <section className="item-cards">
      <div className="item-cards__header-container">
        <div className="item-cards__header-title">{title}</div>
        <div className="item-cards__header-subtitle">{subtitle}</div>
        <motion.div
          className="item-cards__progress-bar"
          ref={progressBarRef}
        ></motion.div>
      </div>

      <div className="item-cards__container">
        <button
          className="item-cards__button item-cards__prev"
          onClick={onPreviousClick}
          type="button"
        >
          <img className="item-cards__arrow-image" src={arrow} />
        </button>

        <motion.div className="item-cards__list" ref={carouselScope}>
          <AnimatePresence initial={false} mode="popLayout">
            {categoryGames.length > 0
              ? categoryGames.map((item) => (
                  <motion.div
                    key={item._id}
                    className="item-card"
                    layout
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  >
                    <ItemCard item={item} onItemClick={onItemClick} />
                  </motion.div>
                ))
              : ""}
          </AnimatePresence>
          {categoryGames.length === 0 ? (
            <NoGamesCard onFilterModalClick={onFilterModalClick} />
          ) : (
            ""
          )}
        </motion.div>

        <button
          className="item-cards__button item-cards__next"
          onClick={onNextClick}
          type="button"
        >
          <img className="item-cards__arrow-image" src={arrow} />
        </button>
      </div>
    </section>
  );
}

export default SectionItemCards;
