import { fetchWithToken } from '../helpers/fetch';
import { types } from '../types/types';

export const findTrademarkFactoraByCode = async (trademark) => {
  if (!trademark) return;
  try {
    const { ok, result } = await fetchWithToken(`/trademarks/factor/${trademark.toLowerCase()}`);

    if (ok) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrademarksTitle = () => {
  return async (dispatch) => {
    try {
      const { ok, result } = await fetchWithToken(`/trademarks/title`);
      if (ok) {
        dispatch(setTrademarksLoaded(result));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createTrademark = async (trademark) => {
  try {
    const { ok } = await fetchWithToken('/trademarks/', trademark, 'POST');
    return ok;
  } catch (error) {
    console.log(error);
  }
};

const setTrademarksLoaded = (trademarks) => ({
  type: types.trademarksTitles,
  payload: trademarks,
});

export const addNewTrademarksTitle = (title) => ({
  type: types.trademarksAddNew,
  payload: title,
});
