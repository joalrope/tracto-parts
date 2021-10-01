import React from 'react';
import PropTypes from 'prop-types';
import { PlusSquareOutlined } from '@ant-design/icons';

export const MainLabel = ({ label, field, array, index, add }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {array.length - 1 === index && (
          <PlusSquareOutlined
            style={{
              color: '#5cb85c',
              fontSize: '18px',
              marginLeft: 10,
            }}
            onClick={() => add(field.name)}
          />
        )}
      </div>
    </div>
  );
};

MainLabel.propTypes = {
  label: PropTypes.string,
  field: PropTypes.object,
  array: PropTypes.array,
  index: PropTypes.number,
  add: PropTypes.func,
};
