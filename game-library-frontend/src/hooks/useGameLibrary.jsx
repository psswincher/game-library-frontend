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
    console.log("initializing library", rawGameData);
    const gameData = rawGameData.data;
    const hash = {};
    gameData.forEach((game, index) => {
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
    console.log(libraryHash);
    return gameData;
  };

  //TO DO;
  const libraryUserPrefsDecorator = (user) => {
    console.log("User prefs decorator called");
    console.log(user);
  };

  const getGame = (gameId) => {
    if (libraryHash[gameId]) {
      return gameLibrary[libraryHash[gameId]];
    } else {
      console.log(`Can't getGame, id ${gameId} is not in library.`);
    }
  };

  const updateLibraryGamePlayed = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Has Played"] = true;

    setGameLibrary(updatedLibrary);
  };

  const updateLibraryGameLiked = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Likes"] = true;

    setGameLibrary(updatedLibrary);
  };

  const updateLibraryGameWanted = (game) => {
    const updatedLibrary = [...gameLibrary];
    updatedLibrary[libraryHash[game._id]].attributes["Wants to Play"] = true;

    setGameLibrary(updatedLibrary);
  };
  const removeUserWantRequest = (game) => {
    const updatedLibrary = [...gameLibrary];
    console.log("removewantreq:", game);
    console.log(libraryHash);
    console.log(libraryHash[game._id]);
    console.log(updatedLibrary[libraryHash[game._id]]);
    updatedLibrary[libraryHash[game._id]].attributes["Wants to Play"] = false;

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
