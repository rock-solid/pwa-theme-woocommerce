import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import createHistory from "history/createBrowserHistory";
import { routerMiddleware } from "react-router-redux";

// import categories from './reducers/Categories';

const history = createHistory();

const defaultState = {};

const rootReducer = combineReducers({});

const store = createStore(
  rootReducer,
  defaultState,
  applyMiddleware(thunk, logger, routerMiddleware(history))
);

export { history };
export default store;
