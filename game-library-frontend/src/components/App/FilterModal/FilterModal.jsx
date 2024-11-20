import styles from "./FilterModal.module.css";
// import closeModalIcon from "../../../assets/close-modal-icon.svg";
import Modal from "../Modal/Modal";
import { filters } from "../../../utils/constants";
import FilterModalFilter from "./FilterModalFilter/FilterModalFilter";
import SearchBar from "./SearchBar/SearchBar";
import useSearchBar from "../../../hooks/useSearchBar";

function FilterModal({ isOpen, onFilterClick, onFilterSearchBarType }) {
  const { searchTerm, setSearchTerm } = useSearchBar();
  const onSearch = (value) => {
    setSearchTerm(value);
    onFilterSearchBarType(value);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.modal__content}>
        <div className={styles.modal__titleBar}>
          <div className={styles.modal__title}>Find Your Game</div>
        </div>
        <SearchBar searchTerm={searchTerm} onSearch={onSearch}></SearchBar>
        <div className={styles.modal__filters}>
          {filters.map((gameFilter, index) => {
            return (
              <FilterModalFilter
                key={index}
                gameFilter={gameFilter}
                onFilterClick={onFilterClick}
              />
            );
          })}
        </div>
      </div>
    </Modal>
  );
}

export default FilterModal;
