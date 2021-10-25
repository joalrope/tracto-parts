import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { billingReducer } from './billingReducer';
import { customerReducer } from './customerReducer';
import { showReducer } from './showReducer';
import { productReducer } from './productReducer';
import { trademarkReducer } from './trademarkReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  billing: billingReducer,
  customer: customerReducer,
  show: showReducer,
  product: productReducer,
  trademark: trademarkReducer,
  ui: uiReducer,
});
