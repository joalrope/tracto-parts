import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { Product } from '../../../forms/ProductForm/ProductForm';
import { SearchProductForm } from '../../../forms/SearchProductForm/SearchProductForm';
import { productClearActive } from '../../../../actions/products';
//import { setDisplayAddProductForm } from '../../../../actions/shows';
import { onAccepted } from './controllers';
import './stock.scss';

export const Stock = () => {
  const [form] = Form.useForm();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [modeProductForm, setModeProductForm] = useState('add');
  const { activeProduct } = useSelector((state) => state.product);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeProduct) {
      const { id: activeId } = activeProduct;
      setId(activeId);
    }
  }, [activeProduct]);

  const searchResult = (mode) => {
    setShowAddProductForm(true);
    setModeProductForm(mode);
    //dispatch(setDisplayAddProductForm({ show: true, mode: 'edit' }));
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(onAccepted(form, id, values, setShowAddProductForm, modeProductForm));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCancel = () => {
    dispatch(productClearActive());
    //dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
    setShowAddProductForm(false);
  };
  return (
    <div className='--stock-page__container'>
      <Row>
        <Col xs={24} md={24} className='--stock-page__container'>
          <h4>Actualizar Producto</h4>
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
