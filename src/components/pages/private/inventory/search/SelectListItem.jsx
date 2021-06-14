import React from 'react';
import PropTypes from 'prop-types';
import './select-list-item.scss';

export const SelectListItem = ({ item }) => {
  return (
    <div className='--select-list-item__container'>
      <span className='--select-list-item__code'> {item.key} </span>
      <span className='--select-list-item__title'>{item.label}</span>
    </div>
  );
};

SelectListItem.propTypes = {
  item: PropTypes.object,
};
