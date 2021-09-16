import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import { ProductForm } from '../../../forms/AddProductForm/AddProductForm';
import './stock.scss';
import { SearchProductForm } from '../../../forms/SearchProductForm/SearchProductForm';

export const Stock = () => {
  const [form] = Form.useForm();
  const [displayAddProductForm, setDisplayAddProductForm] = useState(false);

  const searchResult = () => {
    setDisplayAddProductForm(true);
  };

  const clearActive = () => {
    setDisplayAddProductForm(false);
  };
  return (
    <div className='--stock-page__container'>
      <Row>
        <Col xs={24} md={24}>
          <h4>Crear Producto</h4>
        </Col>
      </Row>
      <div className='--product-form__container'>
        {!displayAddProductForm && <SearchProductForm searchResult={searchResult} />}
        {displayAddProductForm && <ProductForm form={form} />}
      </div>
      {displayAddProductForm && <Button onClick={clearActive}> Clear </Button>}
    </div>
  );
};
