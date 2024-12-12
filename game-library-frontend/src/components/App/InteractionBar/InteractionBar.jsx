import { useContext, useEffect } from "react";
import "./InteractionBar.css";
import playedIcon from "../../../assets/checkmark.svg";
import likeIcon from "../../../assets/thumbsup.svg";
import wantToPlayIcon from "../../../assets/eye.svg";
import IconButton from "../Buttons/IconButton/IconButton";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
function InteractionBar({ game }) {
  const {
    onLikeGameClick,
    userLikesGame,
    userLikedGames,
    userPlayedGame,
    userPlayedGames,
    onPlayedGameClick,
    onWantsGameClick,
    userWantedGames,
    userWantsGame,
  } = useContext(CurrentUserContext);

  const clickLikeGame = () => {
    onLikeGameClick(game);
  };

  const likeIsActive = () => {
    return userLikesGame(game);
  };

  useEffect(() => {
    likeIsActive(game);
  }, [userLikedGames]);

  const clickPlayedGame = () => {
    onPlayedGameClick(game);
  };

  const playedIsActive = () => {
    return userPlayedGame(game);
  };

  useEffect(() => {
    playedIsActive(game);
  }, [userPlayedGames]);

  const clickWantedGame = () => {
    onWantsGameClick(game);
  };

  const wantedIsActive = () => {
    return userWantsGame(game);
  };

  useEffect(() => {
    wantedIsActive(game);
  }, [userWantedGames]);

  return (
    <div className="interaction-bar">
      <div className="interaction-bar__button-container">
        <IconButton
          className="interaction-bar__button"
          alt="Want to play this game."
          icon={wantToPlayIcon}
          isActive={wantedIsActive(game)}
          onClick={clickWantedGame}
        ></IconButton>
        <div className="interaction-bar__button-title">Interested</div>
      </div>
      <div className="interaction-bar__button-container">
        <IconButton
          className="interaction-bar__button"
          alt="I played this game."
          icon={playedIcon}
          isActive={playedIsActive(game)}
          onClick={clickPlayedGame}
        ></IconButton>
        <div className="interaction-bar__button-title">Played</div>
      </div>
      <div className="interaction-bar__button-container">
        <IconButton
          className="interaction-bar__button"
          isActive={likeIsActive(game)}
          alt="Like this game."
          icon={likeIcon}
          game={game}
          onClick={clickLikeGame}
        ></IconButton>
        <div className="interaction-bar__button-title">Liked</div>
      </div>
    </div>
  );
}

export default InteractionBar;
