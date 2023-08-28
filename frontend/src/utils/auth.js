export const BASE_URL = "https://api.annatin.nomoredomainsicu.ru";

const handleResponse = (response) =>
  response.ok ? response.json() : Promise.reject(`Error: ${response.status}`);

export function register(data) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function authorize(data) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include"
  }).then(handleResponse);
}

export function logout() {
  return fetch(`${BASE_URL}/signout`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
  })
}
