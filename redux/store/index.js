import { configureStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";
import userReducer from "../user";

const rootReducer = combineReducers({
  user: userReducer,
});

// middleware
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// creating store
export const store = configureStore(rootReducer, middleware);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
