import "./NoGamesCard.css";
function NoGamesCard({ onFilterModalClick }) {
  return (
    <div className="no-games-card__container">
      <div className="no-games-card__title">Oops!</div>
      <p className="no-games-card__description" onClick={onFilterModalClick}>
        There are no games in this category that match your filters! Click to
        edit them!
      </p>
    </div>
  );
}

export default NoGamesCard;
