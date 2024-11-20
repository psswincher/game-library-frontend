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

  const itemVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  return (
    <section className="text-item-cards">
      <motion.div className="text-item-cards__list">
        <AnimatePresence initial={false} mode="popLayout">
          {filteredGames.length > 0
            ? filteredGames.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  style={{
                    gridRow: getGridSpan(item),
                    gridColumn: getColumnSpan(item),
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {fetchCard(item)}
                </motion.div>
              ))
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
