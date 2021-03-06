import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const buttonWidth = '75px';

export const NotFoundContentMsg = ({ msg, noFoundResult, value }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p> {msg}</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        {/* <Button
          onClick={() => noFoundResult('cancel')}
          style={{ width: buttonWidth, marginRight: '10px' }}
          size='small'
        >
          Cancelar
        </Button> */}
        <Button onClick={() => noFoundResult(value)} style={{ width: buttonWidth }} size='small' type='primary'>
          Aceptar
        </Button>
      </div>
    </div>
  );
};

NotFoundContentMsg.propTypes = {
  value: PropTypes.string,
  msg: PropTypes.string,
  noFoundResult: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};
