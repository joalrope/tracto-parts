import React from 'react';
import './Input.scss';

export const Input = ({ title, type = 'text', name, onChange, value }) => {
  return (
    <div className={`--input-container --input-${type} --input-${name}`}>
      <label htmlFor={name}>{title}</label>
      <input id={name} name={name} type={type} onChange={onChange} value={value} />
    </div>
  );
};
