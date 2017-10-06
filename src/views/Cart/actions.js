export const ADD_PRODUCT = 'ADD_PRODUCT';

export const addProduct = (id, name, price, image) => ({
  type: ADD_PRODUCT,
  id,
  name,
  price,
  image,
});
