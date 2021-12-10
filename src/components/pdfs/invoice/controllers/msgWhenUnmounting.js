import { Modal } from 'antd';
import history from '../.././../../helpers/history/history';
import { store } from '../../../../store/store';
import { customerClearActive } from '../../../../actions/customers';
import { clearProductsForSale, productClearActive } from '../../../../actions/products';
import { setDisplayPdfGenerated } from '../../../../actions/shows';

export const msgWhenUnmounting = (controlNumber) => {
  const { dispatch } = store;
  Modal.confirm({
    title: 'Nota de Entrega',
    content: `¿Se imprimió correctamente la nota de entrega ${controlNumber}?`,
    okText: 'Si',
    okType: 'primary',
    cancelText: 'No',
    confirmLoading: true,
    autoFocusButton: null,
    onCancel() {
      store.dispatch(setDisplayPdfGenerated(true));
    },
    onOk() {
      dispatch(customerClearActive());
      dispatch(productClearActive());
      dispatch(clearProductsForSale());
      history.push('/app/sales');
    },
  });
};
