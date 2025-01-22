import { useState } from "react";
import "./GameImage.css";
import fallbackSrc from "../../../assets/kitten.png";

function GameImage({ game, size }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const imageSize = () => {
    switch (size) {
      case "large":
        return `game-image__wrapper_large`;
      case "medium":
        return `game-image__wrapper_medium`;
      case "small":
        return `game-image__wrapper_small`;
      default:
        return `game-image__wrapper_small`;
    }
  };

  return (
    <div className={`game-image__wrapper ${imageSize()}`}>
      <img
        src={game.imageUrl}
        alt={`${game.name} Cover Art`}
        className={`game-image__image ${!isLoading && "game-image__visible"}`}
        onLoad={handleLoad}
        onError={handleError}
      />

      {hasError && (
        <img
          src={fallbackSrc}
          alt={"Image failed to load - here's a consolation kitten!"}
          className={`game-image__image`}
        />
      )}
    </div>
  );
}

export default GameImage;
