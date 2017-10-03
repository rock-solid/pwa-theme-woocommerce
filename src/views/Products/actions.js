import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
});

export const fetchProducts = (categId, productId) => (dispatch) => {
  dispatch(requestProducts());

  const url = productId === null ? config.API_CATEGORY_PRODUCTS_URL + categId : config.API_PRODUCT_URL + productId;

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveProducts(json)))
    .catch(() => {
      dispatch(receiveProducts([]));
    });
};
