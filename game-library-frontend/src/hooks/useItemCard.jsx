import { useState } from "react";
import { testFavorites, testMajorFavorites } from "../utils/constants";
import HeroItemCard from "../components/App/Main/HeroItemCard/HeroItemCard";
import ImageItemCard from "../components/App/Main/ImageItemCard/ImageItemCard";
import TextItemCard from "../components/App/Main/TextItemCard/TextItemCard";

export function useItemCard({ onItemClick }) {
  const [openItem, setOpenItem] = useState("");
  const onItemCardClick = (item) => {
    item._id === openItem ? setOpenItem("") : setOpenItem(item._id);
  };
  const getGridSpan = (item) => {
    if (isMajorFavorite(item)) return "span 2";
    if (isFavorite(item)) return "span 2";
    return "auto";
  };

  const getColumnSpan = (item) => {
    if (isMajorFavorite(item)) return "span 3";
    if (isFavorite(item)) return "auto";
    return "auto";
  };

  const isMajorFavorite = (item) => {
    return testMajorFavorites.includes(item.name) || isOpen(item);
  };

  const isFavorite = (item) => {
    return testFavorites.includes(item.name);
  };

  const isOpen = (item) => {
    return item._id === openItem;
  };

  const fetchCard = (item) => {
    if (isMajorFavorite(item))
      return (
        <HeroItemCard
          item={item}
          onItemClick={onItemClick}
          onItemCardClick={onItemCardClick}
          isFavorite={isOpen(item)}
        />
      );
    if (isFavorite(item))
      return (
        <ImageItemCard
          item={item}
          onItemClick={onItemClick}
          onItemCardClick={onItemCardClick}
        />
      );
    return (
      <TextItemCard
        item={item}
        onItemClick={onItemClick}
        onItemCardClick={onItemCardClick}
      />
    );
  };

  return {
    getGridSpan,
    getColumnSpan,
    isFavorite,
    isOpen,
    fetchCard,
    openItem,
    onItemCardClick,
  };
}
