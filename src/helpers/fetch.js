import { createBrowserHistory } from 'history';
import { store } from '../store/store';
import { startLogout } from '../actions/auth';
import { parseJwt } from './parse-jwt';

const baseUrl = process.env.REACT_APP_API_URL;
const history = createBrowserHistory();
let response;

const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}${endpoint}`;

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
      if (resp.ok) {
        return resp.json();
      } else {
        sessionStorage.clear();
        store.dispatch(startLogout());
        const previousUrl = window.location.pathname;
        history.push('/login');
        history.replace(previousUrl);
        return {
          ok: false,
          msg: 'unauthorized',
          result: {},
        };
      }
    });
  } else {
    response = fetch(url, {
      method,
      headers: postHeaders,
      body: JSON.stringify(data),
    });
  }

  return response;
};

export { fetchWithoutToken, fetchWithToken };
