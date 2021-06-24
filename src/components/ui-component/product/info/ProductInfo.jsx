import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Space, Table, Tooltip } from 'antd';
import { CloseSquareOutlined, PlusSquareFilled } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
import { jsonToTabular } from '../../../../helpers/jsonTab/json-to-tabular';
import { columns } from '../../../../assets/data/products.dataConfig';
import './product-info.scss';

export const ProductInfo = ({ product, mode, setProductForSale }) => {
  const dispatch = useDispatch();

  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

  const actionRender = (record) => {
    return (
      <Space size='small'>
        <Tooltip placement='topLeft' title='Eliminar Producto'>
          <CloseSquareOutlined className='--action-icon__remove' onClick={clearActiveProduc} />
        </Tooltip>
        <Tooltip placement='topLeft' title='Agregar para la venta'>
          <PlusSquareFilled className='--action-icon__add' onClick={() => setProductForSale(record)} />
        </Tooltip>
      </Space>
    );
  };

  const actionColumn = {
    title: '',
    key: 'action',
    width: 50,
    render: actionRender,
  };

  if (!columns.find((obj) => obj.key === 'action')) {
    columns.push(actionColumn);
  }

  const tabulatedProduct = jsonToTabular(product, mode);
  let dataSource = [];

  Object.values(tabulatedProduct).map((product) => {
    let json = { key: 1 };
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
  setProductForSale: PropTypes.func,
};
