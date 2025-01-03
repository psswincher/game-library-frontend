import "./ImageTitleBlock.css";
import GameImage from "../../../GameImage/GameImage";

function ImageTitleBlock({ game }) {
  return (
    <div className="image-title-block">
      <div className="image-title-block__image">
        <GameImage game={game} size="small" />
      </div>
      <h2 className="image-title-block__title">{game.name}</h2>
    </div>
  );
}

export default ImageTitleBlock;
