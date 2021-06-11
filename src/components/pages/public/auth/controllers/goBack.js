import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export const goBack = () => {
  history.length >= 1 ? history.goBack() : history.push('/');
};
