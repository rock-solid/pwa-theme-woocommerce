import { combineReducers } from 'redux';
import _ from 'lodash';
import { REQUEST_SEARCH_PRODUCTS, RECEIVE_SEARCH_PRODUCTS, RESET_SEARCH_PRODUCTS } from './actions';

const items = (state = [], action) => {
  switch (action.type) {
    case REQUEST_SEARCH_PRODUCTS:
      return state;
    case RECEIVE_SEARCH_PRODUCTS:
      if (Array.isArray(action.products)) {
        return _.unionBy(action.products, state, 'id');
      }
      return _.unionBy([action.products], state, 'id');
    case RESET_SEARCH_PRODUCTS:
      return [];
    default:
      return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
    case REQUEST_SEARCH_PRODUCTS:
      return state + 1;
    case RECEIVE_SEARCH_PRODUCTS:
      return state - 1;
    case RESET_SEARCH_PRODUCTS:
      return 0;
    default:
      return state;
  }
};

export const getSearchProducts = state => state.items;
export const getSearchProductsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
