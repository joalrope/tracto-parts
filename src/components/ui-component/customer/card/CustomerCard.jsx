import React from 'react';
//import { useDispatch } from 'react-redux';
import { Card, Avatar, Space } from 'antd';
import PropTypes from 'prop-types';
import { PhoneOutlined } from '@ant-design/icons';
//import { customerClearActive } from '../../../../actions/customers';
import './customer-card.scss';

//const { Meta } = Card;

export const CustomerCard = ({ customer }) => {
  const initials = customer.name.match(/\b\w/g) || [];
  console.log(customer);
  /* const dispatch = useDispatch();

  const clearActiveCustomer = () => {
    dispatch(customerClearActive());
  }; */

  return (
    <div className='--customer-card__container'>
      <Card
        style={{ width: 350, border: '1px solid $border-color' }}
        //actions={[<SettingOutlined key='setting' />, <EditOutlined key='edit' />, <EllipsisOutlined key='ellipsis' />]}
      >
        <div className='--customer-card__header'>
          <Space align='center'>
            <Avatar shape='square' style={{ backgroundColor: '#000000bf' }} size={58}>
              <spam className='--customer_card__avatar-letter'>
                {((initials.shift() || '') + (initials.pop() || '')).toUpperCase()}
              </spam>
            </Avatar>
            <div className='--customer-card__code-name'>
              <div className='--customer-card_code-name-labels'>
                <div>RIF:</div>
                <div>Nombre:</div>
              </div>
              <div>
                <div className='--customer-card__code'>{customer.code}</div>
                <div className='--customer-card__name'>{customer.name}</div>
              </div>
            </div>
          </Space>
        </div>
        <div className='--customer-card__address-container'>
          <div className='--customer-card__address-label'>Dirección:</div>
          <div className='--customer-card__address-value'>{customer.address}</div>
        </div>
        <div className='--customer-card__phone-container'>
          <PhoneOutlined style={{ fontSize: '24px' }} />
          <div className='--customer-card__phone-number'>{customer.phone}</div>
        </div>
      </Card>
    </div>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.object,
};
