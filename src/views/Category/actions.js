import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_CATEGORY_PRODUCTS = 'REQUEST_CATEGORY_PRODUCTS';
export const RECEIVE_CATEGORY_PRODUCTS = 'RECEIVE_CATEGORY_PRODUCTS';

export const requestCategoryProducts = () => ({
  type: REQUEST_CATEGORY_PRODUCTS,
});

export const receiveCategoryProducts = categoryProducts => ({
  type: RECEIVE_CATEGORY_PRODUCTS,
  categoryProducts,
});

export const fetchCategoryProducts = id => (dispatch) => {
  dispatch(requestCategoryProducts());

  const url = config.API_CATEGORY_PRODUCTS_URL + '/' + id;

  return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveCategoryProducts(json)))
    .catch(() => {
      dispatch(receiveCategoryProducts([]));
    });
};
