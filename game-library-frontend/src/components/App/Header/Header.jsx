import "./Header.css";
import logo from "../../../assets/Logo.svg";
import buttonHamburger from "../../../assets/button-hamburger.svg";
function Header({
  onProfileClick,
  user,
}) {
  return (
    <header className="header">
      <div className="header__container header__container-desktop">
        <div className="header__left">
          {/* <img className="header__logo" src={logo} /> */}
          <div className="header__title">
          Home
          </div>
        </div>
        <div className="header__right">
          <p className="header__user-name">{user.name}</p>
          <img className="header__user-image" src={user.image} />
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
        <div className="header__bottom">
        </div>
      </div>
    </header>
  );
}

export default Header;
