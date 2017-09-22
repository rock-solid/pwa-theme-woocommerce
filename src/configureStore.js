import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import sideMenuVisible from './views/Home/reducer';

const history = createHistory();

const defaultState = {};

const rootReducer = combineReducers({ sideMenuVisible });

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk, logger, routerMiddleware(history)));

export { history };
export default store;
