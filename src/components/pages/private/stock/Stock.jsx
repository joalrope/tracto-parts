import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { Product } from '../../../forms/ProductForm/ProductForm';
import { SearchProductForm } from '../../../forms/SearchProductForm/SearchProductForm';
import { productClearActive } from '../../../../actions/products';
import './stock.scss';
import { setDisplayAddProductForm } from '../../../../actions/modals';

export const Stock = () => {
  const [form] = Form.useForm();
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  const dispatch = useDispatch();

  const searchResult = () => {
    setShowAddProductForm(true);
    dispatch(setDisplayAddProductForm({ show: false, mode: 'edit' }));
  };

  const clearActive = () => {
    dispatch(productClearActive());
    dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
    setShowAddProductForm(false);
  };
  return (
    <div className='--stock-page__container'>
      <Row>
        <Col xs={24} md={24}>
          <h4>Crear Producto</h4>
        </Col>
      </Row>
      <div className='--product-form__container'>
        {!showAddProductForm && <SearchProductForm searchResult={searchResult} />}
        {showAddProductForm && <Product form={form} />}
      </div>
      {showAddProductForm && <Button onClick={clearActive}> Clear </Button>}
    </div>
  );
};
