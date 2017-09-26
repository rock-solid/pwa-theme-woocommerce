import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES';
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

export const requestCategories = () => ({
  type: REQUEST_CATEGORIES,
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories,
});

export const fetchCategories = (dispatch) => {
  dispatch(requestCategories());

  return fetch(config.API_CATEGORIES_URL)
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(json)))
    .catch(() => {
      dispatch(receiveCategories([]));
    });
};
