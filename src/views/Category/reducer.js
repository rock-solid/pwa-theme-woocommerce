import { combineReducers } from 'redux';
import _ from 'lodash';
import { REQUEST_CATEGORY_PRODUCTS, RECEIVE_CATEGORY_PRODUCTS } from './actions';

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_CATEGORY_PRODUCTS:
    return state;
  case RECEIVE_CATEGORY_PRODUCTS:
    return _.unionBy(state, action.categoryProducts, 'id');
  default:
    return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
  case REQUEST_CATEGORY_PRODUCTS:
    return state + 1;
  case RECEIVE_CATEGORY_PRODUCTS:
    return state - 1;
  default:
    return state;
  }
};

export const getCategoryProducts = state => state.items;
export const getCategoryProductsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
