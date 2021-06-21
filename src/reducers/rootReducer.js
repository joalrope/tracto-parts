import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { customerReducer } from './customerReducer';
import { productReducer } from './productReducer';
import { displayReducer } from './displayReducer';
import { transactionReducer } from './transactionReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  product: productReducer,
  display: displayReducer,
  transaction: transactionReducer,
});
