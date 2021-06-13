import React from 'react';
import PropTypes from 'prop-types';
import './item-found.scss';

export const ItemFound = ({ item }) => {
  return (
    <div className='--list-item__container'>
      <span className='--list-item__code'> {item.key} </span>
      <span className='--list-item__title'>{item.label}</span>
    </div>
  );
};

ItemFound.propTypes = {
  item: PropTypes.object,
};
