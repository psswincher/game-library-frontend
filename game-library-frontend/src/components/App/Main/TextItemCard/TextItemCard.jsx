import { useState } from "react";
import { motion } from "framer-motion";
import "./TextItemCard.css";
function TextItemCard({ item, onItemClick, onItemCardClick }) {
  const [clicked, setClicked] = useState(false);
  function handleItemClick() {
    onItemCardClick(item);
    onItemClick(item);
    setClicked(!clicked);
    console.log(clicked);
  }
  const itemPlayers = () => {
    return item.playerCountSlug.replace(" Players", "P");
  };

  return (
    <motion.li className={`text-item-card`} onClick={handleItemClick}>
      <motion.div className="text-item-card__content">
        <h2 className="text-item-card__title">{item.name}</h2>
        <div className="text-item-card__top">
          <div className="text-item-card__game-base-data">
            <div className="text-item-card__data">{item.category}</div>
            <div className="text-item-card__data">{item.complexity}</div>
            <div className="text-item-card__data">{item.gameLength}</div>
            <div className="text-item-card__data">{itemPlayers()}</div>
          </div>
        </div>
        <div className="text-item-card__game-short-description">
          {item.shortDescription}
        </div>
      </motion.div>
    </motion.li>
  );
}

export default TextItemCard;
