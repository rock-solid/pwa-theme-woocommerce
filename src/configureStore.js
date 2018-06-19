import { createStore, applyMiddleware } from 'redux';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { reducer as toastrReducer } from 'react-redux-toastr';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import config from './config/config';
import categories from './views/Categories/reducer';
import products from './views/Products/reducer';
import reviews from './components/Reviews/reducer';
import cart from './views/Cart/reducer';
import variations from './components/Variations/reducer';
import sideMenuVisible from './components/NavBar/reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [
    'sideMenuVisible',
    'toastr',
  ],
  // debug: true,
};

const rootReducer = persistCombineReducers(rootPersistConfig, {
  categories: persistReducer(
    {
      key: 'categories',
      storage,
      blacklist: ['isFetching'],
    },
    categories,
  ),
  products: persistReducer(
    {
      key: 'products',
      storage,
      blacklist: ['isFetching'],
    },
    products,
  ),
  reviews: persistReducer(
    {
      key: 'reviews',
      storage,
      blacklist: ['isFetching'],
    },
    reviews,
  ),
  variations: persistReducer(
    {
      key: 'variations',
      storage,
      blacklist: ['isFetching'],
    },
    variations,
  ),
  cart,
  sideMenuVisible,
  toastr: persistReducer(
    {
      key: 'toastr',
      storage,
    },
    toastrReducer,
  ),
});

const history = createHistory();

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(thunk, routerMiddleware(history)),
);

if (config.OFFLINE) {
  persistStore(store);
}

export { history };
export default store;
