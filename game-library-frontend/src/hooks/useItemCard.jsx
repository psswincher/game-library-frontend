import HeroItemCard from "../components/App/Main/HeroItemCard/HeroItemCard";
import ImageItemCard from "../components/App/Main/ImageItemCard/ImageItemCard";
import TextItemCard from "../components/App/Main/TextItemCard/TextItemCard";

export function useItemCard({ onItemClick }) {
  const fetchCard = (item) => {
    switch (item.cardType) {
      case "HeroItemCard":
        return <HeroItemCard item={item} onItemClick={onItemClick} />;
      case "ImageItemCard":
        return <ImageItemCard item={item} onItemClick={onItemClick} />;
      default:
        return <TextItemCard item={item} onItemClick={onItemClick} />;
    }
  };

  return {
    fetchCard,
  };
}
