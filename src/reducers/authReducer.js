import { types } from '../types/types';
import { parseJwt } from '../helpers/parse-jwt';

const { uid, name, role } = parseJwt();
const isLoggedIn = uid && name && role ? true : false;

const initialState = {
  checking: true,
  uid: null || uid,
  name: null || name,
  role: role || 'basic',
  isLoggedIn,
};
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authlogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
      };

    case types.authcheckingFinish:
      return {
        ...state,
        checking: false,
      };

    case types.authlogout:
      return {
        ...state,
        checking: true,
        uid: null,
        name: null,
        role: 'basic',
        isLoggedIn: false,
      };

    case types.authShowLogin:
      return {
        ...state,
        loginVisible: action.payload,
      };

    case types.authShowRegister:
      return {
        ...state,
        RegisterVisible: action.payload,
      };

    case types.authShowPassForgot:
      return {
        ...state,
        PassForgotVisible: action.payload,
      };

    default:
      return state;
  }
};
