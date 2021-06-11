import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from 'antd';

export const ItemFound = ({ item }) => {
  return (
    <div className='--item-found__container'>
      <span className='--item-found__code'> {item.code} </span>
      <Divider type='vertical' />
      <span className='--item-found__title'>{item.title}</span>
    </div>
  );
};

ItemFound.propTypes = {
  item: PropTypes.object,
};
