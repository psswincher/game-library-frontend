import "./Main.css";
import SectionItemCards from "./SectionTextItemCards/SectionTextItemCards";
import FilterHeroCarousel from "./FilterHeroCarousel/FilterHeroCarousel";

function Main({ onItemClick, onFilterModalClick }) {
  return (
    <main className="main">
      <div className="main__container">
        <FilterHeroCarousel />
        <SectionItemCards
          onItemClick={onItemClick}
          onFilterModalClick={onFilterModalClick}
        />
      </div>
    </main>
  );
}

export default Main;
