import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ADD_PRODUCT, SET_QUANTITY, REMOVE_PRODUCT } from './actions';

export const cartProductPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
  case ADD_PRODUCT:
    if (state.length === 0 || !_.find(state, ['id', action.id])) {
      return [
        ...state,
        {
          id: action.id,
          price: action.price,
          name: action.name,
          image: action.image,
          quantity: 1,
        },
      ];
    }

    return state.map((obj) => {
      if (obj.id === action.id) {
        return Object.assign({}, obj, {
          quantity: obj.quantity + 1,
        });
      }
      return obj;
    });

  case REMOVE_PRODUCT:
    return state.filter(item => item.id !== action.id);

  case SET_QUANTITY:
    return state.map((obj) => {
      if (obj.id === action.id) {
        return Object.assign({}, obj, {
          quantity: action.quantity,
        });
      }
      return obj;
    });

  default:
    return state;
  }
};

export const getCart = state => state.items;

export default combineReducers({
  items,
});
