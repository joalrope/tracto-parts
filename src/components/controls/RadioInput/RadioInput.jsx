import React from 'react';
import PropTypes from 'prop-types';
import './radio-input.scss';

export const RadioInput = ({ label, value, checked, setter, handleOnChange }) => {
  const onChange = () => {
    setter(value);
    handleOnChange(value);
  };

  return (
    <label className='ri-label'>
      <input className='ri-input' type='radio' checked={checked === value} onChange={onChange} />
      <span className='ri-span'>{label}</span>
    </label>
  );
};

RadioInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.string,
  setter: PropTypes.func,
  handleOnChange: PropTypes.func,
};
