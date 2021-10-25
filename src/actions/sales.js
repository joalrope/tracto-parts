import { fetchWithToken } from '../helpers/fetch';
import { setDisplayPdfGenerated } from './shows';

const urlNextbilling = '/billings/nextBilling';

export const createSale = (sale) => {
  return async (dispatch) => {
    try {
      const resultSale = await fetchWithToken('/sales/', sale, 'POST');
      //const resultCustomer = await resp.json();

      const { ok, msg } = resultSale;
      if (ok) {
        //const sale = jsonSort(result, saleTemplate);
        dispatch(setDisplayPdfGenerated(true));
        await fetchWithToken(urlNextbilling, {}, 'PATCH');
        //dispatch(customerSetActive(sale));
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
