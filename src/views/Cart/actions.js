export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_QUANTITY = 'SET_QUANTITY';

export const addProduct = (id, name, price, image) => ({
  type: ADD_PRODUCT,
  id,
  name,
  price,
  image,
});

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  id,
});

export const setQuantity = (id, quantity) => ({
  type: SET_QUANTITY,
  id,
  quantity,
});
