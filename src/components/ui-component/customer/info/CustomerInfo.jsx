import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import { Descriptions } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import './customer-info.scss';
import { useDispatch } from 'react-redux';
import { customerClearActive } from '../../../../actions/customers';

export const CustomerInfo = ({ data }) => {
  const dispatch = useDispatch();
  const style = { fontSize: '24px', marginRight: '10px', color: 'red' };
  const layout = 'horizontal';
  const column = 12;
  const itemCol = (col) => (column / 6) * col;

  const clearActiveCustomer = () => {
    dispatch(customerClearActive());
  };
  return (
    <div className='customer-info__container'>
      <Descriptions
        title='Datos del Cliente'
        layout={layout}
        extra={
          <div>
            <CloseSquareOutlined style={style} onClick={clearActiveCustomer} />
=======
import { useDispatch } from 'react-redux';
import { Descriptions } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { customerClearActive } from '../../../../actions/customers';
import './customer-info.scss';

export const CustomerInfo = ({ data }) => {
  const dispatch = useDispatch();
  const styleClose = { fontSize: '24px', marginRight: '10px', color: 'red' };
  const layout = 'horizontal';
  const infoWidth = layout === 'horizontal' ? '800px' : '400px';
  const column = 12;
  const itemCol = (col) => (column / 6) * col;

  const clearCustomer = () => {
    dispatch(customerClearActive());
  };

  return (
    <div>
      <Descriptions
        title='Datos del Cliente'
        layout={layout}
        style={{ width: infoWidth, marginTop: '20px' }}
        extra={
          <div>
            <CloseSquareOutlined style={styleClose} onClick={clearCustomer} />
>>>>>>> ddb17498987d87bf71939e622ed36e97000306e8
          </div>
        }
        column={column}
        size='small'
        bordered
      >
        <Descriptions.Item label='Nombre:' span={itemCol(4)}>
          {data.name}
        </Descriptions.Item>
        <Descriptions.Item label='Rif/Cédula:' span={itemCol(1)}>
          {data.code}
        </Descriptions.Item>
        <Descriptions.Item label='Teléfonos:' span={itemCol(1)}>
          {data.phone}
        </Descriptions.Item>
        <Descriptions.Item label='Dirección:' span={itemCol(6)}>
          {data.address}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

CustomerInfo.propTypes = {
  data: PropTypes.object,
};
