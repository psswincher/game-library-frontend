import { useContext } from "react";
import "./HeroItemCard.css";
import GameImage from "../../GameImage/GameImage";
import InteractionBar from "../../InteractionBar/InteractionBar";
import { IsLoggedInContext } from "../../../../contexts/IsLoggedInContext";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
import Button from "../../Buttons/Button";
function HeroItemCard({ item, onItemClick, onItemCardClick, isFavorite }) {
  function handleItemClick() {
    onItemCardClick(item);
    onItemClick(item);
  }

  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { onFilterOptionClick, isOptionActive } = useContext(GameFilterContext);

  return (
    <li
      className={`hero-item-card ${isFavorite && "hero-item-card_on"}`}
      onClick={handleItemClick}
    >
      <div className="hero-item-card__content">
        <div className="hero-item-card__image">
          <GameImage game={item} />
        </div>

        <div className="hero-item-card__right">
          <h2 className="hero-item-card__title">{item.name}</h2>
          <div className="hero-item-card__game-info">
            <div className="hero-item-card__game-base-data">
              <div className="hero-item-card__game-base-data">
                <div className="hero-item-card__data">{item.category}</div>
                <div className="hero-item-card__data">{item.complexity}</div>
                <div className="hero-item-card__data">{item.gameLength}</div>
                <div className="hero-item-card__data">
                  {item.playerCountSlug}
                </div>
              </div>
            </div>
          </div>
          <div className="hero-item-card__descriptions">
            <div className="hero-item-card__game-short-description">
              {item.shortDescription}
            </div>
            <div className="hero-item-card__game-full-description">
              {item.fullDescription}
            </div>
          </div>
          <div className="hero-item-card__game_mechanics">
            {item.mechanics
              ? item.mechanics.map((mechanic, index) => {
                  // return <MechanicButton key={index} mechanic={mechanic} />;
                  return (
                    <Button
                      style="mechanic"
                      size="smallest"
                      text={mechanic}
                      key={index}
                      isOn={isOptionActive("Mechanics", mechanic)}
                      onClick={() => onFilterOptionClick("Mechanics", mechanic)}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {isLoggedIn && <InteractionBar game={item} />}
    </li>
  );
}

export default HeroItemCard;
