import { Modal } from 'antd';
export const showInfoQtyAvailable = (product) => {
  if (product.qty > product.qtyAvailable) {
    Modal.info({
      title: 'Disponibilidad',
      content: [
        `Solo hay ${product.qtyAvailable} productos disponibles del`,
        `codigo ${product.code} de la marca ${product.trademark}`,
      ],
      autoFocusButton: null,
      okText: 'Aceptar',
      onOk() {},
    });
    return false;
  }
  return true;
};
