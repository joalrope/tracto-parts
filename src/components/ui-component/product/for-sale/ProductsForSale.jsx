import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { forSaleColumns } from '../../../../assets/data/products.dataConfig';
import { jsonToTabular } from '../../../../helpers/jsonTab/json-to-tabular';
import './products-for-sale.scss';

export const ProductsForSale = ({ products, mode }) => {
  const tabulatedProduct = jsonToTabular(products, mode);
  let dataSource = [];

  Object.values(tabulatedProduct).map((product) => {
    let json = {};
    Object.entries(product).map((value) => {
      return (json[value[0]] = value[1]['value']);
    });

    dataSource.push(json);
  });

  return (
    <div className='products-for-sale__container'>
      <Table
        className='--product-for-sale__table'
        dataSource={dataSource}
        columns={forSaleColumns}
        size='small'
        bordered={true}
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    </div>
  );
};

ProductsForSale.propTypes = {
  products: PropTypes.array,
  mode: PropTypes.string,
};
