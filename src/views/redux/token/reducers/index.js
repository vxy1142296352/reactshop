import { combineReducers } from 'redux';
import cartReducer from './userreducer';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
const allReducers={
  token:cartReducer
}
const rootReducer = combineReducers(allReducers);
let store = createStore(rootReducer, composeWithDevTools());
export default store;