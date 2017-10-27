import { combineReducers } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { REQUEST_VARIATIONS, RECEIVE_VARIATIONS } from './actions';

export const variationPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      option: PropTypes.string.isRequired,
    }),
  ),
});

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_VARIATIONS:
    return state;
  case RECEIVE_VARIATIONS:
    return _.unionBy(state, action.variations, 'id');
  default:
    return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
  case REQUEST_VARIATIONS:
    return state + 1;
  case RECEIVE_VARIATIONS:
    return state - 1;
  default:
    return state;
  }
};

export const getVariations = state => state.items;
export const getVariationsFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
