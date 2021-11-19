import React from 'react';
import PropTypes from 'prop-types';
import { CloseSquareOutlined /* , PlusOutlined */ } from '@ant-design/icons';

export const RemoveIcon = ({ onClick }) => {
  return (
    <CloseSquareOutlined
      style={{
        color: '#dc1919',
        fontSize: '18px',
      }}
      onClick={onClick}
    />
  );
};

RemoveIcon.propTypes = {
  onClick: PropTypes.func,
};
