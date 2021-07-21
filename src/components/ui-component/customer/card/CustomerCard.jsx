import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Space } from 'antd';
import PropTypes from 'prop-types';
import { PhoneOutlined, CloseOutlined } from '@ant-design/icons';
import { customerClearActive } from '../../../../actions/customers';
import './customer-card.scss';

const { Meta } = Card;

export const CustomerCard = ({ customer }) => {
  const initials = customer.name.match(/\b\w/g) || [];
  const dispatch = useDispatch();

  const clearActiveCustomer = () => {
    dispatch(customerClearActive());
  };

  return (
    <div className='--customer-card__container'>
      <Card
        style={{ width: 250, border: '1px solid $border-color' }}
        //actions={[<SettingOutlined key='setting' />, <EditOutlined key='edit' />, <EllipsisOutlined key='ellipsis' />]}
        title={<div className='--customer-card__code'>{`RIF: ${customer.code}`}</div>}
        extra={<CloseOutlined onClick={clearActiveCustomer} />}
      >
        <Meta
          title={
            <div className='--customer-card__header'>
              <Space align='center'>
                <Avatar shape='square' style={{ backgroundColor: '#000000bf' }} size={58}>
                  <span className='--customer_card__avatar-letter'>
                    {((initials.shift() || '') + (initials.pop() || '')).toUpperCase()}
                  </span>
                </Avatar>
                <div className='--customer-card__name'>{customer.name}</div>
              </Space>
            </div>
          }
        />
        <div className='--customer-card__address-container'>
          <div className='--customer-card__address-label'>Dirección:</div>
          <div className='--customer-card__address-value'>{customer.address}</div>
        </div>
        <div className='--customer-card__phone-container'>
          <PhoneOutlined style={{ fontSize: '24px' }} />
          <div className='--customer-card__phone-number'>{customer.phone}</div>
        </div>
        <div className={'--customer-card__contact-container'}></div>
      </Card>
    </div>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.object,
};
