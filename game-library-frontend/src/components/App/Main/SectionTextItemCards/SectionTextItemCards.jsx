import { motion, AnimatePresence } from "framer-motion";
import "./SectionTextItemCards.css";
import { useGameFilters } from "../../../../hooks/useGameFilter";
import NoGamesCard from "../NoGamesCard/NoGamesCard";
import HeroItemCard from "../HeroItemCard/HeroItemCard";
import ImageItemCard from "../ImageItemCard/ImageItemCard";
import TextItemCard from "../TextItemCard/TextItemCard";

function SectionItemCards({ onItemClick, onFilterModalClick }) {
  const { filteredGames } = useGameFilters();

  const fetchCard = (item) => {
    switch (item.cardType) {
      case "HeroItemCard":
        return <HeroItemCard item={item} onItemClick={onItemClick} />;
      case "ImageItemCard":
        return <ImageItemCard item={item} onItemClick={onItemClick} />;
      default:
        return <TextItemCard item={item} onItemClick={onItemClick} />;
    }
  };

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
          {filteredGames.length > 0
            ? filteredGames.map((item) => {
                const key = item._id;

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
