import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/App/Header/Header";
import Main from "./components/App/Main/Main";
import ModalWithForm from "./components/App/ModalWithForm/ModalWithForm";
import Footer from "./components/App/Footer/Footer";
import FilterModal from "./components/App/FilterModal/FilterModal";
import UserProfile from "./components/App/UserProfile/UserProfile";
import Api from "./utils/api.js";
import userImage from "./assets/terrence-user-image.png";
import { apiInfo } from "./utils/constants.js";
import { AppContext } from "./contexts/AppContext.jsx";
import { GameLibraryContext } from "./contexts/GameLibraryContext.jsx";
import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";
import { GameFilterContextProvider } from "./hooks/useGameFilter.jsx";
import { IsLoggedInContext } from "./contexts/IsLoggedInContext.jsx";
import RegisterModal from "./components/App/RegisterModal/RegisterModal.jsx";
import LoginModal from "./components/App/LoginModal/LoginModal.jsx";
// import useSearchBar from "./hooks/useSearchBar.jsx";
import { useUserManager } from "./hooks/useUserManager.jsx";
import { useModal } from "./hooks/useModal.jsx";

import gameLibraryFilterDecorator from "./utils/gameLibraryFilterDecorator.js";
import ProfileModal from "./components/App/ProfileModal/ProfileModal.jsx";
import { nullUser } from "./utils/constants.js";
const api = new Api(apiInfo.baseUrl);

function App() {
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const [gameLibrary, setGameLibrary] = useState([]);
  const [searchedGameLibrary, setSearchedGameLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  const {
    handleSignUp,
    userLikesGame,
    handleLogin,
    handleLikeGame,
    handleUnlikeGame,
    userPlayedGame,
    userPlayedGames,
    handlePlayedGame,
    handleUnplayedGame,
    isLoggedIn,
    currentUser,
    handleLogout,
    userLikedGames,
    userWantsGame,
    userWantedGames,
    handleWantGame,
    handleUnwantGame,
  } = useUserManager(api);

  const { isOpen, activeModal, setActiveModal, closeActiveModal } = useModal();

  useEffect(() => {
    function fetchData() {
      api
        .getGames()
        .then((res) => {
          gameLibraryFilterDecorator(res.data);
          setGameLibrary(res.data);
          setSearchedGameLibrary(res.data);
        })
        .catch(console.error);
    }
    fetchData();
  }, []);

  const onSignUp = ({ name, email, avatar, password }) => {
    const user = { name, email, avatar, password };
    handleRequest(handleSignUp(user));
    console.log(currentUser);
  };

  const onLogin = ({ email, password }) => {
    const user = { email, password };
    return handleRequest(handleLogin(user));
  };

  const onSignUpClick = () => {
    setActiveModal("register-modal");
  };

  const onLoginClick = () => {
    setActiveModal("login-modal");
  };

  function handleRequest(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const onLikeGameClick = (game) => {
    if (userLikesGame(game)) {
      return handleRequest(handleUnlikeGame({ gameId: game._id }));
    } else {
      return handleRequest(handleLikeGame({ gameId: game._id }));
    }
  };

  const onPlayedGameClick = (game) => {
    if (userPlayedGame(game)) {
      return handleRequest(handleUnplayedGame({ gameId: game._id }));
    } else {
      return handleRequest(handlePlayedGame({ gameId: game._id }));
    }
  };

  const onWantsGameClick = (game) => {
    if (userWantsGame(game)) {
      return handleRequest(handleUnwantGame({ gameId: game._id }));
    } else {
      return handleRequest(handleWantGame({ gameId: game._id }));
    }
  };
  const closeUserProfile = () => setUserProfileVisible(false);

  const onItemClick = (item) => {
    if (item.isClicked) {
      item.isClicked = !item.isClicked;
    } else {
      item.isClicked = true;
    }
    console.log("Item isClicked is now", item.isClicked);
  };

  const onFilterModalClick = () => {
    setActiveModal("filter-modal");
  };

  const onFilterClick = (filter) => {
    activeFilter === filter ? setActiveFilter("") : setActiveFilter(filter);
  };

  return (
    <AppContext.Provider
      value={{ closeActiveModal, isLoading, setActiveModal }}
    >
      <GameLibraryContext.Provider value={{ gameLibrary }}>
        <CurrentUserContext.Provider
          value={{
            currentUser,
            onLikeGameClick,
            userLikesGame,
            userLikedGames,
            onPlayedGameClick,
            userPlayedGame,
            userPlayedGames,
            onWantsGameClick,
            userWantedGames,
            userWantsGame,
          }}
        >
          <GameFilterContextProvider gameLibrary={searchedGameLibrary}>
            <IsLoggedInContext.Provider value={{ isLoggedIn }}>
              <div className="page">
                <Header
                  currentUser={currentUser}
                  onFilterModalClick={onFilterModalClick}
                  isLoggedIn={isLoggedIn}
                  onSignUpClick={onSignUpClick}
                  onLoginClick={onLoginClick}
                />
                <div className="page__content">
                  <Main
                    onItemClick={onItemClick}
                    onFilterModalClick={onFilterModalClick}
                  />
                  <Footer />
                  <FilterModal
                    isOpen={isOpen("filter-modal")}
                    onFilterClick={onFilterClick}
                    // onFilterSearchBarType={onFilterSearchBarType}
                  />
                  <ProfileModal
                    isOpen={isOpen("profile-modal")}
                    handleLogout={handleLogout}
                  />
                  <LoginModal
                    isOpen={isOpen("login-modal")}
                    onLogin={onLogin}
                  />
                  {/* <ModalWithForm
                title="New Garment"
                buttonText="Add garment"
                activeModal={activeModal}
                closeModal={closeActiveModal}
              >
                <label
                  htmlFor="garment-name"
                  className={styleAddGarmentModal["modal__label"]}
                >
                  Name
                  <input
                    name="garment-name"
                    id="garment-name"
                    className={styleAddGarmentModal["modal__input"]}
                    type="text"
                    placeholder="Name"
                    required
                  />
                  <span
                    className="modal__input_type_error garment-name-error"
                    id="garment-name-input-error"
                  ></span>
                </label>
                <label
                  htmlFor="garment-imageUrl"
                  className={styleAddGarmentModal["modal__label"]}
                >
                  Image
                  <input
                    name="garment-imageUrl"
                    id="garment-imageUrl"
                    className={styleAddGarmentModal["modal__input"]}
                    type="text"
                    placeholder="Image URL"
                    required
                  />
                  <span
                    className="modal__input_type_error garment-name-input-error"
                    id="garment-name-input-error"
                  ></span>
                </label>
                <fieldset
                  className={styleAddGarmentModal["modal__radio-buttons"]}
                >
                  <legend className={styleAddGarmentModal["modal__legend"]}>
                    <label
                      htmlFor="hot"
                      className={
                        styleAddGarmentModal[
                          "modal__label modal__label_type_radio"
                        ]
                      }
                    >
                      <input
                        id="hot"
                        type="radio"
                        className={styleAddGarmentModal["modal__radio-input"]}
                      />
                      <span>Hot</span>
                    </label>
                    <label
                      htmlFor="warm"
                      className={
                        styleAddGarmentModal[
                          "modal__label modal__label_type_radio"
                        ]
                      }
                    >
                      <input
                        id="warm"
                        type="radio"
                        className={styleAddGarmentModal["modal__radio-input"]}
                      />
                      <span>Warm</span>
                    </label>
                    <label
                      htmlFor="cold"
                      className={
                        styleAddGarmentModal[
                          "modal__label modal__label_type_radio"
                        ]
                      }
                    >
                      <input
                        id="cold"
                        type="radio"
                        className={styleAddGarmentModal["modal__radio-input"]}
                      />
                      <span>Cold</span>
                    </label>
                  </legend>
                </fieldset>
              </ModalWithForm> */}
                  <RegisterModal
                    isOpen={isOpen("register-modal")}
                    onSignUp={onSignUp}
                    altButtonText="or Log In"
                    handleAltButton={onLogin}
                  ></RegisterModal>
                </div>
              </div>
            </IsLoggedInContext.Provider>
          </GameFilterContextProvider>
        </CurrentUserContext.Provider>
      </GameLibraryContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
