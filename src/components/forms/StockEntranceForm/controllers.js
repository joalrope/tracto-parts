import { Modal } from 'antd';
import { updateQtyItemsEntrance } from '../../../helpers/products/update-qty-items';

export const onButtonSaveOk = (form) => {
  form
    .validateFields()
    .then((values) => {
      const { hasAmountBilling, totalAmount, items } = values;

      if (hasAmountBilling) {
        const billingAmount = items
          .map(({ qty, costPrice }) => {
            return qty * costPrice;
          })
          .reduce((a, b) => a + b, 0);

        checkAmountMatch(totalAmount, billingAmount, items);
      } else {
        const { items } = values;
        updateQtyItemsEntrance(items);
        form.resetFields();
        //TODO:console.log(`dispatch(saveNewStockEntrance(${JSON.stringify(items, null, 2)}))`);
      }
    })
    .catch(({ errorFields }) => {
      const errors = errorFields.map((field) => {
        return `${field.errors[0]}, `;
      });
      Modal.warning({
        title: 'Error al enviar los datos',
        content: [errors],
        okText: 'Aceptar',
        okType: 'primary',
        confirmLoading: true,
        autoFocusButton: null,
        onOk() {},
      });
    });
};

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
      onCancel() {},
      onOk() {
        console.log(`dispatch(saveNewStockEntrance(${JSON.stringify(items, null, 2)}))`);
      },
    });
  } else {
    console.log(`dispatch(saveNewStockEntrance(${JSON.stringify(items, null, 2)}))`);
  }
};
