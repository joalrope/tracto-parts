import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import history from './helpers/history/history';

//import { createBrowserHistory } from 'history';
import App from './App';
import './index.scss';

//const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
