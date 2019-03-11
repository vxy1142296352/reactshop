import { combineReducers } from 'redux';
import cartReducer from './cart-reducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const allReducers ={
	shoppingCart: cartReducer
}
const rootReducer = combineReducers(allReducers);
let store = createStore(rootReducer, composeWithDevTools());
export default store;