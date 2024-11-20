import { useEffect, useState } from "react";
import { getToken, setToken, removeToken } from "../utils/token.js";
import { nullUser } from "../utils/constants.js";

export const useUserManager = (api) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userLikedGames, setUserLikedGames] = useState([]);
  const [userPlayedGames, setUserPlayedGames] = useState([]);
  const [userWantedGames, setUserWantedGames] = useState([]);

  const handleLogin = ({ email, password }) => {
    const user = { email, password };

    const request = () => {
      return api.signIn(user).then((res) => {
        setCurrentUser(res.user);
        setIsLoggedIn(true);
        setToken(res.token);
        console.log("User logged in", res.name);
      });
    };
    return request;
  };

  const handlePlayedGame = ({ gameId }) => {
    const request = () => {
      return api
        .addUserPlayedGame({
          gameId: gameId,
          token: getToken(),
        })
        .then((res) => {
          setUserPlayedGames(res.user.playedGames);
        });
    };
    return request;
  };
  const handleUnplayedGame = ({ gameId }) => {
    const request = () => {
      return api
        .removeUserPlayedGame({
          gameId: gameId,
          token: getToken(),
        })
        .then((res) => {
          setUserPlayedGames(res.user.playedGames);
        });
    };
    return request;
  };

  const handleLikeGame = ({ gameId }) => {
    const request = () => {
      return api
        .addUserLikedGame({
          gameId: gameId,
          token: getToken(),
        })
        .then((res) => {
          console.log("handeLike res", res);
          setUserLikedGames(res.user.likedGames);
        });
    };
    return request;
  };
  const handleUnlikeGame = ({ gameId }) => {
    const request = () => {
      return api
        .removeUserLikedGame({
          gameId: gameId,
          token: getToken(),
        })
        .then((res) => {
          console.log("handleUnlike res", res);
          setUserLikedGames(res.user.likedGames);
        });
    };
    return request;
  };

  const handleWantGame = ({ gameId }) => {
    const request = () => {
      return api
        .addUserWantGame({
          gameId: gameId,
          token: getToken(),
        })
        .then((res) => {
          setUserWantedGames(res.user.wantedGames);
        });
    };
    return request;
  };
  const handleUnwantGame = ({ gameId }) => {
    const request = () => {
      return api
        .removeUserWantGame({
          gameId: gameId,
          token: getToken(),
        })
        .then((res) => {
          setUserWantedGames(res.user.wantedGames);
        });
    };
    return request;
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

  useEffect(() => {
    const jwt = getToken();
    if (!jwt) return;
    api
      .getUserInfo(jwt)
      .then((res) => {
        console.log("Use effect res", res);
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
    handleWantGame,
    handleUnwantGame,
    userWantedGames,
    setUserWantedGames,
    userWantsGame,
    handlePlayedGame,
    handleUnplayedGame,
    userPlayedGame,
    userPlayedGames,
    userLikesGame,
    handleSignUp,
    handleLogin,
    handleLikeGame,
    handleUnlikeGame,
    userLikedGames,
    isLoggedIn,
    currentUser,
    setIsLoggedIn,
    setCurrentUser,
    handleLogout,
    handleEditProfile,
  };
};
