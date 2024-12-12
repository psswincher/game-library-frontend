import "./Main.css";
import SectionItemCards from "./SectionTextItemCards/SectionTextItemCards";
import FilterHeroCarousel from "./FilterHeroCarousel/FilterHeroCarousel";
import { categories } from "../../../utils/constants";

function Main({ onItemClick, onFilterModalClick }) {
  return (
    <main className="main">
      <div className="main__container">
        <FilterHeroCarousel></FilterHeroCarousel>
        {/* {categories.map((category) => {
          return ( */}
        <SectionItemCards
          // key={category.name}
          onItemClick={onItemClick}
          // category={category.name}
          // title={category.title}
          // subtitle={category.subtitle}
          onFilterModalClick={onFilterModalClick}
        />
        {/* );
        })} */}
      </div>
    </main>
  );
}

export default Main;
