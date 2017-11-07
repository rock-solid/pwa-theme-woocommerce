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
  variationId: PropTypes.number,
  selections: PropTypes.object,
});

const items = (state = [], action) => {
  switch (action.type) {
  case ADD_PRODUCT: {
    let product = null;
    if (!_.isNil(action.variationId)) {
      product = _.find(state, { id: action.id, variationId: action.variationId });
    } else {
      product = _.find(state, { id: action.id });
    }

    let newProduct = null;
    if (!_.isNil(product)) {
      newProduct = Object.assign({}, product);
      newProduct.quantity += 1;
    } else {
      newProduct = {
        id: action.id,
        price: action.price,
        name: action.name,
        image: action.image,
        quantity: 1,
      };

      if (!_.isNil(action.variationId)) {
        newProduct.variationId = action.variationId;
        newProduct.selections = action.selections;
      }
    }

    return _.unionBy([newProduct], state, !_.isNil(action.variationId) ? 'variationId' : 'id');
  }
  case REMOVE_PRODUCT:
    if (!_.isNil(action.variationId)) {
      return state.filter(item => item.variationId !== action.variationId);
    }
    return state.filter(item => item.id !== action.id);

  case SET_QUANTITY:
    if (!_.isNil(action.variationId)) {
      return state.map((obj) => {
        if (obj.id === action.id && obj.variationId === action.variationId) {
          return Object.assign({}, obj, {
            quantity: action.quantity,
          });
        }
        return obj;
      });
    }

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
