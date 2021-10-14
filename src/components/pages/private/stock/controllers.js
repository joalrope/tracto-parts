import { Modal } from 'antd';
import { createProduct, productClearActive, updateProduct } from '../../../../actions/products';
import { setDisplayAddProductForm } from '../../../../actions/modals';

const changesAccepted = (form, id, values, setShowAddProductForm, dispatch, mode) => {
  mode === 'edit' ? updateProduct(id, values) : dispatch(createProduct(values));
  form.resetFields();
  dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
  setShowAddProductForm(false);
  dispatch(productClearActive());
};

const changesRejected = (setShowAddProductForm, dispatch) => {
  dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
  setShowAddProductForm(false);
  dispatch(productClearActive());
};

export const onAccepted = (form, id, values, setShowAddProductForm, mode) => {
  return (dispatch) => {
    Modal.confirm({
      title: `Actualizar ${values.code}`,
      content: '¿Desea guardar los cambios?',
      okText: 'Si',
      okType: 'primary',
      cancelText: 'No',
      confirmLoading: true,
      autoFocusButton: null,
      onCancel() {
        changesRejected(setShowAddProductForm, dispatch);
      },
      onOk() {
        changesAccepted(form, id, values, setShowAddProductForm, dispatch, mode);
      },
    });
  };
};
