<<<<<<< HEAD
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const buttonWidth = '75px';

export const NotFoundContentMsg = ({ noFoundResult }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p> No Existe. Desea Agregarlo?</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          onClick={() => noFoundResult('cl')}
          style={{ width: buttonWidth, marginRight: '10px' }}
          size='small'
          type='danger'
        >
          Cancelar
        </Button>
        <Button onClick={() => noFoundResult('ok')} style={{ width: buttonWidth }} size='small' type='primary'>
          Aceptar
        </Button>
      </div>
    </div>
  );
};

NotFoundContentMsg.propTypes = {
  noFoundResult: PropTypes.func,
};
=======
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const buttonWidth = '75px';

export const NotFoundContentMsg = ({ noFoundresult }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p> No Existe. Desea Agregarlo?</p>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          onClick={() => noFoundresult('cl')}
          style={{ width: buttonWidth, marginRight: '10px' }}
          size='small'
          type='danger'
        >
          Cancelar
        </Button>
        <Button onClick={() => noFoundresult('ok')} style={{ width: buttonWidth }} size='small' type='primary'>
          Aceptar
        </Button>
      </div>
    </div>
  );
};

NotFoundContentMsg.propTypes = {
  noFoundresult: PropTypes.func,
};
>>>>>>> ddb17498987d87bf71939e622ed36e97000306e8
