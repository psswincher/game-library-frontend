import { useState } from "react";
import "./GameImage.css";
import fallbackSrc from "../../../assets/kitten.png";

function GameImage({ game }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`game-image__wrapper`}>
      {isLoading && !hasError && (
        <div className="game-image__placeholder"></div>
      )}
      <img
        src={game.imageUrl}
        alt={`${game.name} Cover Art`}
        className={`game-image__image ${isLoading && "game-image__hidden"}`}
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
