import React from 'react';
import PropTypes from 'prop-types';
import './action-button.scss';

export const ActionButtom = ({ type, row, handleClick, title }) => {
  let icon;

  switch (type) {
    case 'delete':
      icon = 'fa fa-backspace';
      break;

    case 'edit':
      icon = 'fa fa-edit';
      break;

    case 'select':
      icon = 'fas fa-cart-plus';
      break;

    case 'up':
      icon = 'fas fa-chevron-up';
      break;

    case 'down':
      icon = 'fas fa-chevron-down';
      break;

    default:
      break;
  }
  const colSpan = title ? 3 : 1;

  return [
    <td key={1} colSpan={colSpan} className='td-action-button'>
      <button className='action-button' onClick={() => handleClick(row)}>
        <i className={icon}></i>
        <span>{title}</span>
      </button>
    </td>,
    colSpan > 1 && ((<td key={2}></td>), (<td key={3}></td>)),
  ];
};

ActionButtom.propTypes = {
  type: PropTypes.string,
  row: PropTypes.number,
  handleClick: PropTypes.func,
  title: PropTypes.string,
};
