import { useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token.js";
import { nullUser } from "../utils/constants.js";

export const useUserManager = (api) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userLikedGames, setUserLikedGames] = useState([]);
  const [userPlayedGames, setUserPlayedGames] = useState([]);
  const [userWantedGames, setUserWantedGames] = useState([]);

  const handleUserLogin = (res) => {
    console.log("Logging in user", res);
    const user = createUser(res);
    if (user && res.token) {
      setCurrentUser(user);
      if (res.likedGames) setUserLikedGames(res.likedGames);
      if (res.playedGames) setUserPlayedGames(res.playedGames);
      if (res.wantedGames) setUserWantedGames(res.wantedGames);
      setToken(res.token);
      setIsLoggedIn(true);
      return currentUser;
    } else {
      console.error(
        "Unable to set current user. User or token not in response."
      );
      return undefined;
    }
  };

  const updateUserLikedGames = (res) => {
    setUserLikedGames(res.user.likedGames);
    return userLikedGames;
  };

  const updateUserPlayedGames = (res) => {
    setUserPlayedGames(res.user.playedGames);
    return userPlayedGames;
  };

  const updateUserWantedGames = (res) => {
    setUserWantedGames(res.user.wantedGames);
    return userWantedGames;
  };

  const handleSignUp = ({ name, email, avatar, password }) => {
    const user = { name, email, avatar, password };
    const request = () => {
      return api.addUser(user).then((res) => {
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        setToken(res.token);
      });
    };
    return request;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(nullUser);
    setUserLikedGames([]);
    setUserPlayedGames([]);
    setUserWantedGames([]);
    removeToken();
  };

  const handleEditProfile = ({ name, avatar }) => {
    const request = () => {
      api.editUser({ name, avatar, token: getToken() }).then((res) => {
        setCurrentUser(res.user);
      });
    };
    return request;
  };

  const userLikesGame = (game) => {
    return userLikedGames.includes(game._id);
  };

  const userWantsGame = (game) => {
    return userWantedGames.includes(game._id);
  };

  const userPlayedGame = (game) => {
    return userPlayedGames.includes(game._id);
  };

  const userNotPlayedGame = (game) => {
    return !userPlayedGames.includes(game._id);
  };

  const createUser = (res) => {
    if (res.name && res.email) {
      const user = {
        name: res.name,
        email: res.email,
      };
      return user;
    }
    console.log("Unable to create user. Response does not fully define.", res);
    return undefined;
  };

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;
    api
      .getUserInfo(jwt)
      .then((res) => {
        // console.log("Use effect res", res);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        res.user.likedGames
          ? setUserLikedGames(res.user.likedGames)
          : setUserLikedGames([]);
        res.user.playedGames
          ? setUserPlayedGames(res.user.playedGames)
          : setUserPlayedGames([]);
        res.user.wantedGames
          ? setUserWantedGames(res.user.wantedGames)
          : setUserWantedGames([]);
      })
      .catch(console.error);
  }, []);

  return {
    updateUserWantedGames,
    userWantedGames,
    setUserWantedGames,
    userWantsGame,
    updateUserPlayedGames,
    updateUserLikedGames,
    userPlayedGame,
    userNotPlayedGame,
    userPlayedGames,
    userLikesGame,
    handleUserLogin,
    handleSignUp,
    userLikedGames,
    isLoggedIn,
    currentUser,
    setIsLoggedIn,
    setCurrentUser,
    handleLogout,
    handleEditProfile,
  };
};
