import React from 'react';
//import { useDispatch } from 'react-redux';
import { Popconfirm } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';

export const PrintActionRender = (record) => {
  //const dispatch = useDispatch();
  const printDeliveryNote = (data) => {
    console.log(data);
  };
  return (
    <div className='print-action__column'>
      <Popconfirm
        title={`¿Seguro desea imprimir la nota ?`}
        onConfirm={() => printDeliveryNote(record)}
        okText='Si'
        cancelText='No'
        placement='topRight'
      >
        <PrinterOutlined className='--action-icon__print' />
      </Popconfirm>
    </div>
  );
};
