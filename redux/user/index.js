import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
import { BehaviorSubject } from "rxjs";
import Router from "next/router";

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

export const logout = () => {
  localStorage.removeItem("user");
  userSubject.next(null);
  Router.push("/account/login");
  return {
    type: SET_USER,
    user: {},
  };
};

//THUNKS
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      const user = await fetchWrapper.post(`${baseUrl}/authenticate`, {
        email,
        password,
      });
      console.log(user, "user after log in thunk");
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
    } catch (error) {
      //if user tries to log in with invalid credentials user object with have a key 'error' with error message
      dispatch(setUser({ error }));
    }
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    try {
      const { email, password } = user;
      const newUser = await fetchWrapper.post(`${baseUrl}/register`, user);
      dispatch(login(email, password));
    } catch (error) {
      //if user tries to sign up with invalid credentials user object with have a key 'error' with error message
      dispatch(setUser({ error }));
    }
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
