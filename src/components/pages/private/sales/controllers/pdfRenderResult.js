import Swal from 'sweetalert2';
import history from '../../../../../helpers/history/history';
import { store } from '../../../../../store/store';
import { customerClearActive } from '../../../../../actions/customers';
import { clearProductsForSale, productClearActive } from '../../../../../actions/products';
import { setDisplayPdfGenerated } from '../../../../../actions/modals';

export const msgWhenUnmounting = (controlNumber, saleActive) => {
  Swal.fire({
    title: `¿Se generó correctamente la nota de entrega ${controlNumber}?`,
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: `Si`,
    denyButtonText: `No`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      store.dispatch(customerClearActive());
      store.dispatch(productClearActive());
      store.dispatch(clearProductsForSale());
      saleActive(false);
      history.push('/app/sales');
    } else {
      result.isConfirmed = false;
      store.dispatch(setDisplayPdfGenerated(true));
    }
  });
};
