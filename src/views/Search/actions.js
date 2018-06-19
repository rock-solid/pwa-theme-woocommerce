import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_SEARCH_PRODUCTS = 'REQUEST_SEARCH_PRODUCTS';
export const RECEIVE_SEARCH_PRODUCTS = 'RECEIVE_SEARCH_PRODUCTS';
export const RESET_SEARCH_PRODUCTS = 'RESET_SEARCH_PRODUCTS';

export const requestSearchProducts = () => ({
  type: REQUEST_SEARCH_PRODUCTS,
});

export const receiveSearchProducts = products => ({
  type: RECEIVE_SEARCH_PRODUCTS,
  products,
});

export const resetSearchProducts = () => ({
  type: RESET_SEARCH_PRODUCTS,
});

export const fetchProducts = (params = {}) => (dispatch) => {
  dispatch(requestSearchProducts());

  let url;
  if (params && params.id) {
    url = config.API_PRODUCT_URL + String(params.id);
  } else {
    url =
      config.API_PRODUCTS_URL +
      '?' +
      Object.keys(params)
        .map(k => k + '=' + encodeURIComponent(params[k]))
        .join('&');
  }

  return fetch(url)
    .then(response => response.json())
    .then((json) => {
      dispatch(receiveSearchProducts(json));
    })
    .catch(() => {
      dispatch(receiveSearchProducts([]));
    });
};
