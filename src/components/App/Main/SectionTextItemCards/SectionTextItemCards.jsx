import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect, useMemo } from "react";
import "./SectionTextItemCards.css";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
import { GameLibraryContext } from "../../../../contexts/GameLibraryContext";
import NoGamesCard from "../NoGamesCard/NoGamesCard";
import ItemCard from "../ItemCard/ItemCard";

function SectionItemCards({ onItemClick, onFilterModalClick, sectionFilter }) {
  const { filteredGames } = useContext(GameLibraryContext);
  const { customFilter } = useContext(GameFilterContext);

  const [filteredSectionGames, setFilteredSectionGames] = useState([]);

  const memoizedFilteredGames = useMemo(() => {
    return sectionFilter
      ? customFilter(filteredGames, sectionFilter)
      : filteredGames;
  }, [filteredGames, sectionFilter, customFilter]);

  useEffect(() => {
    setFilteredSectionGames(memoizedFilteredGames);
  }, [memoizedFilteredGames]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      scaleX: 0,
      originX: 0.5,
    },
    visible: {
      opacity: 1,
      scaleX: 1,
      originX: 0.5,
      transition: {
        scaleX: {
          type: "tween",
          duration: 0.3,
          delay: 0.1,
        },
      },
    },
    exit: {
      scaleX: 0,
      opacity: 0,
      originX: 0.5,
      transition: {
        scaleX: {
          type: "tween",
          duration: 0.3,
          delay: 0.1,
        },
      },
    },
  };

  return (
    <section className="text-item-cards">
      <motion.div className="text-item-cards__list">
        <AnimatePresence mode="sync">
          {Array.isArray(filteredSectionGames) &&
          filteredSectionGames.length > 0 ? (
            filteredSectionGames.map((item, index) => {
              const key = item._id;
              if (index <= 50) {
                return (
                  <motion.div
                    key={key}
                    layout="position"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={item.cardType}
                  >
                    <ItemCard item={item} onItemClick={onItemClick} />
                  </motion.div>
                );
              } else {
                return;
              }
            })
          ) : (
            <NoGamesCard onFilterModalClick={onFilterModalClick} />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

export default SectionItemCards;
