import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_REVIEWS = 'REQUEST_REVIEWS';
export const RECEIVE_REVIEWS = 'RECEIVE_REVIEWS';

export const requestReviews = () => ({
  type: REQUEST_REVIEWS,
});

export const receiveReviews = (reviews, productId) => ({
  type: RECEIVE_REVIEWS,
  reviews,
  productId,
});

export const fetchReviews = productId => (dispatch) => {
  dispatch(requestReviews());

  return fetch(config.API_REVIEWS_URL + productId)
    .then(response => response.json())
    .then(json => dispatch(receiveReviews(json, productId)))
    .catch(() => {
      dispatch(receiveReviews([], productId));
    });
};
