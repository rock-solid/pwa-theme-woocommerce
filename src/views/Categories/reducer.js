import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { REQUEST_CATEGORIES, RECEIVE_CATEGORIES } from './actions';

export const categoryPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([
    null,
    PropTypes.array,
    PropTypes.shape({
      src: PropTypes.string,
    }),
  ]),
});

const items = (state = [], action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return state;
  case RECEIVE_CATEGORIES:
    return _.unionBy(action.categories, state, 'id');
  default:
    return state;
  }
};

const isFetching = (state = 0, action) => {
  switch (action.type) {
  case REQUEST_CATEGORIES:
    return state + 1;
  case RECEIVE_CATEGORIES:
    return state - 1;
  default:
    return state;
  }
};

export const getCategories = state => state.items;
export const getCategoriesFetching = state => state.isFetching;

export default combineReducers({
  items,
  isFetching,
});
