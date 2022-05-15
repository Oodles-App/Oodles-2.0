import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;

const SET_PROFILE = "SET_PROFILE";

//TODO: call setProfile with empty object when user leaves editProfile page
export const setProfile = (profile) => {
  return {
    type: SET_PROFILE,
    profile,
  };
};

//TODO: an use something similar for fetching profile for single page view and use same redux reducer
export const fetchEditProfile = (user) => {
  return async (dispatch) => {
    try {
      const profile = await fetchWrapper.get(`${baseUrl}/${user.id}`, user);
      dispatch(setProfile(profile));
    } catch (error) {
      console.error(error);
      dispatch(
        setProfile({ error: { message: error.message, id: error.status } })
      );
    }
  };
};

export const updateUser = (user, newProfile) => {
  return async (dispatch) => {
    try {
      const updatedUser = await fetchWrapper.put(
        `${baseUrl}/${user.id}`,
        user,
        newProfile
      );
      console.log(updatedUser, "updated user redux");
      dispatch(setProfile(updatedUser));
    } catch (error) {
      console.log(error); //TODO: replace with better error handling
    }
  };
};

export default function profileReducer(profile = {}, action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.profile;
    default:
      return profile;
  }
}
