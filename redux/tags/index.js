import { fetchWrapper } from "../../helpers";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/tags`;

//ACTION TYPES
const SET_TAGS = "GET_TAGS";
const CREATE_TAG = "CREATE_TAG";

//ACTION CREATORS
const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags,
  };
};

const createTag = (tag) => {
  return {
    type: CREATE_TAG,
    tag,
  };
};

//THUNKS
export const fetchTags = (auth) => {
  return async function (dispatch) {
    const tags = await fetchWrapper.get(baseUrl, auth);
    dispatch(setTags(tags));
  };
};

export const postTag = (tag, auth) => {
  return async function (dispatch) {
    const newTag = await fetchWrapper.post(baseUrl, tag, auth);
    dispatch(createTag(newTag));
  };
};

//REDUCER
export default function tagsReducer(tags = [], action) {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    case CREATE_TAG:
      return [...tags, action.tag];
    default:
      return tags;
  }
}
