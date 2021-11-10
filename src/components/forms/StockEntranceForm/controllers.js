import { Modal } from 'antd';

export const checkAmountMatch = (totalAmount, billingAmount, items) => {
  if (totalAmount !== billingAmount) {
    Modal.confirm({
      title: 'Conciliación de Cargo de Inventario',
      content: [
        `No coincide el monto de la factura ${totalAmount}, 
        con el total de los Items ingresados ${billingAmount}
        ¿Desea procesarla de igual manera?`,
      ],
      okText: 'Si',
      okType: 'primary',
      confirmLoading: true,
      autoFocusButton: null,
      cancelText: 'No',
      onCancel() {
        console.log('No aceptado');
      },
      onOk() {
        console.log(`dispatch(saveNewStockEntrance(${JSON.stringify(items, null, 2)}))`);
      },
    });
  } else {
    console.log(`dispatch(saveNewStockEntrance(${JSON.stringify(items, null, 2)}))`);
  }
};
