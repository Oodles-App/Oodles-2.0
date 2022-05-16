import { applyMiddleware, combineReducers, createStore } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "@redux-devtools/extension";
import { createWrapper } from "next-redux-wrapper";

import userReducer from "../user";
import alertsReducer from "../alerts";
import profileReducer from "../profile";
import tagsReducer from "../tags";

const persistConfig = {
  key: "root",
  whitelist: ["user"],
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  alerts: alertsReducer,
  profile: profileReducer,
  tags: tagsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middleware
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

export const store = createStore(persistedReducer, middleware);

const Persistor = persistStore(store);

// assigning store to next wrapper
const makeStore = () => store;

export { Persistor };
export const wrapper = createWrapper(makeStore);
