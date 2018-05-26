import { combineReducers } from 'redux';
import * as shoppingCartReducer from './shoppingCart';

export default combineReducers(Object.assign(
  shoppingCartReducer,
));