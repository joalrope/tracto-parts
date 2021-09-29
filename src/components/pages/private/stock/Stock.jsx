import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { Product } from '../../../forms/ProductForm/ProductForm';
import { SearchProductForm } from '../../../forms/SearchProductForm/SearchProductForm';
import { productClearActive } from '../../../../actions/products';
import { setDisplayAddProductForm } from '../../../../actions/modals';
import './stock.scss';

export const Stock = () => {
  const [form] = Form.useForm();
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const dispatch = useDispatch();

  const searchResult = () => {
    setShowAddProductForm(true);
    dispatch(setDisplayAddProductForm({ show: false, mode: 'edit' }));
  };

  const onOk = () => {
    console.log('onOk');
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCancel = () => {
    dispatch(productClearActive());
    dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
    setShowAddProductForm(false);
  };
  return (
    <div className='--stock-page__container'>
      <Row>
        <Col xs={24} md={24} className='--stock-page__container'>
          <h4>Crear Producto</h4>
        </Col>
      </Row>
      <Row>
        <Col className='--product-form__container'>
          {!showAddProductForm && <SearchProductForm searchResult={searchResult} />}
          {showAddProductForm && <Product form={form} />}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} lg={12}>
          {showAddProductForm && (
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </Col>
        <Col xs={24} lg={12}>
          {showAddProductForm && (
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={onOk}>
              Aceptar
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
