import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { REQUEST_REVIEWS, RECEIVE_REVIEWS } from './actions';

export const reviewPropType = PropTypes.shape({
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_REVIEWS:
    return state;
  case RECEIVE_REVIEWS:
    return _.unionBy(state, action.reviews, 'id');
  default:
    return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
  case REQUEST_REVIEWS:
    return state + 1;
  case RECEIVE_REVIEWS:
    return state - 1;
  default:
    return state;
  }
};

export const getReviews = state => state.items;
export const getReviewsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
