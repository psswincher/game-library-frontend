import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./FilterModal.module.css";
// import closeModalIcon from "../../../assets/close-modal-icon.svg";
import Modal from "../Modal/Modal";
import { filters } from "../../../utils/constants";
import FilterModalFilter from "./FilterModalFilter/FilterModalFilter";
import SearchBar from "./SearchBar/SearchBar";
import useSearchBar from "../../../hooks/useSearchBar";
import Button from "../Buttons/Button";
function FilterModal({ isOpen, onFilterClick, onFilterSearchBarType }) {
  const { searchTerm, setSearchTerm } = useSearchBar();
  const onSearch = (value) => {
    setSearchTerm(value);
    onFilterSearchBarType(value);
  };

  const tabs = [
    {
      tabName: "Attributes",
      filters: ["Players", "Category", "Complexity", "Game Length"],
    },
    { tabName: "Mechanics", filters: ["Mechanics"] },
    { tabName: "Preferences", filters: ["User Preferences"] },
  ];

  const filterIndex = {
    Players: 0,
    Category: 1,
    Complexity: 2,
    "Game Length": 3,
    Mechanics: 4,
    "User Preferences": 5,
  };

  const [currentTab, setCurrentTab] = useState(tabs[0].tabName);

  const onTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <Modal isOpen={isOpen}>
      <div className={styles.modal__content}>
        <div className={styles.modal__titleBar}>
          <div className={styles.modal__title}>Find Your Game</div>
        </div>
        <SearchBar searchTerm={searchTerm} onSearch={onSearch}></SearchBar>
        <div className={styles["modal__tabs-container"]}>
          {tabs.map((tab, index) => {
            return (
              <div className="filter-modal__button-container" key={index}>
                <Button
                  type="button"
                  size="larger"
                  style="tab"
                  text={tab.tabName}
                  isOn={tab.tabName === currentTab}
                  onClick={() => onTabClick(tab.tabName)}
                >
                  {tab.tabName === currentTab && (
                    <motion.div
                      layoutId="filterHighlight"
                      className={styles["filter-modal__tab-highlight"]}
                    />
                  )}
                </Button>
              </div>
            );
          })}
        </div>
        <AnimatePresence>
          {tabs.map((tab) => {
            return (
              tab.tabName === currentTab && (
                <motion.div
                  key={tab.tabName}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  layout
                  className={styles["filter-modal__tab-content"]}
                >
                  <div className={styles.modal__filters}>
                    {tab.filters.map((filterName, index) => {
                      return (
                        <FilterModalFilter
                          key={index}
                          gameFilter={filters[filterIndex[filterName]]}
                          onFilterClick={onFilterClick}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

export default FilterModal;
