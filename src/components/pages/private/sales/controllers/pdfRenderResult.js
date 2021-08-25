import Swal from 'sweetalert2';
import { createBrowserHistory } from 'history';
import { store } from '../../../../../store/store';
import { customerClearActive } from '../../../../../actions/customers';
import { clearProductsForSale, productClearActive } from '../../../../../actions/products';

const history = createBrowserHistory();

export const msgWhenUnmounting = (controlNumber) => {
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
      history.push('/app/sales');
    } else {
      result.isConfirmed = false;
    }
  });
};
