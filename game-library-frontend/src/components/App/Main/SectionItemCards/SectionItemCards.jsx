import "./SectionItemCards.css";
import { defaultGames } from "../../../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function SectionItemCards({ onItemClick, itemWeight, title, subtitle, gameLibrary }) {
  return (
    <section className="item-cards">
      <div className="item-cards__header-container">
        <div className="item-cards__header-title">
          {title}
        </div>
        <div className="item-cards__header-subtitle">
          {subtitle}
        </div>
      </div>
      <div className="item-cards__container">
        <ul className="item-cards__list">
          {defaultGames
            // .filter((item) => {
            //   return item.weight === itemWeight;
            // })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onItemClick={onItemClick}
                />
              );
            })}
        </ul>
      </div>
    </section>
  );
}

export default SectionItemCards;
