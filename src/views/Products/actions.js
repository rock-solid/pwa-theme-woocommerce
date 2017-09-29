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

export const fetchProducts = id => (dispatch) => {
  dispatch(requestProducts());

  const url = config.API_CATEGORY_PRODUCTS_URL + '/' + id;

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveProducts(json)))
    .catch(() => {
      dispatch(receiveProducts([]));
    });
};
