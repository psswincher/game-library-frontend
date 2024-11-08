export default class Api {
    constructor(baseUrl) {
      this._baseUrl = baseUrl;
    }
  
    _handleRequest(url, headers) {
      return fetch(url, headers).then(this._checkResponse);
    }
  
    _checkResponse(res) {
      if (res.ok) {
        console.log(res);
        return res.json();
      }
      return Promise.reject(`API request Error: ${res.status}`);
    }
  
    getGames() {
      return this._handleRequest(`${this._baseUrl}games`);
    }
  
    getUserInfo = (token) => {
      return this._handleRequest(`${this._baseUrl}users/me`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    };
  
    editUser({ name, avatar, token }) {
      const user = { name, avatar };
      return this._handleRequest(`${this._baseUrl}users/me`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });
    }
  
    addUser({ name, avatar, email, password }) {
      return this._handleRequest(`${this._baseUrl}signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          avatar,
          email,
          password,
        }),
      });
    }
  
    signIn({ email, password }) {
      return this._handleRequest(`${this._baseUrl}signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    }
  
    addItem({ item, token }) {
      return this._handleRequest(`${this._baseUrl}items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: item.name,
          imageUrl: item.imageUrl,
          weather: item.weather,
        }),
      });
    }
  
    deleteItem({ id, token }) {
      return this._handleRequest(`${this._baseUrl}items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    addCardLike(id, token) {
      return this._handleRequest(`${this._baseUrl}items/${id}/likes`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  
    removeCardLike(id, token) {
      return this._handleRequest(`${this._baseUrl}items/${id}/likes`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
  