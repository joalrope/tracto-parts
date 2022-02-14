import { Modal } from 'antd';
import { setDisplayAddProductForm } from '../../../actions/shows';
import { createProduct } from '../../../actions/products';

export const saveNewProduct = (values, form) => {
  return async (dispatch) => {
    Modal.confirm({
      title: `Crear Producto ${values.code}`,
      content: '¿Desea guardar los cambios?',
      okText: 'Si',
      okType: 'primary',
      cancelText: 'No',
      confirmLoading: true,
      autoFocusButton: null,
      onCancel() {
        form.resetFields();
        dispatch(setDisplayAddProductForm({ show: false, mode: 'add' }));
      },
      onOk() {
        dispatch(createProduct(values));
        form.resetFields();
        dispatch(setDisplayAddProductForm({ show: false, mode: 'add' }));
      },
    });
  };
};

export const cancelNewProduct = () => {
  return (dispatch) => {
    dispatch(setDisplayAddProductForm({ show: false, mode: 'add', value: '' }));
  };
};

export const emptyProduct = {
  code: '',
  title: '',
  details: [
    {
      trademark: '',
      costPrice: 0,
      salePrice: 0,
      stock: [
        {
          location: '',
          qty: 0,
        },
      ],
    },
  ],
  category: '',
  measurement: '',
  status: '',
  replacement: '',
};
