import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";
import { BehaviorSubject } from "rxjs";
import Router from "next/router";
import { createAlert } from "../alerts/index";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

const userSubject = new BehaviorSubject(
  typeof window === undefined && JSON.parse(localStorage.getItem("user"))
);

//ACTION TYPES
const SET_USER = "SET_USER";

//ACTION CREATORS
export const setUser = (user) => {
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
      const user = await fetchWrapper.post(`/api/users/authenticate`, {
        email,
        password,
      });
      userSubject.next(user);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(setUser(user));
    } catch (error) {
      dispatch(
        createAlert({
          message: error.message,
          key: new Date().getTime(),
        })
      );
    }
  };
};

export const postUser = (user) => {
  return async (dispatch) => {
    try {
      const { email, password } = user;
      const newUser = await fetchWrapper.post(`/api/users/register`, user);
      dispatch(login(email, password));
      dispatch(
        createAlert({
          message: "Registration successful.",
          keepAfterRouteChange: true,
        })
      );
      Router.push("/account/edit-profile");
    } catch (error) {
      dispatch(
        createAlert({ message: error.message, key: new Date().getTime() })
      );
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
