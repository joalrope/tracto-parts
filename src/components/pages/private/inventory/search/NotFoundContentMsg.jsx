import React from 'react';
import { Button } from 'antd';

const buttonWidth = '75px';

export const NotFoundContentMsg = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p> No Existe. Desea Agregarlo?</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button style={{ width: buttonWidth, marginRight: '10px' }} size='small' type='danger'>
          {' '}
          Cancelar{' '}
        </Button>
        <Button style={{ width: buttonWidth }} size='small' type='primary'>
          {' '}
          Aceptar{' '}
        </Button>
      </div>
    </div>
  );
};
