import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Col, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { cancelNewCustomer, emptyCustomer, saveNewCustomer } from './controller';
import { CustomerContact } from './CustomerContact';
import './customer-add.scss';
import { parserNumber } from '../AllForms';

const { TextArea } = Input;

export const Customer = ({ form }) => {
  const [customer, setCustomer] = useState(emptyCustomer);
  const { activeCustomer } = useSelector((state) => state.customer);
  const [credit, setCredit] = useState(false);
  const [type, setType] = useState('J');
  const [showContact, setShowContact] = useState(false);
  let code, name, address, phone, email, hasCredit, creditLimit, contact;

  useEffect(() => {
    setCustomer(activeCustomer);
    if (customer) {
      if (customer.contact.length === 0) {
        customer['contact'] = [{ contactName: '', contactPhone: '', contactEmail: '' }];
      }
      ({ code, name, address, phone, email, hasCredit, creditLimit, contact } = customer);
      setType(code.charAt(0));
      code = code.substring(2);
      setCredit(hasCredit);
      form.setFieldsValue({ code, type, name, address, phone, email, hasCredit, creditLimit, contact });
    }
  }, [customer, showContact, type]);

  useEffect(() => {
    type === 'V' ? setShowContact(false) : setShowContact(true);
  }, [type]);

  const onChangeHasCredit = (e) => {
    setCredit(e.target.checked);
  };

  const selectBefore = (
    <Form.Item name={['type']} noStyle>
      {
        <Select
          onChange={(newValue) => {
            newValue === 'J' ? setShowContact(true) : setShowContact(false);
            form.setFields([
              {
                name: ['type'],
                value: newValue,
              },
            ]);
          }}
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
      <Row gutter={12}>
        <Col xs={24} md={24} lg={7}>
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
        </Col>
        <Col xs={24} md={24} lg={17}>
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
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={24}>
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
        </Col>
      </Row>
      <Row gutter={12}>
        <Col xs={24} md={24} lg={12}>
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
        </Col>
        <Col xs={24} md={24} lg={12}>
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
        </Col>
      </Row>

      <Space align='baseline'>
        <Form.Item name='hasCredit' valuePropName='checked' wrapperCol={{ offset: 18 }}>
          <Checkbox indeterminate={credit} onChange={onChangeHasCredit}>
            Crédito
          </Checkbox>
        </Form.Item>
        {credit && (
          <Form.Item name='creditLimit' wrapperCol={{ offset: 8, span: 30 }}>
            <InputNumber placeholder='Límite de crédito' parser={(value) => parserNumber(value)} />
          </Form.Item>
        )}
      </Space>

      {showContact && <CustomerContact form={form} />}
    </Form>
  );
};

Customer.propTypes = {
  form: PropTypes.object,
};

export const CustomerForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { customerForm } = useSelector((state) => state.show);
  const { show } = customerForm;
  const onOk = (values) => {
    dispatch(saveNewCustomer(values));
  };

  const onCancel = () => {
    dispatch(cancelNewCustomer());
  };

  return (
    <ModalForm
      WrappedComponent={Customer}
      title={'Crear Cliente'}
      visible={show}
      form={form}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
      width={'30vw'}
    />
  );
};

CustomerForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
