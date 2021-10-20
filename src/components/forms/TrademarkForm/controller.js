import { setDisplayAddTrademarkForm } from '../../../actions/modals';
import { createTrademark } from '../../../actions/trademarks';

export const saveNewTrademark = (values) => {
  return async (dispatch) => {
    const newTrademark = {
      code: values.title.toLowerCase(),
      title: values.title.toUpperCase(),
      factor: values.factor,
    };
    await createTrademark(newTrademark);

    dispatch(setDisplayAddTrademarkForm({ show: false, mode: '' }));
  };
};

export const cancelNewTrademark = () => {
  return (dispatch) => {
    dispatch(setDisplayAddTrademarkForm({ show: false, mode: '' }));
  };
};
