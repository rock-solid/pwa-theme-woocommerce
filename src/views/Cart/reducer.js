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
  dateAdded: PropTypes.string.isRequired,
});

const items = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
      let product = null;
      if (!_.isNil(action.variationId)) {
        product = _.find(state, { id: action.id, variationId: Number(action.variationId) });
      } else {
        product = _.find(state, { id: action.id });
      }

      let newProduct = null;
      if (!_.isNil(product)) {
        newProduct = Object.assign({}, product);
        newProduct.quantity += 1;
      } else {
        const now = new Date();
        newProduct = {
          id: action.id,
          price: action.price,
          name: action.name,
          image: action.image,
          quantity: 1,
          dateAdded: now.toString(),
        };

        if (!_.isNil(action.variationId)) {
          newProduct.variationId = Number(action.variationId);
          newProduct.selections = action.selections;
        }
      }

      return _.unionBy(state, [newProduct], !_.isNil(action.variationId) ? 'variationId' : 'id');
    }
    case REMOVE_PRODUCT:
      if (!_.isNil(action.variationId)) {
        return state.filter(item => item.variationId !== Number(action.variationId));
      }
      return state.filter(item => item.id !== action.id);

    case SET_QUANTITY: {
      let product = null;
      if (!_.isNil(action.variationId)) {
        product = _.find(state, { id: action.id, variationId: Number(action.variationId) });
      } else {
        product = _.find(state, { id: action.id });
      }

      if (!_.isNil(product)) {
        const newProduct = Object.assign({}, product, {
          quantity: action.quantity,
        });

        // Overwrite product with new details
        const cartProducts = _.unionBy([newProduct], state, !_.isNil(action.variationId) ? 'variationId' : 'id');

        // Order cart products by their added date
        return _.orderBy(cartProducts, ['dateAdded'], ['asc']);
      }

      return state;
    }
    default:
      return state;
  }
};

export const getCart = state => state.items;

export default combineReducers({
  items,
});
