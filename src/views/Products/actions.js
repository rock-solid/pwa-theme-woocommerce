import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const REQUEST_SEARCH_PRODUCTS = 'REQUEST_SEARCH_PRODUCTS';
export const RECEIVE_SEARCH_PRODUCTS = 'RECEIVE_SEARCH_PRODUCTS';

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
});

export const requestSearchProducts = search => ({
  type: REQUEST_SEARCH_PRODUCTS,
  search,
});

export const receiveSearchProducts = products => ({
  type: RECEIVE_SEARCH_PRODUCTS,
  products,
});

export const fetchProducts = (params = {}) => (dispatch) => {
  if (params.search) {
    dispatch(requestSearchProducts(params.search));
  } else {
    dispatch(requestProducts());
  }

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
      if (params.search) {
        dispatch(receiveSearchProducts(json));
      } else {
        dispatch(receiveProducts(json));
      }
    })
    .catch(() => {
      if (params.search) {
        dispatch(receiveSearchProducts([]));
      } else {
        dispatch(receiveProducts([]));
      }
    });
};
