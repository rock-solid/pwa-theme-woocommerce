import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createTransform, persistStore, autoRehydrate } from 'redux-persist';
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
  sideMenuVisible: false,
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

const skipIsFetchingTransform = createTransform((inboundState, key) => {
  if (key !== 'products' && key !== 'categories' && key !== 'reviews') return inboundState;
  return {
    ...inboundState,
    isFetching: undefined,
  };
});

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk, logger, routerMiddleware(history)), autoRehydrate()));

persistStore(store, { blacklist: ['sideMenuVisible'], transforms: [skipIsFetchingTransform] });

export { history };
export default store;
