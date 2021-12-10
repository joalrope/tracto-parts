import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { Customer } from '../../../forms/CustomerForm/CustomerForm';
import './customer.scss';
import { onAccepted } from './controllers';
import { SearchCustomerForm } from '../../../forms/SearchCustomerForm/SearchCustomerForm';

export const AddCustomer = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState('add');
  const { activeCustomer } = useSelector((state) => state.customer);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (activeCustomer) {
      const { id: activeId } = activeCustomer;
      setId(activeId);
    }
  }, [activeCustomer]);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        let { code, type, ...rest } = values;
        code = `${type}-${code}`;
        const newValues = { code, ...rest };
        dispatch(onAccepted(form, id, newValues, setShowForm, mode));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCancel = () => {
    setShowForm(false);
  };

  const onDelete = () => {
    setMode('delete');
  };

  useEffect(() => {
    if (mode === 'delete') {
      onOk();
    }
  }, [mode]);

  const searchResult = (mode) => {
    setShowForm(true);
    setMode(mode);
  };

  return (
    <div className='--customer-page__container'>
      <Row>
        <Col xs={24} md={24} className='--title-page__container'>
          <h4>Crear o Editar Clientes</h4>
        </Col>
      </Row>
      <Row>
        <Col className='--current-form__container'>
          {!showForm && <SearchCustomerForm searchResult={searchResult} />}
          {showForm && <Customer form={form} />}
        </Col>
      </Row>
      {showForm && (
        <Row gutter={20}>
          {mode === 'edit' && (
            <Col xs={24} lg={8}>
              <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={() => onDelete()}>
                Eliminar
              </Button>
            </Col>
          )}
          <Col xs={24} lg={mode === 'edit' ? 8 : 12}>
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={onCancel}>
              Cancelar
            </Button>
          </Col>
          <Col xs={24} lg={mode === 'edit' ? 8 : 12}>
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={() => onOk()}>
              Aceptar
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
};
