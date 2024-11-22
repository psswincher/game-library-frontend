import { useState, useEffect } from "react";

import "./App.css";
import Header from "./components/App/Header/Header";
import Main from "./components/App/Main/Main";
import Footer from "./components/App/Footer/Footer";
import FilterModal from "./components/App/FilterModal/FilterModal";
import Api from "./utils/api.js";
import { apiInfo } from "./utils/constants.js";
import { AppContext } from "./contexts/AppContext.jsx";
import { GameLibraryContext } from "./contexts/GameLibraryContext.jsx";
import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";
import { GameFilterContextProvider } from "./hooks/useGameFilter.jsx";
import { IsLoggedInContext } from "./contexts/IsLoggedInContext.jsx";
import RegisterModal from "./components/App/RegisterModal/RegisterModal.jsx";
import LoginModal from "./components/App/LoginModal/LoginModal.jsx";
import { useGameLibrary } from "./hooks/useGameLibrary.jsx";
import useApi from "./hooks/useApi.jsx";
import { useUserManager } from "./hooks/useUserManager.jsx";
import { useModal } from "./hooks/useModal.jsx";
import { getToken, setToken } from "./utils/token.js";

import ProfileModal from "./components/App/ProfileModal/ProfileModal.jsx";
const api = new Api(apiInfo.baseUrl);

function App() {
  const [userProfileVisible, setUserProfileVisible] = useState(false);
  const [searchedGameLibrary, setSearchedGameLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");

  const {
    gameLibrary,
    setGameLibrary,
    initializeLibrary,
    updateLibraryGameWanted,
    updateLibraryGamePlayed,
    updateLibraryGameLiked,
  } = useGameLibrary();

  const {
    getGames,
    addUserWantGame,
    removeUserWantGame,
    removeUserPlayedGame,
    addUserPlayedGame,
    addUserLikedGame,
    removeUserLikedGame,
  } = useApi(apiInfo.baseUrl);

  const {
    handleSignUp,
    userLikesGame,
    handleLogin,
    userPlayedGame,
    userPlayedGames,
    isLoggedIn,
    currentUser,
    handleLogout,
    userLikedGames,
    userWantsGame,
    userWantedGames,
    updateUserWantedGames,
    updateUserLikedGames,
    updateUserPlayedGames,
  } = useUserManager(api);

  const { isOpen, setActiveModal, closeActiveModal } = useModal();

  useEffect(() => {
    handleRequests(getGames(), [initializeLibrary]);
  }, []);

  useEffect(() => {
    setSearchedGameLibrary(gameLibrary);
  }, [gameLibrary]);

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

  const handleRequest = (request, callbacks = []) => {
    request()
      .then((response) => {
        callbacks.forEach((callback) => callback(response));
      })
      .catch(console.error);
  };

  function handleRequests(apiCall, resultHandlers = [], otherHandlers = []) {
    setIsLoading(true);
    apiCall()
      .then((result) => {
        if (resultHandlers.length > 0) {
          resultHandlers.forEach((fn) => fn(result));
        }

        if (otherHandlers.length > 0) {
          otherHandlers.forEach((fn) => fn());
        }
      })
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const onLikeGameClick = (game) => {
    if (userLikesGame(game)) {
      return handleRequests(
        removeUserLikedGame({ gameId: game._id, token: getToken() }),
        [updateUserLikedGames],
        [() => updateLibraryGameLiked(game)]
      );
    } else {
      return handleRequests(
        addUserLikedGame({ gameId: game._id, token: getToken() }),
        [updateUserLikedGames],
        [() => updateLibraryGameLiked(game)]
      );
    }
  };

  const onPlayedGameClick = (game) => {
    if (userPlayedGame(game)) {
      return handleRequests(
        removeUserPlayedGame({ gameId: game._id, token: getToken() }),
        [updateUserPlayedGames],
        [() => updateLibraryGamePlayed(game)]
      );
    } else {
      return handleRequests(
        addUserPlayedGame({ gameId: game._id, token: getToken() }),
        [updateUserPlayedGames],
        [() => updateLibraryGamePlayed(game)]
      );
    }
  };
  //BOOM! We have decoupled user management, game library management, and API call
  //while staying dry by wrapping them in a shared function that handles errors etc
  const onWantsGameClick = (game) => {
    if (userWantsGame(game)) {
      return handleRequests(
        removeUserWantGame({ gameId: game._id, token: getToken() }),
        [updateUserWantedGames],
        [() => updateLibraryGameWanted(game)]
      );
    } else {
      return handleRequests(
        addUserWantGame({ gameId: game._id, token: getToken() }),
        [updateUserWantedGames],
        [() => updateLibraryGameWanted(game)]
      );
    }
  };

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
                  onFilterClick={onFilterClick}
                  activeFilter={activeFilter}
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
