import "./ItemCard.css";

function ItemCard({ item, onItemClick, cardType, isOpen }) {
  function handleItemClick() {
    onItemClick(item);
  }

  return (
    <li className="item-card" onClick={handleItemClick}>
      <img className="item-card__image" src={item.imageUrl} />
    </li>
  );
}

export default ItemCard;
