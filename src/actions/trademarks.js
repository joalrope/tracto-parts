import { fetchWithToken } from '../helpers/fetch';

export const findTrademarkFactoraByCode = async (trademark) => {
  try {
    const { ok, result } = await fetchWithToken(`/trademarks/factor/${trademark.toLowerCase()}`);

    if (ok) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTrademarksTitle = async () => {
  try {
    const { ok, result } = await fetchWithToken(`/trademarks/title`);
    if (ok) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};
