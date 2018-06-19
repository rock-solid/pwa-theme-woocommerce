import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { REQUEST_REVIEWS, RECEIVE_REVIEWS } from './actions';

export const reviewPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  review: PropTypes.string.isRequired,
  product: PropTypes.number.isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
    case REQUEST_REVIEWS:
      return state;
    case RECEIVE_REVIEWS:
      if (action.reviews.length > 0) {
        const reviews = action.reviews.map(obj =>
          Object.assign(obj, { product: action.productId }));
        return _.unionBy(reviews, state, 'id');
      }
      return state;
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

export const getReviews = (state, productId) => state.items.filter(obj => obj.product === productId);
export const getReviewsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
