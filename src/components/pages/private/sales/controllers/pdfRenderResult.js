import Swal from 'sweetalert2';
import { fetchWithToken } from '../../../../../helpers/fetch';
import { controlNumber } from '../controllers/getTransactionInfo';

const urlNextTransaction = '/transaction/nextTransaction';

export const msgWhenUnmounting = () => {
  Swal.fire({
    title: `¿Se generó correctamente la nota de entrega ${controlNumber}?`,
    icon: 'question',
    showDenyButton: true,
    confirmButtonText: `Si`,
    denyButtonText: `No`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      await fetchWithToken(urlNextTransaction, {}, 'PATCH');
      window.location.reload();
    } else {
      result.isConfirmed = false;
    }
  });
};
