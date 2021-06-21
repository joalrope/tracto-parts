import React from 'react';
import { Table } from 'antd';
import { jsonToTabular } from '../../../helpers/jsonTab/json-to-tabular';
import { jsonSort } from '../../../helpers/json-sort';
import { columns, template } from '../../../assets/data/products.dataConfig';
import './product-info.scss';

export const ProductInfo = ({ product, mode }) => {
  const productTab = jsonToTabular(product, mode);
  console.log(product);
  let dataSource = [];

  Object.values(productTab).map((product) => {
    let json = {};
    Object.entries(product).map((value) => {
      return (json[value[0]] = value[1]['value']);
    });
    //const orderedJson = jsonSort(json, template);

    dataSource.push(json);
  });

  return (
    <div>
      <Table
        className='--product-info__container'
        //style={{ marginTop: '25px' }}
        dataSource={dataSource}
        columns={columns}
        size='small'
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    </div>
  );
};
