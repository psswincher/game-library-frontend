import { useContext } from "react";
import "./HeroItemCard.css";
import GameImage from "../../GameImage/GameImage";
import InteractionBar from "../../InteractionBar/InteractionBar";
import { IsLoggedInContext } from "../../../../contexts/IsLoggedInContext";
import { GameFilterContext } from "../../../../contexts/GameFilterContext";
import Button from "../../Buttons/Button";
function HeroItemCard({ item, onItemClick }) {
  function handleItemClick() {
    onItemClick(item);
  }

  const { isLoggedIn } = useContext(IsLoggedInContext);
  const { onFilterOptionClick, isOptionActive } = useContext(GameFilterContext);

  const itemPlayers = () => {
    return item.playerCountSlug.replace(" Players", "P");
  };

  return (
    <li className={`hero-item-card`} onClick={handleItemClick}>
      <div className="hero-item-card__content">
        <div className="hero-item-card__image">
          <GameImage game={item} size="large" />
        </div>
        <div className="hero-item-card__right">
          <div className="hero-item-card__title-bar">
            <h2 className="hero-item-card__title">{item.name}</h2>
            {isLoggedIn && (
              <div className="hero-item-card__interaction-bar">
                <InteractionBar game={item} />
              </div>
            )}
          </div>
          <div className="hero-item-card__game-info">
            <div className="hero-item-card__game-base-data">
              <Button
                text={item.category}
                isOn={isOptionActive("Category", item.category)}
                onClick={() => onFilterOptionClick("Category", item.category)}
                style="attribute"
              />
              <Button
                text={item.complexity}
                isOn={isOptionActive("Complexity", item.complexity)}
                onClick={() =>
                  onFilterOptionClick("Complexity", item.complexity)
                }
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
              <div className="hero-item-card__data">{itemPlayers()}</div>
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
    </li>
  );
}

export default HeroItemCard;
