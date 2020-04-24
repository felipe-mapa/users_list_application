import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import authReducer from "../store/reducers/auth";
import usersReducer from "../store/reducers/users";
import snackbarReducer from "../store/reducers/snackbar";


// get data from local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

// save data to local storage
const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    throw error;
  }
};

// combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  snackbar: snackbarReducer,
});

// call loadFromLocalStorage()
const persistedState = loadFromLocalStorage();

// create store
const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

// call saveToLocalStorage
store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
