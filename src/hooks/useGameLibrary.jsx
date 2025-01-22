//useUserFilters is a decorator that modifies the filters constant.
//when a user is logged in, it adds the preference filter the filters array.
//because all filters work on games, we also need to decorate the gameLibrary object as well?
//and then purge the game library object when a user logs out?

//user preferences: like/unlike game
//creates hash for fast browsing
//updates gameLibrary object with user preferences
//on user log in, maps user preferences to library

import { useState } from "react";
import { filters } from "../utils/constants";

export function useGameLibrary() {
  const [gameLibrary, setGameLibrary] = useState([]);
  const [libraryHash, setLibraryHash] = useState({});

  const initializeLibrary = (rawGameData) => {
    const gameData = rawGameData.data;
    const hash = {};
    gameData.forEach((game, index) => {
      setGameCardInfo(game);
      game.attributes = {};

      hash[game._id] = index;
      filters.forEach((filter) => {
        if (Array.isArray(game[filter.gameKey])) {
          game[filter.gameKey].forEach((option) => {
            game.attributes[option] = true;
          });
        } else {
          game.attributes[game[filter.gameKey]] = true;
        }
      });
    });

    setGameLibrary(gameData);
    setLibraryHash(hash);
    return gameData;
  };

  const setGameCardInfo = (game) => {
    game.cardType = "TextItemCard";
    if (game.isStrongArt === true || game.isFavorite === true)
      game.cardType = "ImageItemCard";
    if (game.isFeatured === true) game.cardType = "HeroItemCard";
    setGameGridRowSpan(game);
    setGameGridColumnSpan(game);
  };

  const setGameGridRowSpan = (game) => {
    game.gridRowSpan =
      game.cardType === "HeroItemCard" || game.cardType === "ImageItemCard"
        ? "span 2"
        : "span 1";
  };

  const setGameGridColumnSpan = (game) => {
    game.gridColumnSpan =
      game.cardType === "HeroItemCard" ? "span 3" : "span 1";
  };

  const libraryUserPrefsDecorator = (user) => {
    console.log("Decorating library with user prefs", user);
    if (!user) {
      return;
    }

    const updatedLibrary = [...gameLibrary];
    if (user.likedGames) {
      user.likedGames.forEach((gameId) => {
        setGamePreference(updatedLibrary, gameId, "Likes", true);
      });
    }

    if (user.playedGames) {
      user.playedGames.forEach((gameId) => {
        setGamePreference(updatedLibrary, gameId, "Has Played", true);
      });
    }

    if (user.wantedGames) {
      user.wantedGames.forEach((gameId) => {
        setGamePreference(updatedLibrary, gameId, "Interested", true);
      });
    }

    setGameLibrary(updatedLibrary);
  };

  const setGamePreference = (updatedLibrary, gameId, preference, state) => {
    if (!isGameInLibrary(gameId)) return;
    updatedLibrary[libraryHash[gameId]].attributes[preference] = state;
  };

  const getGame = (gameId) => {
    if (isGameInLibrary(gameId)) {
      return gameLibrary[libraryHash[gameId]];
    }
  };

  const isGameInLibrary = (gameId) => {
    if (libraryHash[gameId] && gameLibrary[libraryHash[gameId]]) {
      return true;
    } else {
      // console.error("Game not in library:", gameId);
      return false;
    }
  };
  const updateLibraryGamePlayed = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Has Played"] =
      gameLibrary[libraryHash[game._id].attributes?.["Has Played"]] === true
        ? false
        : true;

    setGameLibrary(updatedLibrary);
  };

  const updateLibraryGameLiked = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Likes"] =
      gameLibrary[libraryHash[game._id].attributes?.["Likes"]] === true
        ? false
        : true;

    setGameLibrary(updatedLibrary);
  };

  const updateLibraryGameWanted = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Interested"] =
      updatedLibrary[libraryHash[game._id]].attributes?.["Interested"] === true
        ? false
        : true;

    setGameLibrary(updatedLibrary);
  };
  const removeUserWantRequest = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Interested"] = false;

    setGameLibrary(updatedLibrary);
  };

  return {
    gameLibrary,
    setGameLibrary,
    initializeLibrary,
    getGame,
    updateLibraryGameWanted,
    updateLibraryGamePlayed,
    updateLibraryGameLiked,
    removeUserWantRequest,
    libraryUserPrefsDecorator,
  };
}
