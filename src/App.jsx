import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import Api from "./utils/api.js";
import { getToken } from "./utils/token.js";

import { apiInfo } from "./utils/constants.js";
import { AppContext } from "./contexts/AppContext.jsx";
import { GameLibraryContext } from "./contexts/GameLibraryContext.jsx";
import { CurrentUserContext } from "./contexts/CurrentUserContext.jsx";
import { IsLoggedInContext } from "./contexts/IsLoggedInContext.jsx";
import { GameFilterContext } from "./contexts/GameFilterContext.jsx";

import { useGameFilters } from "./hooks/useGameFilter.jsx";
import { useGameLibrary } from "./hooks/useGameLibrary.jsx";
import { useModal } from "./hooks/useModal.jsx";
import { useUserManager } from "./hooks/useUserManager.jsx";
import useApi from "./hooks/useApi.jsx";

import Header from "./components/App/Header/Header";
import Main from "./components/App/Main/Main";
import Profile from "./components/App/Profile/Profile.jsx";
import Footer from "./components/App/Footer/Footer";

import FilterModal from "./components/App/FilterModal/FilterModal";
import RegisterModal from "./components/App/RegisterModal/RegisterModal.jsx";
import LoginModal from "./components/App/LoginModal/LoginModal.jsx";
import ItemModal from "./components/App/ItemModal/ItemModal.jsx";
import ProfileModal from "./components/App/ProfileModal/ProfileModal.jsx";

const api = new Api(apiInfo.baseUrl);

function App() {
  const [filteredGames, setFilteredGames] = useState([]);
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
    filterState,
    isFilterActive,
    isOptionActive,
    onFilterOptionClick,
    resetFilters,
    getActiveFilterOptions,
    getAllActiveFilterOptions,
    getFilterTitle,
    filterCount,
    getActiveFilterCount,
    setFilterMode,
    filterGames,
    customFilter,
  } = useGameFilters();

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
    handleRequests(getGames(), [initializeLibrary, setFilteredGames]);
  }, []);

  // useEffect(() => {
  //   setSearchedGameLibrary(gameLibrary);
  // }, [gameLibrary]);

  //whenever the filters or the base game library data changes, re filter the games
  useEffect(() => {
    console.log("Set filtered games triggered");
    setFilteredGames(filterGames(gameLibrary));
  }, [filterState, gameLibrary]);

  useEffect(() => {
    libraryUserPrefsDecorator(currentUser);
  }, [currentUser]);

  const onSignUp = ({ name, email, avatar, password }) => {
    const user = { name, email, avatar, password };
    handleRequest(handleSignUp(user));
  };

  const onLogin = ({ email, password }) => {
    const user = { email, password };
    return handleRequests(signIn(user), [handleUserLogin, closeActiveModal]);
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

  const onFilterClick = (filter) => {
    activeFilter === filter ? setActiveFilter("") : setActiveFilter(filter);
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

  const onItemClick = (item) => {
    setCurrentItem(item);
    setActiveModal("item-modal");
  };

  const onFilterModalClick = () => {
    setActiveModal("filter-modal");
  };

  const pageAnimationVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <AppContext.Provider
      value={{ closeActiveModal, isLoading, setActiveModal }}
    >
      <GameLibraryContext.Provider value={{ filteredGames }}>
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
          <GameFilterContext.Provider
            value={{
              filterState,
              isFilterActive,
              isOptionActive,
              onFilterOptionClick,
              resetFilters,
              getActiveFilterOptions,
              getAllActiveFilterOptions,
              getFilterTitle,
              filterCount,
              getActiveFilterCount,
              setFilterMode,
              filterGames,
              customFilter,
            }}
          >
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
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Main
                          onItemClick={onItemClick}
                          onFilterModalClick={onFilterModalClick}
                          pageAnimationVariants={pageAnimationVariants}
                        />
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <Profile
                          onItemClick={onItemClick}
                          onFilterModalClick={onFilterModalClick}
                          pageAnimationVariants={pageAnimationVariants}
                        />
                      }
                    />
                  </Routes>
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
          </GameFilterContext.Provider>
        </CurrentUserContext.Provider>
      </GameLibraryContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
