import { useCallback } from "react";

const useApi = (baseUrl) => {
  const handleRequest = useCallback(
    (url, options = {}) =>
      () => {
        return fetch(url, options).then((res) => {
          if (!res.ok) {
            return Promise.reject(`API request Error: ${res.status}`);
          }
          //   console.log(res.json());
          return res.json();
        });
      },
    []
  );

  const getGames = () => handleRequest(`${baseUrl}games`);

  const getUserInfo = (token) =>
    handleRequest(`${baseUrl}users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

  const editUser = ({ name, avatar, token }) =>
    handleRequest(`${baseUrl}users/me`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, avatar }),
    });

  const addUserLikedGame = ({ token, gameId }) =>
    handleRequest(`${baseUrl}users/me/likeGame`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId }),
    });

  const removeUserLikedGame = ({ token, gameId }) =>
    handleRequest(`${baseUrl}users/me/unlikeGame`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId }),
    });

  const addUserPlayedGame = ({ token, gameId }) =>
    handleRequest(`${baseUrl}users/me/playedGame`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId }),
    });

  const removeUserPlayedGame = ({ token, gameId }) =>
    handleRequest(`${baseUrl}users/me/unplayedGame`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId }),
    });

  const addUserWantGame = ({ token, gameId }) =>
    handleRequest(`${baseUrl}users/me/wantedGame`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId }),
    });

  const removeUserWantGame = ({ token, gameId }) =>
    handleRequest(`${baseUrl}users/me/unwantedGame`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ gameId }),
    });

  const signIn = ({ email, password }) =>
    handleRequest(`${baseUrl}signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

  return {
    getGames,
    signIn,
    getUserInfo,
    editUser,
    addUserLikedGame,
    removeUserLikedGame,
    addUserWantGame,
    removeUserWantGame,
    addUserPlayedGame,
    removeUserPlayedGame,
  };
};

export default useApi;
