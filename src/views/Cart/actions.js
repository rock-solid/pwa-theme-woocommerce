export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_QUANTITY = 'SET_QUANTITY';

export const addProduct = (id, name, price, image, variationId, selections) => ({
  type: ADD_PRODUCT,
  id: Number(id),
  name,
  price,
  image,
  variationId: Number(variationId),
  selections,
});

export const removeProduct = (id, variationId) => ({
  type: REMOVE_PRODUCT,
  id,
  variationId,
});

export const setQuantity = (id, variationId, quantity) => ({
  type: SET_QUANTITY,
  id,
  variationId,
  quantity,
});
