import { motion, AnimatePresence } from "framer-motion";
import { useContext, useState, useEffect, useMemo } from "react";

import "./SectionTextItemCards.css";

import { GameFilterContext } from "../../../../contexts/GameFilterContext";
import { GameLibraryContext } from "../../../../contexts/GameLibraryContext";

import NoGamesCard from "../NoGamesCard/NoGamesCard";
import ItemCard from "../ItemCard/ItemCard";
import Loading from "../../Loading/Loading";

function SectionItemCards({
  onItemClick,
  onFilterModalClick,
  sectionFilter,
  isLoading,
}) {
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
      <motion.ul className="text-item-cards__list">
        {isLoading && <Loading />}
        <AnimatePresence mode="sync">
          {!isLoading &&
            filteredSectionGames.length > 0 &&
            filteredSectionGames.map((item) => {
              const key = item._id;
              return (
                <motion.li
                  key={key}
                  layout="position"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={item.cardType}
                >
                  <ItemCard item={item} onItemClick={onItemClick} />
                </motion.li>
              );
            })}

          {!isLoading && filteredSectionGames.length === 0 && (
            <motion.li
              key="no-games"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <NoGamesCard onFilterModalClick={onFilterModalClick} />
            </motion.li>
          )}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}

export default SectionItemCards;
