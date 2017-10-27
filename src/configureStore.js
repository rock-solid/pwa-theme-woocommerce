import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createTransform, persistStore, autoRehydrate } from 'redux-persist';
import { reducer as toastrReducer } from 'react-redux-toastr';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import sideMenuVisible from './components/NavBar/reducer';

import categories from './views/Categories/reducer';
import products from './views/Products/reducer';
import reviews from './components/Reviews/reducer';
import cart from './views/Cart/reducer';
import variations from './components/Variations/reducer';

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
  variations: {
    items: [],
    isFetching: 0,
  },
  cart: {
    items: [],
  },
};

const rootReducer = combineReducers({ sideMenuVisible, categories, products, reviews, cart, variations, toastr: toastrReducer });

const skipIsFetchingTransform = createTransform((inboundState, key) => {
  if (key !== 'products' && key !== 'categories' && key !== 'reviews' && key !== 'variations') return inboundState;
  return {
    ...inboundState,
    isFetching: undefined,
  };
});

const store = createStore(rootReducer, defaultState, compose(applyMiddleware(thunk, logger, routerMiddleware(history)), autoRehydrate()));

persistStore(store, { blacklist: ['sideMenuVisible', 'toastr', 'reviews'], transforms: [skipIsFetchingTransform] });

export { history };
export default store;
