import { fetchWithToken } from '../helpers/fetch';
import { setDisplayPdfGenerated } from './modals';

const urlNextTransaction = '/transaction/nextTransaction';

export const createSale = (sale) => {
  return async (dispatch) => {
    try {
      const resultSale = await fetchWithToken('/sales/', sale, 'POST');
      //const resultCustomer = await resp.json();
      //console.log(resultSale);

      const { ok, msg } = resultSale;
      if (ok) {
        //const sale = jsonSort(result, saleTemplate);
        dispatch(setDisplayPdfGenerated(true));
        await fetchWithToken(urlNextTransaction, {}, 'PATCH');
        //dispatch(customerSetActive(sale));
      } else {
        console.log(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};
