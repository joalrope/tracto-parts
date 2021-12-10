import { Modal } from 'antd';
import { createCustomer, customerClearActive, updateCustomer, deleteCustomer } from '../../../../actions/customers';
import { setDisplayAddCustomerForm } from '../../../../actions/shows';

const changesAccepted = (form, id, values, setShowAddCustomerForm, dispatch, mode) => {
  switch (mode) {
    case 'edit':
      updateCustomer(id, values);
      break;
    case 'add':
      dispatch(createCustomer(values));
      break;
    case 'delete':
      deleteResult(id);
      break;
    default:
      break;
  }

  form.resetFields();
  dispatch(setDisplayAddCustomerForm({ show: false, mode: '' }));
  setShowAddCustomerForm(false);
  dispatch(customerClearActive());
};

const deleteResult = async (id) => {
  const { msg } = await deleteCustomer(id);

  Modal.info({
    title: 'Resultado',
    content: [msg],
    autoFocusButton: true,
    okText: 'Aceptar',
    onOk() {},
  });
};

const changesRejected = (setShowAddCustomerForm, dispatch) => {
  dispatch(setDisplayAddCustomerForm({ show: false, mode: '' }));
  setShowAddCustomerForm(false);
  dispatch(customerClearActive());
};

export const onAccepted = (form, id, values, setShowAddCustomerForm, mode) => {
  let title;
  let content;
  if (mode === 'delete') {
    title = `Eliminar ${values.code}`;
    content = `¿Confirma eliminar el Cliente`;
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
        changesRejected(setShowAddCustomerForm, dispatch);
      },
      onOk() {
        changesAccepted(form, id, values, setShowAddCustomerForm, dispatch, mode);
      },
    });
  };
};
