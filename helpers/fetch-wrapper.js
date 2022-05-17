import getConfig from "next/config";
import { logout } from "../redux/user";
const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
  get,
  post,
  put,
  _delete,
};

function get(url, auth) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(url, auth),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body, auth) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader(url, auth) },
    credentials: "include",
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function put(url, auth, newInfo) {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader(url, auth) },
    body: JSON.stringify(newInfo),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function _delete(url) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(url, auth),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function authHeader(url, auth) {
  // return auth header with jwt if user is logged in and request is to the api url
  const user = auth;
  const isLoggedIn = user && user.token;
  const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
  if (isLoggedIn && isApiUrl) {
    return { Authorization: `Bearer ${user.token}` };
  } else {
    return {};
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      if (
        [401, 403].includes(response.status) &&
        localStorage.getItem("user")
      ) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        logout();
      }

      const error = data || { message: response.statusText };
      return Promise.reject(error);
    }

    return data;
  });
}
