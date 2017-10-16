import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { REQUEST_PRODUCTS, RECEIVE_PRODUCTS } from './actions';

export const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    }),
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  average_rating: PropTypes.string.isRequired,
  rating_count: PropTypes.number.isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_PRODUCTS:
    return state;
  case RECEIVE_PRODUCTS:
    if (Array.isArray(action.products)) {
      return _.unionBy(state, action.products, 'id');
    }
    return _.unionBy(state, [action.products], 'id');
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
