import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
import { async, BehaviorSubject } from "rxjs";
import Router from "next/router";
import { useDispatch } from "react-redux";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

const userSubject = new BehaviorSubject(
  typeof window === undefined && JSON.parse(localStorage.getItem("user"))
);

//ACTION TYPES
const SET_USER = "SET_USER";

//ACTION CREATORS
const setUser = (user) => {
  return { type: SET_USER, user };
};

//THUNKS
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
        email,
        password,
      });
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
    } catch (error) {
      //if user tries to log in with invalid credentials user object with have a key 'error' with error message
      dispatch(setUser({ error }));
    }
  };
};

export const register = () => {
  // TODO: add register thunk here
  // (then call log-in: stretch goal for logging in and redirecting users automatically to edit profile view)
};

export const logout = () => {
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
  return {
    type: SET_USER,
    user: {},
  };
};

//REDUCER
export default function userReducer(user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return user;
  }
}
