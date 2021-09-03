import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Space, Tag } from 'antd';
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
        className='--customer-card__itself'
        size='small'
        title={
          <div className='--customer-card__title-card'>
            RIF:{'  '}
            <Tag color='#f2bd15' style={{ fontWeight: 'bolder', color: '#000000bf' }}>
              {customer.code}
            </Tag>
          </div>
        }
        extra={<CloseOutlined onClick={clearActiveCustomer} />}
      >
        <Meta
          className='--customer-card__meta'
          title={
            <div className='--customer-card__header'>
              <Space className='--customer-card__header-space' align='center'>
                <Avatar
                  className='--customer-card__header-avatar'
                  shape='square'
                  style={{ backgroundColor: '#f2bd15', color: '#000000bf' }}
                  size={58}
                >
                  <span className='--customer_card__avatar-letter'>
                    {((initials.shift() || '') + (initials.pop() || '')).toUpperCase()}
                  </span>
                </Avatar>
                <div className='--customer-card__name'>{customer.name}</div>
              </Space>
            </div>
          }
        />
        <div className='--customer-card__body'>
          <div className='--customer-card__address-container'>
            <div className='--customer-card__address-label'>Dirección:</div>
            <div className='--customer-card__address-value'>{customer.address}</div>
          </div>
          <div className='--customer-card__phone-container'>
            <PhoneOutlined style={{ fontSize: '24px' }} />
            <div className='--customer-card__phone-number'>{customer.phone}</div>
          </div>
          <div className={'--customer-card__contact-container'}></div>
        </div>
      </Card>
    </div>
  );
};

CustomerCard.propTypes = {
  customer: PropTypes.object,
};
