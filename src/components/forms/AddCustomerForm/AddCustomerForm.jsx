import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form, Input, Select, Space } from 'antd';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { cancelNewCustomer, saveNewCustomer } from './controller';
import { CustomerContact } from './CustomerContact';
import './customer-add.scss';

const { TextArea } = Input;

const AddCustomer = ({ form }) => {
  const [type, setType] = useState('V');
  const [credit, setCredit] = useState(false);

  const onChangeHasCredit = (e) => {
    setCredit(e.target.checked);
  };

  const selectBefore = (
    <Form.Item name={['type']} noStyle>
      {
        <Select
          onChange={(newValue) => setType(newValue)}
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
      initialValues={{ type: 'V' }}
      layout={'horizontal'}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
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
        name='name'
        rules={[
          {
            required: true,
            message: 'Debe indicar el Nombre del Cliente!',
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
            required: false,
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

      <Space align='baseline'>
        <Form.Item name='hasCredit' valuePropName='checked' wrapperCol={{ offset: 18 }}>
          <Checkbox indeterminate={credit} onChange={onChangeHasCredit}>
            Crédito
          </Checkbox>
        </Form.Item>
        {credit && (
          <Form.Item name='creditLimit' wrapperCol={{ offset: 8, span: 30 }}>
            <Input placeholder='Límite de crédito' />
          </Form.Item>
        )}
      </Space>

      {type != 'V' && <CustomerContact />}
    </Form>
  );
};

AddCustomer.propTypes = {
  form: PropTypes.object,
};

export const AddCustomerForm = () => {
  const dispatch = useDispatch();
  const { displayFormCustomer } = useSelector((state) => state.show);
  const onOk = (values) => {
    dispatch(saveNewCustomer(values));
  };

  const onCancel = () => {
    dispatch(cancelNewCustomer());
  };

  return (
    <ModalForm
      WrappedComponent={AddCustomer}
      title={'Crear Cliente'}
      visible={displayFormCustomer}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
      width={'30vw'}
    />
  );
};

AddCustomerForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
