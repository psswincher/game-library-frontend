import "./ImageItemCard.css";
import GameImage from "../../GameImage/GameImage";
function ImageItemCard({ item, onItemClick, onItemCardClick }) {
  function handleItemClick() {
    onItemClick(item);
    onItemCardClick(item);
  }

  const itemPlayers = () => {
    return item.playerCountSlug.replace(" Players", "P");
  };

  return (
    <li className="image-item-card" onClick={handleItemClick}>
      <div className="image-item-card__content">
        <div className="image-item-card__top">
          <GameImage game={item} />
          <h2 className="image-item-card__title">{item.name}</h2>
        </div>
        <div className="image-item-card__game-base-data">
          <div className="image-item-card__data">{item.category}</div>
          <div className="image-item-card__data">{item.complexity}</div>
          <div className="image-item-card__data">{item.gameLength}</div>
          <div className="image-item-card__data">{itemPlayers()}</div>
        </div>
        <div className="image-item-card__game-short-description">
          {item.shortDescription}
        </div>
      </div>
    </li>
  );
}

export default ImageItemCard;
