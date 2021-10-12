import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'antd';
import { Product } from '../../../forms/ProductForm/ProductForm';
import { SearchProductForm } from '../../../forms/SearchProductForm/SearchProductForm';
import { productClearActive, updateProduct } from '../../../../actions/products';
import { setDisplayAddProductForm } from '../../../../actions/modals';
import './stock.scss';

export const Stock = () => {
  const [form] = Form.useForm();
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const { activeProduct } = useSelector((state) => state.product);
  const [id, setId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (activeProduct) {
      const { id: activeId } = activeProduct;
      setId(activeId);
    }
  }, [activeProduct]);

  const searchResult = () => {
    setShowAddProductForm(true);
    dispatch(setDisplayAddProductForm({ show: false, mode: 'edit' }));
  };

  const changesAccepted = (id, values) => {
    updateProduct(id, values);
    form.resetFields();
    dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
    setShowAddProductForm(false);
    dispatch(productClearActive());
  };

  const changesRejected = () => {
    form.resetFields();
    dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
    setShowAddProductForm(false);
    dispatch(productClearActive());
  };

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        Modal.confirm({
          title: `Actualizar ${values.code}`,
          content: '¿Desea guardar los cambios?',
          okText: 'Aceptar',
          okType: 'primary',
          cancelText: 'Cancelar',
          onCancel() {
            changesRejected();
          },
          onOk() {
            changesAccepted(id, values);
          },
        });
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
