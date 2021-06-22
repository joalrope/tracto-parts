import React from 'react';
import { useDispatch } from 'react-redux';
import { Table, Space, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { CloseSquareOutlined, EditOutlined } from '@ant-design/icons';
import { jsonToTabular } from '../../../../helpers/jsonTab/json-to-tabular';
import { columns } from '../../../../assets/data/customer.dataConfig';
import { customerClearActive } from '../../../../actions/customers';
import './customer-info.scss';

export const CustomerInfo = ({ customer }) => {
  const dispatch = useDispatch();

  const clearActiveCustomer = () => {
    dispatch(customerClearActive());
  };

  const actionRender = () => {
    return (
      <Space className='--action-buttons' size='small'>
        <Tooltip placement='topLeft' title='Eliminar Comprador'>
          <CloseSquareOutlined className='--action-icon__remove' onClick={clearActiveCustomer} />
        </Tooltip>
        <EditOutlined className='--action-icon__edit' onClick={clearActiveCustomer} />
      </Space>
    );
  };

  const actionColumn = {
    title: '',
    key: 'action',
    align: 'center',
    render: actionRender,
  };

  if (!columns.find((obj) => obj.key === 'action')) {
    columns.push(actionColumn);
  }

  const productTab = jsonToTabular(customer);
  let dataSource = [];

  Object.values(productTab).map((product, index) => {
    let json = { key: index };
    Object.entries(product).map((value) => {
      return (json[value[0]] = value[1]['value']);
    });

    dataSource.push(json);
  });

  return (
    <div className='--customer-info__container'>
      <Table
        className='--customer-info__table'
        dataSource={dataSource}
        columns={columns}
        size='small'
        scroll={{ x: 'max-content' }}
        bordered={true}
        pagination={false}
      />
    </div>
  );
};

CustomerInfo.propTypes = {
  customer: PropTypes.object,
};
