import { React, useState, useEffect } from "react";
import "./Header.css";
import logo from "../../../assets/Logo.svg";
import filterIcon from "../../../assets/magnifyingIcon.svg";
import buttonHamburger from "../../../assets/button-hamburger.svg";
import { useGameFilters } from "../../../hooks/useGameFilter";
import { motion, useAnimation } from "framer-motion";
import UserInfo from "../UserInfo/UserInfo.jsx";
import FilterBar from "../FilterBar/FilterBar.jsx";
function Header({
  onProfileClick,
  currentUser,
  isLoggedIn,
  onFilterModalClick,
  onSignUpClick,
  onLoginClick,
  onFilterClick,
  activeFilter,
}) {
  const { getActiveFilterCount } = useGameFilters();
  const controls = useAnimation();

  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (getActiveFilterCount() > 0) {
      setPulse(true);
      setTimeout(() => {
        setPulse(false);
      }, 600);
    }
  }, [getActiveFilterCount()]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        controls.start({ backgroundColor: "rgba(82, 31, 99, 0.4)" });
      } else {
        controls.start({ backgroundColor: "rgba(82, 31, 99, 0.8)" });
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.header
      className="header"
      animate={controls}
      initial={{ backgroundColor: "rgba(82, 31, 99, 1)" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 2,
        padding: "20px",
        color: "white",
        backdropFilter: "blur(3px)", // Optional: Adds a slight blur effect
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="header__container header__container-desktop">
        <div className="header__left">
          {/* <img className="header__logo" src={logo} /> */}
          <div className="header__title">Home</div>
        </div>
        <div className="header__center">
          <FilterBar
            onFilterClick={onFilterClick}
            activeFilter={activeFilter}
          />
        </div>
        <div className="header__right">
          {!isLoggedIn && (
            <button className="header__text-button" onClick={onSignUpClick}>
              Sign Up
            </button>
          )}
          {!isLoggedIn && (
            <button className="header__text-button" onClick={onLoginClick}>
              Log In
            </button>
          )}
          {isLoggedIn && currentUser && <UserInfo />}
          <button
            className={`header__filter-button ${
              getActiveFilterCount() > 0 && "header__filters-on"
            } ${pulse && "pulse"}`}
            onClick={onFilterModalClick}
          >
            <div
              className={`header__filter-button-count ${
                getActiveFilterCount() > 0 && "header__filter-button-count_on"
              } ${pulse && "pulse"}`}
            >
              {getActiveFilterCount()}
            </div>
            <img className="header__filter-button-image" src={filterIcon} />
          </button>
        </div>
      </div>
      <div className="header__container header__container-mobile">
        <div className="header__top">
          <img className="header__logo" src={logo} />
          <button className="header__profile-button" onClick={onProfileClick}>
            <img
              className="header__profile-button-image"
              src={buttonHamburger}
            />
          </button>
        </div>
        <div className="header__bottom"></div>
      </div>
    </motion.header>
  );
}

export default Header;
