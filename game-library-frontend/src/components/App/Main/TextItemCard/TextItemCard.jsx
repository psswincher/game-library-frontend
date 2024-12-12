import { useContext } from "react";
import { motion } from "framer-motion";
import "./TextItemCard.css";
import Button from "../../Buttons/Button";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
function TextItemCard({ item, onItemClick }) {
  function handleItemClick() {
    onItemClick(item);
  }
  const { onFilterOptionClick, isOptionActive } = useContext(GameFilterContext);
  const itemPlayers = () => {
    return item.playerCountSlug.replace(" Players", "P");
  };

  return (
    <motion.li className={`text-item-card`} onClick={handleItemClick}>
      <motion.div className="text-item-card__content">
        <h2 className="text-item-card__title">{item.name}</h2>
        <div className="text-item-card__top">
          <div className="text-item-card__game-base-data">
            <Button
              text={item.category}
              isOn={isOptionActive("Category", item.category)}
              onClick={() => onFilterOptionClick("Category", item.category)}
              style="attribute"
            />
            <Button
              text={item.complexity}
              isOn={isOptionActive("Complexity", item.complexity)}
              onClick={() => onFilterOptionClick("Complexity", item.complexity)}
              style="attribute"
            />
            <Button
              text={item.gameLength}
              isOn={isOptionActive("Game Length", item.gameLength)}
              onClick={() =>
                onFilterOptionClick("Game Length", item.gameLength)
              }
              style="attribute"
            />

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
