class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + `/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + `/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfoByApi(data) {
    return fetch(this._baseUrl + `/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.description,
      }),
    }).then(this._checkResponse);
  }

  handleUserAvatar({avatar}) {
    return fetch(this._baseUrl + `/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({avatar}),
    }).then(this._checkResponse);
  }

  addCard(name, link) {
    return fetch(this._baseUrl + `/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(this._baseUrl + `/cards/${id}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(this._baseUrl + `/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "http://localhost:4000",
  headers: {
   // authorization: "6292d62a-29b0-4b08-9705-e346ec49902c",
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

export { api };
