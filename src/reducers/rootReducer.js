import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { customerReducer } from './customerReducer';
import { productReducer } from './productReducer';
import { modalsReducer } from './modalsReducer';
import { billingReducer } from './billingReducer';
import { uiReducer } from './uiReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  modals: modalsReducer,
  product: productReducer,
  billing: billingReducer,
  ui: uiReducer,
});
