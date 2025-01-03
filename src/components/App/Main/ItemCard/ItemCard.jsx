import { useRef, useState, useEffect } from "react";

import "./ItemCard.css";
import HeroItemCard from "../HeroItemCard/HeroItemCard";
import ImageItemCard from "../ImageItemCard/ImageItemCard";
import TextItemCard from "../TextItemCard/TextItemCard";

function ItemCard({ item, onItemClick }) {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const fetchCard = () => {
    switch (item.cardType) {
      case "HeroItemCard":
        return <HeroItemCard item={item} onItemClick={onItemClick} />;
      case "ImageItemCard":
        return <ImageItemCard item={item} onItemClick={onItemClick} />;
      default:
        return <TextItemCard item={item} onItemClick={onItemClick} />;
    }
  };

  return (
    <div ref={ref} className="item-card">
      {isVisible ? (
        fetchCard()
      ) : (
        <div className="item-card__loading">Loading game!</div>
      )}
    </div>
  );
}

export default ItemCard;
