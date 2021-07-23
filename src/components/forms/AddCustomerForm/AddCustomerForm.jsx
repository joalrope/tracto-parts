import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import './customer-add.scss';
import { CustomerContact } from './CustomerContact';

const { TextArea } = Input;
const select = createRef();

const AddCustomer = ({ form }) => {
  const selectBefore = (
    <Form.Item name={['type']} noStyle initialValue='V'>
      {
        <Select
          ref={select}
          options={[
            { value: 'V', label: 'V' },
            { value: 'J', label: 'J' },
            { value: 'G', label: 'G' },
          ]}
        />
      }
    </Form.Item>
  );

  return (
    <Form
      name='customer-add'
      form={form}
      layout={'horizontal'}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 30,
      }}
    >
      <Form.Item
        name={['code']}
        label={'R.I.F:'}
        rules={[
          {
            required: true,
            message: 'Ingrese el número del Rif del Cliente!',
          },
        ]}
      >
        <Input addonBefore={selectBefore} />
      </Form.Item>

      <Form.Item
        label='Nombre'
        name='username'
        rules={[
          {
            required: true,
            message: 'Por Favor indique un Nombre del Cliente!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='Dirección:'
        name='address'
        rules={[
          {
            required: true,
            message: 'agrege la dirección del cliente!',
          },
        ]}
      >
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item
        label='Teléfono:'
        name='phone'
        rules={[
          {
            required: true,
            message: 'Por Favor indique un número telefonico!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label='eMail:'
        name='email'
        rules={[
          {
            required: false,
            message: 'Por Favor indique correo Electronico!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      {select.value != 'V' && <CustomerContact />}
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
