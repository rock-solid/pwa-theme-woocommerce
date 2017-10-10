import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import sideMenuVisible from './components/NavBar/reducer';

import categories from './views/Categories/reducer';
import products from './views/Products/reducer';
import reviews from './components/Reviews/reducer';
import cart from './views/Cart/reducer';

const history = createHistory();

const defaultState = {
  categories: {
    items: [],
    isFetching: 0,
  },
  products: {
    items: [],
    isFetching: 0,
  },
  reviews: {
    items: [],
    isFetching: 0,
  },
  cart: {
    items: [],
  },
};

const rootReducer = combineReducers({ sideMenuVisible, categories, products, reviews, cart });

const store = createStore(rootReducer, defaultState, applyMiddleware(thunk, logger, routerMiddleware(history)));

export { history };
export default store;
