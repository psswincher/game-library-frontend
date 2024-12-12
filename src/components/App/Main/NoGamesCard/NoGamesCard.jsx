import "./NoGamesCard.css";
function NoGamesCard({ onFilterModalClick }) {
  return (
    <li className="no-games-card__container">
      <div className="no-games-card__title">Oops!</div>
      <div className="no-games-card__description" onClick={onFilterModalClick}>
        There are no games in this category that match your filters! {<p></p>}
        Click to edit them!
      </div>
    </li>
  );
}

export default NoGamesCard;
