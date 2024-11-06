import "./ItemCard.css";
function ItemCard({ item, onItemClick }) {
  function handleItemClick() {
    onItemClick(item);
  }

  return (
    <li className="item-card" onClick={handleItemClick}>
      
      <img className="item-card__image" src={item.image} />
    </li>
  );
}

export default ItemCard;
