import { fetchWrapper } from "../../helpers";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

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
      dispatch(setUser(user));
    } catch (err) {}
    dispatch(setUser);
  };
};

export const authenticate = () => {
  //move authenticate function here
};

export const logout = () => {
  //move logout function from user services here
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
