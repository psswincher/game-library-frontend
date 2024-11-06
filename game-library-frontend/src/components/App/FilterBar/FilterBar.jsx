import "./FilterBar.css";
import buttonHamburger from "../../../assets/button-hamburger.svg";
import dropdownArrowIcon from "../../../assets/dropdown-arrow-icon.svg";
function FilterBar({
  onFilterButtonClick,
}) {
  return (
    <header className="filter-bar">
      <div className="filter-bar__container filter-bar__container-desktop">
        <button className="filter-bar__filter-button" type="button" onClick={onFilterButtonClick}><img className="filter-bar__filter-arrow-icon" src={dropdownArrowIcon}/>Players</button>
        <button className="filter-bar__filter-button" type="button" onClick={onFilterButtonClick}><img className="filter-bar__filter-arrow-icon" src={dropdownArrowIcon}/>Length</button>
        <button className="filter-bar__filter-button" type="button" onClick={onFilterButtonClick}><img className="filter-bar__filter-arrow-icon" src={dropdownArrowIcon}/>Complexity</button>
      
      </div>
      <div className="filter-bar__container filter-bar__container-mobile">
        
      </div>
    </header>
  );
}

export default FilterBar;
