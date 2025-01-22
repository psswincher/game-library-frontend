import "./Main.css";
import SectionItemCards from "./SectionTextItemCards/SectionTextItemCards";
import FilterHeroCarousel from "./FilterHeroCarousel/FilterHeroCarousel";
import Loading from "../Loading/Loading";
function Main({ onItemClick, onFilterModalClick, isLoading }) {
  return (
    <main className="main">
      <div className="main__container">
        <FilterHeroCarousel />
        {isLoading && <Loading />}
        {!isLoading && (
          <SectionItemCards
            onItemClick={onItemClick}
            onFilterModalClick={onFilterModalClick}
            isLoading={isLoading}
          />
        )}
      </div>
    </main>
  );
}

export default Main;
