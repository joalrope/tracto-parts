import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { cancelNewProduct /* , saveNewProduct */ } from './controller';
import './product-add.scss';

const { Option } = Select;

const emptyProduct = {
  code: '',
  title: '',
  details: [
    {
      trademark: '',
      costPrice: '',
      salePrice: '',
      stock: [
        {
          location: '',
          qty: '',
        },
      ],
    },
  ],
  category: '',
  measurement: '',
  status: '',
  replacement: '',
};

export const Product = ({ form }) => {
  const [product, setProduct] = useState(emptyProduct);
  const { activeProduct } = useSelector((state) => state.product);
  let code, title, category, measurement, status, replacement;

  useEffect(() => {
    if (activeProduct) {
      setProduct(activeProduct);
      ({ code, title, category, measurement, status, replacement } = product);
      form.setFieldsValue({ code, title, category, measurement, status, replacement });
    }
  }, [product]);

  return (
    <Form
      className='--add-product__form'
      name='product-add'
      form={form}
      layout={'vertical'}
      initialvalues={{
        code: product.code,
        title: product.title,
        details: product.details,
        category: product.category,
        measurement: product.measurement,
        status: product.status,
        replacement: product.replacement,
      }}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      <Row gutter={24}>
        <Col xs={24} md={24} lg={5}>
          <Form.Item
            name={'code'}
            label={'Código:'}
            rules={[
              {
                required: true,
                message: 'Ingrese el código del producto!',
              },
            ]}
          >
            <Input />
          </Form.Item>
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
            <Input placeholder='Indique una categoría' initialvalues={product.category} />
          </Form.Item>
        </Col>
      </Row>

      {Object.values(product.details).map((detail, index) => (
        <ProductDetails key={detail.trademark + index} detail={detail} index={index} />
      ))}

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

export const ProductDetails = ({ detail, index }) => {
  useEffect(() => {
    inputRef.current.focus({
      cursor: 'all',
    });
  }, []);

  const onHandleTrademarkChange = () => {
    //setCredit(e.target.checked);
  };

  const inputRef = React.useRef(null);

  return (
    <Form.Item key={detail.trademark}>
      <Row gutter={24}>
        <Col xs={24} lg={5}>
          <Form.Item
            className={`--form-item__container ${`trademark:${detail.trademark}`}`}
            label='Marca:'
            name={`trademark${detail.trademark + index}`}
            initialValue={detail.trademark}
            rules={[
              {
                required: true,
                message: 'Seleccione la marca del producto!',
              },
            ]}
          >
            <Select onChange={onHandleTrademarkChange}>
              <Option value='CAT'>CAT</Option>
              <Option value='CTP'>CTP</Option>
              <Option value='DONALDSON'>DONALDSON</Option>
              <Option value='MAC BEE'>MAC BEE</Option>
              <Option value='WIX'>WIX</Option>
              <Option value=''>{''}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={5}>
          <Form.Item
            className='--form-item__container'
            name={`costPrice${detail.trademark + index}`}
            label='Precio de Costo:'
            initialValue={detail.costPrice}
            rules={[{ required: true }]}
          >
            <Input placeholder='Ingrese precio' style={{ textAlign: 'right' }} ref={inputRef} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={5}>
          <Form.Item
            className='--form-item__container'
            name={`salePrice${detail.trademark + index}`}
            label='Precio de Venta:'
            initialValue={detail.salePrice}
            rules={[{ required: true }]}
          >
            <Input placeholder='Ingrese precio' style={{ textAlign: 'right' }} ref={inputRef} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={4}>
          <Form.Item
            className='--form-item__container'
            name={`location${detail.trademark + index}`}
            label='Locación'
            initialValue={detail.stock[0].location}
            rules={[{ required: true }]}
          >
            <Input placeholder='Ingrese la locación del producto' style={{ textAlign: 'right' }} ref={inputRef} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={5}>
          <Form.Item
            className='--form-item__container'
            name={`qty${detail.trademark + index}`}
            label='Cantidad'
            initialValue={detail.stock[0].qty}
            rules={[{ required: true }]}
          >
            <Input placeholder='Ingrese la cantidad del producto' ref={inputRef} style={{ textAlign: 'right' }} />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

ProductDetails.propTypes = {
  detail: PropTypes.object || PropTypes.string,
  index: PropTypes.number,
};

export const ProductForm = () => {
  const dispatch = useDispatch();

  const { productForm } = useSelector((state) => state.modals);
  const { show, mode } = productForm;

  const onOk = (values) => {
    console.log(values);
    //dispatch(saveNewProduct(values));
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
