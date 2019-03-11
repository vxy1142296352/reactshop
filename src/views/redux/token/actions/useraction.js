export const ADD_TO_CART = 'ADD_TO_CART';
export function addUser(token) {
  return {
    type: ADD_TO_CART,
    token
  }
}