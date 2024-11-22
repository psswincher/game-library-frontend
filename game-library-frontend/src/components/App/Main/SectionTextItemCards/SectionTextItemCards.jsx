import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SectionTextItemCards.css";
import { useGameFilters } from "../../../../hooks/useGameFilter";
import NoGamesCard from "../NoGamesCard/NoGamesCard";
import { useItemCard } from "../../../../hooks/useItemCard";

function SectionItemCards({ onItemClick, onFilterModalClick }) {
  const { filteredGames } = useGameFilters();
  const { getGridSpan, getColumnSpan, fetchCard } = useItemCard({
    onItemClick,
  });

  const memoizedGridSpans = useMemo(() => {
    return filteredGames.map((game) => {
      return {
        id: game._id,
        gridSpan: getGridSpan(game),
        columnSpan: getColumnSpan(game),
      };
    });
  }, [filteredGames, getGridSpan, getColumnSpan]);

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
          delay: 0.3,
        },
      },
      exit: {
        scaleX: 0,
        originX: 0.5,
        transition: {
          scaleX: {
            type: "tween",
            duration: 0.3,
          },
        },
      },
    },
  };

  return (
    <section className="text-item-cards">
      <motion.div className="text-item-cards__list">
        <AnimatePresence mode="sync">
          {filteredGames.length > 0
            ? filteredGames.map((item) => {
                const { gridSpan, columnSpan } = memoizedGridSpans.find(
                  (span) => span.id === item._id
                );
                const key = item._id + gridSpan + columnSpan;
                console.log(key);
                return (
                  <motion.div
                    key={key}
                    layout="position"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{
                      layout: {
                        type: "tween",
                        duration: 0.4,
                        delay: 0.25,
                        ease: "easeInOut",
                      },
                    }}
                    style={{
                      gridRow: gridSpan,
                      gridColumn: columnSpan,
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    {fetchCard(item)}
                  </motion.div>
                );
              })
            : ""}
        </AnimatePresence>
        {filteredGames.length === 0 ? (
          <NoGamesCard onFilterModalClick={onFilterModalClick} />
        ) : (
          ""
        )}
      </motion.div>
    </section>
  );
}

export default SectionItemCards;
