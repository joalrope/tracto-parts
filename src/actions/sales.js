import { fetchWithToken } from '../helpers/fetch';
import { setDisplayPdfGenerated } from './shows';

//const urlNextbilling = '/billings/nextBilling';

export const getSales = async () => {
  const { ok, result } = await fetchWithToken(`/sales`);
  if (ok) {
    return result;
  }
};

export const createSale = (sale) => {
  console.log(sale);
  return async (dispatch) => {
    try {
      //const resultSale = await fetchWithToken('/sales/', sale, 'POST');

      //const { ok } = resultSale;
      //if (ok) {
      dispatch(setDisplayPdfGenerated(true));
      //await fetchWithToken(urlNextbilling, {}, 'PATCH');
      //}
    } catch (error) {
      console.log(error);
    }
  };
};
