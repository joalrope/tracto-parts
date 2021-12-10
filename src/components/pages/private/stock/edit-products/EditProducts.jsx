import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Row } from 'antd';
import { SearchProductForm } from '../../../../forms/SearchProductForm/SearchProductForm';
import { Product } from '../../../../forms/ProductForm/ProductForm';
import { onAccepted } from '../edit-products/controllers';
import { productClearActive } from '../../../../../actions/products';

export const EditProducts = () => {
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

  const onDelete = () => {
    setModeProductForm('delete');
  };

  useEffect(() => {
    if (modeProductForm === 'delete') {
      onOk();
    }
  }, [modeProductForm]);

  const onCancel = () => {
    dispatch(productClearActive());
    //dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
    setShowAddProductForm(false);
  };

  return (
    <div className='--stock-page__container'>
      <Row>
        <Col xs={24} md={24} className='--stock-page__container'>
          <h4>Crear o Actualizar Producto</h4>
        </Col>
      </Row>
      <Row>
        <Col className='--current-form__container'>
          {!showAddProductForm && <SearchProductForm searchResult={searchResult} />}
          {showAddProductForm && <Product form={form} />}
        </Col>
      </Row>
      <Row gutter={20}>
        <Col xs={24} lg={8}>
          {showAddProductForm && (
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={() => onDelete()}>
              Eliminar
            </Button>
          )}
        </Col>
        <Col xs={24} lg={8}>
          {showAddProductForm && (
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </Col>
        <Col xs={24} lg={8}>
          {showAddProductForm && (
            <Button style={{ margin: '0 0 20px 0', width: '100%' }} onClick={() => onOk()}>
              Aceptar
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
