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
import { getToken } from "./utils/token.js";
import ItemModal from "./components/App/ItemModal/ItemModal.jsx";

import ProfileModal from "./components/App/ProfileModal/ProfileModal.jsx";
const api = new Api(apiInfo.baseUrl);

function App() {
  const [searchedGameLibrary, setSearchedGameLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [currentItem, setCurrentItem] = useState({});
  const {
    gameLibrary,
    initializeLibrary,
    updateLibraryGameWanted,
    updateLibraryGamePlayed,
    updateLibraryGameLiked,
    libraryUserPrefsDecorator,
  } = useGameLibrary();

  const {
    getGames,
    addUserWantGame,
    removeUserWantGame,
    removeUserPlayedGame,
    addUserPlayedGame,
    addUserLikedGame,
    removeUserLikedGame,
    signIn,
  } = useApi(apiInfo.baseUrl);

  const {
    handleSignUp,
    userLikesGame,
    userPlayedGame,
    userPlayedGames,
    currentUser,
    isLoggedIn,
    setCurrentUser,
    handleLogout,
    userLikedGames,
    userWantsGame,
    userWantedGames,
    updateUserWantedGames,
    updateUserLikedGames,
    updateUserPlayedGames,
    handleUserLogin,
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
    return handleRequests(signIn(user), [
      handleUserLogin,
      libraryUserPrefsDecorator,
      closeActiveModal,
    ]);
  };

  const onSignUpClick = () => {
    setActiveModal("register-modal");
  };

  const onLoginClick = () => {
    setActiveModal("login-modal");
  };

  const onProfileClick = () => {
    setActiveModal("profile-modal");
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
    setCurrentItem(item);
    setActiveModal("item-modal");
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
            setCurrentUser,
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
                  onFilterModalClick={onFilterModalClick}
                  onSignUpClick={onSignUpClick}
                  onLoginClick={onLoginClick}
                  onFilterClick={onFilterClick}
                  onProfileClick={onProfileClick}
                  activeFilter={activeFilter}
                />
                <div className="page__content">
                  <Main
                    onItemClick={onItemClick}
                    onFilterModalClick={onFilterModalClick}
                  />
                  <Footer />
                  <ItemModal isOpen={isOpen("item-modal")} item={currentItem} />
                  <FilterModal
                    isOpen={isOpen("filter-modal")}
                    onFilterClick={onFilterClick}
                  />
                  <ProfileModal
                    isOpen={isOpen("profile-modal")}
                    handleLogout={handleLogout}
                  />
                  <LoginModal
                    isOpen={isOpen("login-modal")}
                    onLogin={onLogin}
                  />
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
