import Swal from 'sweetalert2';
import { types } from '../types/types';
import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import history from '../helpers/history/history';

export const startLogin = (email, password) => {
  return async (dispatch) => {
    const { ok, msg, token, uid, name, role } = await fetchWithoutToken('/auth', { email, password }, 'POST');
    if (ok) {
      dispatch(
        login({
          uid,
          name,
          role,
          isLoggedIn: true,
        })
      );

      sessionStorage.token = token;
      sessionStorage.isLogged = true;
      history.push('/home');
    } else {
      Swal.fire('Error en la autenticación', msg, 'error');
    }
  };
};

export const startRegister = (name, email, password) => {
  return async (dispatch) => {
    const {
      ok,
      msg,
      token,
      uid,
      name: userName,
      role,
    } = await fetchWithoutToken('/auth/new', { name, email, password }, 'POST');

    if (ok) {
      sessionStorage.token = token;
      sessionStorage.token_init_date = new Date().getTime();

      dispatch(
        login({
          uid,
          userName,
          role,
        })
      );
    } else {
      Swal.fire('Error', msg, 'error');
    }
  };
};

//export const startPassRecovery = (email) => {};

export const startChecking = () => {
  return async (dispatch) => {
    if ('token' in sessionStorage) {
      const { ok, token, uid, name, role } = await fetchWithToken('/auth/renew');

      if (ok) {
        sessionStorage.token = token;
        sessionStorage.token_init_date = new Date().getTime();

        const isLoggedIn = uid ? true : false;

        // (uid) ? isLoggedIn = true : isLoggedIn = false

        dispatch(
          login({
            uid,
            name,
            role,
            isLoggedIn,
          })
        );
      } else {
        dispatch(checkingFinish());
      }
    }
  };
};

export const startLogout = () => {
  return (dispatch) => {
    dispatch(logout());
  };
};

export const startShowRegister = () => {
  return (dispatch) => {
    dispatch(showRegisterForm(true));
  };
};

export const startShowPassForgot = () => {
  return (dispatch) => {
    dispatch(showPassForgotForm(true));
  };
};

export const startHideLogin = () => {};

export const startHideRegister = () => {
  return (dispatch) => {
    dispatch(showRegisterForm(false));
  };
};

export const startHidePassForgot = () => {
  return (dispatch) => {
    dispatch(showPassForgotForm(false));
  };
};

const login = (user) => ({
  type: types.authlogin,
  payload: user,
});

const checkingFinish = () => ({
  type: types.authcheckingFinish,
});

const logout = () => ({
  type: types.authlogout,
});

const showRegisterForm = (valVisible) => ({
  type: types.authShowRegister,
  payload: valVisible,
});

const showPassForgotForm = (valVisible) => ({
  type: types.authShowPassForgot,
  payload: valVisible,
});
