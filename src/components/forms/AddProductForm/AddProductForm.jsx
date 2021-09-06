import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { cancelNewProduct, saveNewProduct } from './controller';
import './product-add.scss';

const { Option } = Select;

const AddProduct = ({ form }) => {
  const onHandleTrademarkChange = () => {
    //setCredit(e.target.checked);
  };

  return (
    <Form
      name='product-add'
      form={form}
      layout={'horizontal'}
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      <Form.Item
        name={['code']}
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

      <Form.Item
        label='Deacripcion'
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
      <Form.Item className='--form-item__container'>
        <Form.Item
          className='--form-item__container'
          label='Marca:'
          name='trademark'
          rules={[
            {
              required: true,
              message: 'Seleccione la marca del producto!',
            },
          ]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0 24px 0 0' }}
        >
          <Select onChange={onHandleTrademarkChange}>
            <Option value='CAT'>CAT</Option>
            <Option value='CTP'>CTP</Option>
            <Option value='DONALDSON'>DONALDSON</Option>
            <Option value='MAC BEE'>MAC BEE</Option>
            <Option value='WIX'>WIX</Option>
          </Select>
        </Form.Item>
        <Form.Item
          className='--form-item__container'
          name='category'
          label='Categoría'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Input placeholder='Indique una categoría' />
        </Form.Item>
      </Form.Item>
      <Form.Item className='--form-item__container'>
        <Form.Item
          className='--form-item__container'
          name='costPrice'
          label='Precio de Costo'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0 24px 0 0' }}
        >
          <Input placeholder='Ingrese precio' />
        </Form.Item>
        <Form.Item
          className='--form-item__container'
          name='salePrice'
          label='Precio de Venta'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Input placeholder='Ingrese precio' />
        </Form.Item>
      </Form.Item>

      <Form.Item className='--form-item__container'>
        <Form.Item
          className='--form-item__container'
          name='location'
          label='Locación'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0 24px 0 0' }}
        >
          <Input placeholder='Ingrese la locación del producto' />
        </Form.Item>
        <Form.Item
          className='--form-item__container'
          name='qty'
          label='Cantidad'
          rules={[{ required: true }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Input placeholder='Ingrese la cantidad del producto' />
        </Form.Item>
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

      <Form.Item className='--form-item__container'>
        <Form.Item
          className='--form-item__container'
          name='measurement'
          label='Medidas'
          rules={[{ required: false }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)', margin: '0 24px 0 0' }}
        >
          <Input placeholder='Medidas' />
        </Form.Item>
        <Form.Item
          className='--form-item__container'
          name='status'
          label='Estado'
          rules={[{ required: false }]}
          style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
        >
          <Input placeholder='Estado del producto' />
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

AddProduct.propTypes = {
  form: PropTypes.object,
};

export const AddProductForm = () => {
  const dispatch = useDispatch();
  const { displayFormProductAdd } = useSelector((state) => state.display);

  const onOk = (values) => {
    dispatch(saveNewProduct(values));
  };

  const onCancel = () => {
    dispatch(cancelNewProduct());
  };

  return (
    <ModalForm
      WrappedComponent={AddProduct}
      title={'Crear Producto'}
      visible={displayFormProductAdd}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
    />
  );
};

AddProductForm.propTypes = {
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};
