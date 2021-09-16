import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Form, Input, Row, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { cancelNewProduct, saveNewProduct } from './controller';
import './product-add.scss';

const { Option } = Select;

const emptyProduct = {
  code: '',
  title: '',
  details: {
    costPrice: '',
    salePrice: '',
    stock: {
      location: '',
      qty: '',
    },
  },
  category: '',
  measurement: '',
  status: '',
  replacement: '',
};

export const ProductForm = ({ form }) => {
  const { activeProduct } = useSelector((state) => state.product);
  const product = activeProduct || emptyProduct;

  return (
    <Form
      className='--add-product__form'
      name='product-add'
      form={form}
      layout={'vertical'}
      initialValues={{
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
            <Input value='Titulo de Producto' />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={5}>
          <Form.Item className='--form-item__container' name='category' label='Categoría:' rules={[{ required: true }]}>
            <Input placeholder='Indique una categoría' value={'categorizate'} />
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

ProductForm.propTypes = {
  form: PropTypes.object,
  product: PropTypes.object,
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
          {console.log(`trademark${detail.trademark + index}`)}
          <Form.Item
            className={`--form-item__container ${`trademark:${detail.trademark}`}`}
            label='Marca:'
            name={`trademark${detail.trademark + index}`}
            rules={[
              {
                required: true,
                message: 'Seleccione la marca del producto!',
              },
            ]}
          >
            <Select onChange={onHandleTrademarkChange} defaultValue={`${detail.trademark}`}>
              <Option value='CAT'>CAT</Option>
              <Option value='CTP'>CTP</Option>
              <Option value='DONALDSON'>DONALDSON</Option>
              <Option value='MAC BEE'>MAC BEE</Option>
              <Option value='WIX'>WIX</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} lg={5}>
          {console.log(`costPrice${detail.trademark + index}`)}
          <Form.Item
            className='--form-item__container'
            name={`costPrice${detail.trademark + index}`}
            label='Precio de Costo:'
            rules={[{ required: true }]}
          >
            <Input
              placeholder='Ingrese precio'
              defaultValue={detail.costPrice}
              style={{ textAlign: 'right' }}
              ref={inputRef}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={5}>
          {console.log(`salePrice${detail.trademark + index}`)}
          <Form.Item
            className='--form-item__container'
            name={`salePrice${detail.trademark + index}`}
            label='Precio de Venta:'
            rules={[{ required: true }]}
          >
            <Input
              placeholder='Ingrese precio'
              defaultValue={detail.salePrice}
              style={{ textAlign: 'right' }}
              ref={inputRef}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={4}>
          {console.log(`location${detail.trademark + index}`)}
          <Form.Item
            className='--form-item__container'
            name={`location${detail.trademark + index}`}
            label='Locación'
            rules={[{ required: true }]}
          >
            <Input
              placeholder='Ingrese la locación del producto'
              defaultValue={detail.stock[0].location}
              style={{ textAlign: 'right' }}
              ref={inputRef}
            />
          </Form.Item>
        </Col>
        <Col xs={24} lg={5}>
          {console.log(`qty${detail.trademark + index}`)}
          <Form.Item
            className='--form-item__container'
            name={`qty${detail.trademark + index}`}
            label='Cantidad'
            rules={[{ required: true }]}
          >
            <Input
              placeholder='Ingrese la cantidad del producto'
              defaultValue={detail.stock[0].qty}
              ref={inputRef}
              style={{ textAlign: 'right' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form.Item>
  );
};

ProductDetails.propTypes = {
  detail: PropTypes.object,
  index: PropTypes.number,
};

export const AddProductForm = () => {
  const dispatch = useDispatch();

  const { displayFormProductAdd } = useSelector((state) => state.display);

  const onOk = (values) => {
    dispatch(saveNewProduct(values));
  };

  const onCancel = (form) => {
    form.resetFields();
    dispatch(cancelNewProduct());
  };

  return (
    <ModalForm
      WrappedComponent={ProductForm}
      title={'Crear Producto'}
      visible={displayFormProductAdd}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
      width={'33vw'}
    />
  );
};

AddProductForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
