import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { emptyProduct, cancelNewProduct /* , saveNewProduct */ } from './controller';
import { ProductDetails } from './ProductDetails';

import './product-add.scss';
import { getTrademarksTitle } from '../../../actions/trademarks';

export const Product = ({ form }) => {
  const [product, setProduct] = useState(emptyProduct);
  const { activeProduct } = useSelector((state) => state.product);
  let code, title, category, details, measurement, status, replacement;
  const [trademarks, setTrademarks] = useState([]);

  useEffect(() => {
    setProduct(activeProduct);
    ({ code, title, category, details, measurement, status, replacement } = product);
    form.setFieldsValue({ code, title, category, details, measurement, status, replacement });
  }, [activeProduct, product]);

  useEffect(async () => {
    setTrademarks(await getTrademarksTitle());
  }, [trademarks]);

  console.log(trademarks);
  return (
    <Form
      className='--add-product__form'
      name='product-add'
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
        <Col xs={24} md={24} lg={4}>
          <Form.Item
            name={'code'}
            label={'Código:'}
            rules={[
              {
                required: true,
                message: 'Ingrese el código del producto!',
              },
            ]}
            normalize={(value) => (value ? value.toUpperCase() : value)}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={15}>
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
          <Form.Item
            className='--form-item__container'
            name='category'
            label='Categoría:'
            /* initialValue={product.category}*/
            rules={[{ required: true }]}
          >
            <Input placeholder='Indique una categoría' />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <ProductDetails form={form} trademarks={trademarks} />
      </Row>
      <Form.Item>
        <Row gutter={24}>
          <Col xs={24} lg={12}>
            <Form.Item
              className='--form-item__container'
              name='measurement'
              label='Medidas:'
              // initialValue={product.measurement}
              rules={[{ required: false }]}
            >
              <Input placeholder='Medidas' />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item
              className='--form-item__container'
              name='status'
              label='Estado'
              /*  initialValue={product.status} */
              rules={[{ required: false }]}
            >
              <Input placeholder='Estado del producto' />
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
      <Form.Item
        label='Equivalencias:'
        name='replacement'
        /* initialValue={product.replacement} */
        rules={[
          {
            required: false,
            message: 'agrege la dirección del cliente!',
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

  const { productForm } = useSelector((state) => state.modals);
  const { show, mode } = productForm;

  const onOk = () => {
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

  const onCancel = (form) => {
    form.resetFields();
    dispatch(cancelNewProduct());
  };

  return (
    <ModalForm
      WrappedComponent={Product}
      title={mode === 'add' ? 'Crear Producto' : 'Actualizar Producto'}
      visible={show}
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
