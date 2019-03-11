import { ADD_TO_CART } from '../actions/useraction';
import cookie from 'react-cookies';
const initialState ={
  token:cookie.load('accestoken') 
}
export default function (state = initialState,action){
  switch(action.type){
    case ADD_TO_CART:{
    return {
        // ...state,
        token: action.token
      }
    }
    default:
    return state;
  }
}