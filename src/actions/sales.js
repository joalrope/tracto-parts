import { fetchWithToken } from '../helpers/fetch';

const urlNextbilling = '/billings/nextBilling';

export const getSales = async () => {
  const { ok, result } = await fetchWithToken(`/sales`);
  if (ok) {
    return result;
  }
};

export const createSale = (sale) => {
  return async () => {
    try {
      const resultSale = await fetchWithToken('/sales/', sale, 'POST');

      const { ok } = resultSale;
      if (ok) {
        await fetchWithToken(urlNextbilling, {}, 'PATCH');
      }
    } catch (error) {
      console.log(error);
    }
  };
};
