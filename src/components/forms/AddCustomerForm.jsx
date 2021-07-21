import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Checkbox } from 'antd';
import './customer-add.scss';
import { ModalForm } from '../wrappers/ModalForm';
import { useSelector } from 'react-redux';

const AddCustomer = ({ form }) => {
  return (
    <Form
      name='customer-add'
      form={form}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label='R.I.F:'
        name='code'
        rules={[
          {
            required: true,
            message: 'Por Favor indique el Rif del Cliente!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Nombre'
        name='username'
        rules={[
          {
            required: true,
            message: 'Por Favor indique un Nombre!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name='remember'
        valuePropName='checked'
        wrapperCol={{
          offset: 16,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
    </Form>
  );
};

AddCustomer.propTypes = {
  form: PropTypes.object,
};

export const AddCustomerForm = ({ onOk, onCancel }) => {
  const { displayFormCustomerAdd } = useSelector((state) => state.display);

  return (
    <ModalForm
      WrappedComponent={AddCustomer}
      title={'Crear Cliente'}
      visible={displayFormCustomerAdd}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
      draggable
    />
  );
};

AddCustomerForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
