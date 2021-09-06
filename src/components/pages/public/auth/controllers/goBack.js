import history from '../.././../../../helpers/history/history';

export const goBack = () => {
  history.length >= 1 ? history.goBack() : history.push('/');
};
