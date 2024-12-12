import "./ImageTitleBlock.css";
import GameImage from "../../../GameImage/GameImage";

//TODO Could I calculate whether there's space for an image and adjust accordingly?
//If any single word in a title is over 10 characters in length, then there's probably a conflict.
function ImageTitleBlock({ game }) {
  return (
    <div className="image-title-block">
      <div className="image-title-block__image">
        <GameImage game={game} />
      </div>
      <h2 className="image-title-block__title">{game.name}</h2>
    </div>
  );
}

export default ImageTitleBlock;
