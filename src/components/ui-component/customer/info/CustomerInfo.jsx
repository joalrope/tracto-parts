import React from 'react'
import PropTypes from 'prop-types';
import { Descriptions} from 'antd'
import {CloseCircleOutlined} from '@ant-design/icons'
import './customer-info.scss'

export const CustomerInfo = ({data}) => {
  const styleClose= { fontSize: '24px', marginRight:'10px', color: 'red' }
  const layout = 'horizontal'
  const infoWidth = (layout === 'horizontal') ? '800px' : '400px'
  const column = 12
  const itemCol = (col) => column/6*col
  return (
    <div>
      <Descriptions title="Datos del Cliente" layout={layout} style={{width: infoWidth, marginTop:'20px'}} extra={<div><CloseCircleOutlined style={styleClose} onClick={()=> console.log('eliminar cliente')} /></div>} column={column} size='small' bordered>
        <Descriptions.Item label="Nombre:"     span={itemCol(4)}>{data.name}</Descriptions.Item>
        <Descriptions.Item label="Rif/Cédula:" span={itemCol(1)}>{data.code}</Descriptions.Item>
        <Descriptions.Item label="Teléfonos:"  span={itemCol(1)}>{data.phone}</Descriptions.Item>
        <Descriptions.Item label="Dirección:"  span={itemCol(6)}>{data.address}</Descriptions.Item>

      </Descriptions>
    </div>
  )
}

CustomerInfo.propTypes = {
  data: PropTypes.object,
};