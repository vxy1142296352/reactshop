import { ADD_TO_CART } from '../actions/cart-actions'
const initialState ={
  cart:false
}
export default function (state = initialState,action){
  switch(action.type){
    case ADD_TO_CART:{
    return {
        // ...state,
        cart: action.product
      }
    }
    default:
    return state;
  }
}