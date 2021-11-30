import { Modal } from 'antd';
import { createProduct, productClearActive, updateProduct, deleteProduct } from '../../../../../actions/products';
import { setDisplayAddProductForm } from '../../../../../actions/shows';

const changesAccepted = (form, id, values, setShowAddProductForm, dispatch, mode) => {
  switch (mode) {
    case 'edit':
      updateProduct(id, values);
      break;
    case 'add':
      dispatch(createProduct(values));
      break;
    case 'delete':
      deleteProduct(id);
      break;
    default:
      break;
  }

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
  let title;
  let content;
  if (mode === 'delete') {
    title = `Eliminar ${values.code}`;
    content = `¿Confirma eliminar el Producto`;
  } else {
    title = `Actualizar ${values.code}`;
    content = '¿Desea guardar los cambios?';
  }

  return (dispatch) => {
    Modal.confirm({
      title,
      content,
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
