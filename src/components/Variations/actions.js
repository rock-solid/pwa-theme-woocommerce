import 'whatwg-fetch';
import config from '../../config/config';

export const REQUEST_VARIATIONS = 'REQUEST_VARIATIONS';
export const RECEIVE_VARIATIONS = 'RECEIVE_VARIATIONS';

export const requestVariations = () => ({
  type: REQUEST_VARIATIONS,
});

export const receiveVariations = variations => ({
  type: RECEIVE_VARIATIONS,
  variations,
});

export const fetchVariations = productId => (dispatch) => {
  dispatch(requestVariations());

  return fetch(config.API_VARIATIONS_URL + productId)
    .then(response => response.json())
    .then(json => dispatch(receiveVariations(json)))
    .catch(() => {
      dispatch(receiveVariations([]));
    });
};
