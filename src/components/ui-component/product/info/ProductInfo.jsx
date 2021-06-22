import React from 'react';
import PropTypes from 'prop-types';
import { Space, Table } from 'antd';
import { CloseSquareOutlined, PlusSquareFilled } from '@ant-design/icons';

import { jsonToTabular } from '../../../../helpers/jsonTab/json-to-tabular';
import { columns } from '../../../../assets/data/products.dataConfig';
import './product-info.scss';
import { useDispatch } from 'react-redux';
import { productClearActive } from '../../../../actions/products';

export const ProductInfo = ({ product, mode }) => {
  const dispatch = useDispatch();
  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

  /* const addProducForSale = () => {
    console.log(object);
  }; */

  const actionRender = (record) => {
    return (
      <Space size='small'>
        <CloseSquareOutlined className='--action-icon__remove' onClick={clearActiveProduc} />
        <PlusSquareFilled className='--action-icon__add' onClick={() => console.log(record)} />
      </Space>
    );
  };

  const actionColumn = {
    title: '',
    key: 'action',
    render: actionRender,
  };

  if (!columns.find((obj) => obj.key === 'action')) {
    columns.push(actionColumn);
  }

  const productTab = jsonToTabular(product, mode);
  let dataSource = [];

  Object.values(productTab).map((product, index) => {
    let json = { key: index };
    Object.entries(product).map((value) => {
      return (json[value[0]] = value[1]['value']);
    });

    dataSource.push(json);
  });

  return (
    <div className='product-info__container'>
      <Table
        className='--product-info__table'
        dataSource={dataSource}
        columns={columns}
        size='small'
        bordered={true}
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  mode: PropTypes.string,
};
