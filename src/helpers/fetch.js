import { Modal } from 'antd';
import { store } from '../store/store';
import { startLogout } from '../actions/auth';
import history from './history/history';
import { parseJwt } from './parse-jwt';

const baseUrl = process.env.REACT_APP_API_URL;
let response;

const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}${endpoint}`;
  //const fetching = useSelector(state => state.state)

  if (method === 'GET') {
    response = fetch(url).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return {
          ok: false,
        };
      }
    });
  } else {
    response = fetch(url, {
      method,
      headers: {
        'content-type': 'application/json',
        'x-role': 'basic',
      },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        return {
          ok: false,
        };
      }
    });
  }

  return response;
};

const fetchWithToken = (endpoint, data, method = 'GET', header) => {
  const url = `${baseUrl}${endpoint}`;
  const role = parseJwt();
  const token = sessionStorage.token;
  const getHeaders = { 'x-token': token, 'x-role': role, ...header };
  const postHeaders = {
    'content-type': 'application/json',
    'x-token': token,
    ...header,
  };

  if (method === 'GET') {
    response = fetch(url, {
      method,
      headers: getHeaders,
    }).then((resp) => {
      checkSessionStatus(resp.status);
      return resp.json();
    });
  } else {
    response = fetch(url, {
      method,
      headers: postHeaders,
      body: JSON.stringify(data),
    }).then((resp) => {
      checkSessionStatus(resp.status);
      if (resp.ok) {
        return resp.json();
      } else {
        return {
          ok: false,
          msg: 'No se pudo crear el recurso',
          result: {},
        };
      }
    });
  }

  return response;
};

const checkSessionStatus = (status) => {
  if (status === 401) {
    const previousUrl = window.location.pathname;
    sessionStorage.clear();
    store.dispatch(startLogout());
    showExpiredSessionMessage(previousUrl);

    return {
      ok: false,
      msg: 'unauthorized',
      result: {},
    };
  }
};

const showExpiredSessionMessage = (url) => {
  Modal.info({
    title: 'Sesión de usuario',
    content: ['Su sesión activa ha expirado. Por favor inicie una nueva'],
    okText: 'Aceptar',
    okType: 'primary',
    confirmLoading: true,
    autoFocusButton: null,
    onOk() {
      history.replace(url);
      history.push('/home');
      history.push('/login');
    },
  });
};

export { fetchWithoutToken, fetchWithToken };
