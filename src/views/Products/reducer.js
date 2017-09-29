import { combineReducers } from 'redux';
import _ from 'lodash';
import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from './actions';

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_PRODUCTS:
    return state;
  case RECEIVE_PRODUCTS:
    return _.unionBy(state, action.categoryProducts, 'id');
  default:
    return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
  case REQUEST_PRODUCTS:
    return state + 1;
  case RECEIVE_PRODUCTS:
    return state - 1;
  default:
    return state;
  }
};

export const getProducts = state => state.items;
export const getProductsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
