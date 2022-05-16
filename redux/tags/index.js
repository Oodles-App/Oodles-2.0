import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/tags`;

//ACTION TYPES
const SET_TAGS = "GET_TAGS";

//ACTION CREATORS
const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags,
  };
};

//THUNKS
export const fetchTags = (auth) => {
  return async function (dispatch) {
    const tags = await fetchWrapper.get(baseUrl, auth);
    dispatch(setTags(tags));
  };
};

//REDUCER
export default function tagsReducer(tags = [], action) {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    default:
      return tags;
  }
}
