import { useContext } from "react";
import "./ImageItemCard.css";
import ImageTitleBlock from "./ImageTitleBlock/ImageTitleBlock";
import Button from "../../Buttons/Button";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";

function ImageItemCard({ item, onItemClick }) {
  const { onFilterOptionClick, isOptionActive } = useContext(GameFilterContext);

  function handleItemClick() {
    onItemClick(item);
  }

  const itemPlayers = () => {
    return item.playerCountSlug.replace(" Players", "P");
  };

  return (
    <div
      className={`image-item-card  ${
        item.isFavorite && "image-item-card__highlight"
      }`}
      onClick={handleItemClick}
    >
      <div className={`image-item-card__content`}>
        <ImageTitleBlock game={item} />
        <div className="image-item-card__game-base-data">
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
            onClick={() => onFilterOptionClick("Game Length", item.gameLength)}
            style="attribute"
          />
          <div className="image-item-card__data">{itemPlayers()}</div>
        </div>
        <p className="image-item-card__game-short-description">
          {item.shortDescription}
        </p>
      </div>
    </div>
  );
}

export default ImageItemCard;
