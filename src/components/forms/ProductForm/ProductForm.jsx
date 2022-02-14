import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { InputCode } from '../aa-form-controls/InputCode';
import { emptyProduct, cancelNewProduct /* , saveNewProduct */, saveNewProduct } from './controller';
import { ProductDetails } from './ProductDetails';
import './product-add.scss';

export const Product = ({ form }) => {
  const { productForm } = useSelector((state) => state.show);
  const { mode, value } = productForm;
  const { activeProduct } = useSelector((state) => state.product);
  const [product, setProduct] = useState({});
  let code, title, category, details, measurement, status, replacement;

  useEffect(() => {
    emptyProduct['code'] = value?.toUpperCase();
    setProduct(mode === 'add' ? emptyProduct : activeProduct);
    if (product) {
      ({ code, title, category, details, measurement, status, replacement } = product);
    }
    form.setFieldsValue({ code, title, category, details, measurement, status, replacement });
  }, [product, activeProduct, value]);

  return (
    <Form
      className='--add-product__form'
      name='product-form'
      form={form}
      initialvalue={emptyProduct}
      layout={'vertical'}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      <Row gutter={24}>
        <Col xs={24} md={24} lg={5}>
          <InputCode />
        </Col>
        <Col xs={24} md={24} lg={14}>
          <Form.Item
            label='Descripción:'
            name='title'
            rules={[
              {
                required: true,
                message: 'Debe indicar la descripción del producto',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={5}>
          <Form.Item className='--form-item__container' name='category' label='Categoría:' rules={[{ required: true }]}>
            <Input placeholder='Indique una categoría' />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <ProductDetails form={form} />
      </Row>
      <Form.Item>
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item
              className='--form-item__container'
              name='measurement'
              label='Medidas:'
              rules={[{ required: false }]}
            >
              <Input placeholder='Medidas' />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item className='--form-item__container' name='status' label='Estado' rules={[{ required: false }]}>
              <Input placeholder='Estado del producto' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label='Equivalencias:'
        name='replacement'
        rules={[
          {
            required: false,
          },
        ]}
        style={{ display: 'inline-block', width: '100%' }}
      >
        <TextArea rows={3} />
      </Form.Item>
    </Form>
  );
};

Product.propTypes = {
  form: PropTypes.object,
};

export const ProductForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { productForm } = useSelector((state) => state.show);
  const { show, mode } = productForm;

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(saveNewProduct(values, form));
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const onCancel = (form) => {
    dispatch(cancelNewProduct());
    form.resetFields();
  };

  return (
    <ModalForm
      WrappedComponent={Product}
      title={mode === 'add' ? 'Crear Producto' : 'Actualizar Producto'}
      visible={show}
      form={form}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
      width={'55vw'}
    />
  );
};

ProductForm.propTypes = {
  mode: PropTypes.string,
};
