import Swal from 'sweetalert2';
//import { fetchWithToken } from '../../../../../helpers/fetch';
//import { controlNumber } from '../controllers/getTransactionInfo';
import { store } from '../../../../../store/store';
import { customerClearActive } from '../../../../../actions/customers';
import { clearProductsForSale, productClearActive } from '../../../../../actions/products';

//const urlNextTransaction = '/transaction/nextTransaction';

export const msgWhenUnmounting = (controlNumber) => {
  Swal.fire({
    title: `¿Se generó correctamente la nota de entrega ${controlNumber}?`,
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: `Si`,
    denyButtonText: `No`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      //await fetchWithToken(urlNextTransaction, {}, 'PATCH');
      store.dispatch(customerClearActive());
      store.dispatch(productClearActive());
      store.dispatch(clearProductsForSale());
    } else {
      result.isConfirmed = false;
    }
  });
};
