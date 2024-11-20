import { useState } from "react";
import { motion } from "framer-motion";
import "./FilterHeroFilterButton.css";

function FilterHeroFilterButton({ option, isActive, onClick }) {
  function handleFilterOptionClick(event) {
    event.stopPropagation();
    onClick();
  }

  return (
    <li className="filter-hero-button__list-container">
      <motion.button
        className={`filter-hero-button__button ${
          isActive ? "filter-hero-button__on" : ""
        }`}
        type="button"
        onClick={handleFilterOptionClick}
      >
        {option}
      </motion.button>
    </li>
  );
}

export default FilterHeroFilterButton;
