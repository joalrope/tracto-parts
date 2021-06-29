import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Card, Avatar, Image, /*Table,*/ Tooltip } from 'antd';
import { CloseSquareOutlined, PlusSquareFilled } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
import { jsonToTabular } from '../../../../helpers/jsonTab/json-to-tabular';
import { columns } from '../../../../assets/data/products.dataConfig';
import './product-info.scss';
import cat from '../../../../assets/images/cat.png';

//import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;

export const ProductInfo = ({ product, mode, setProductForSale }) => {
  const dispatch = useDispatch();
  const { productsForSale } = useSelector((state) => state.product);
  const item = productsForSale.length + 1;

  /*  const Item = productForSale.length;
  console.log(Item); */

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
    let json = { key: item };
    Object.entries(product).map((value) => {
      return (json[value[0]] = value[1]['value']);
    });

    dataSource.push(json);
  });

  console.log(dataSource[0]);

  return (
    <div className='product-info__container'>
      {/* <Table
        className='--product-info__table'
        dataSource={dataSource}
        columns={columns}
        size='small'
        bordered={true}
        scroll={{ x: 'max-content' }}
        pagination={false}
      /> */}
      <Card
        style={{ width: 200 }}
        cover={<img alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        actions={[
          <p key='ctp' style={{ margin: 0, padding: 0 }}>
            <p style={{ margin: 0, padding: 0 }}>{dataSource[0].qty}</p>
            <Avatar src={<Image src={cat} />} />
            <p style={{ margin: 0, padding: 0 }}>{`${dataSource[0].salePrice}`}</p>
          </p>,
          <p key='cat' style={{ margin: 0, padding: 0 }}>
            <p style={{ margin: 0, padding: 0 }}>{dataSource[0].qty}</p>
            <Avatar src={<Image src='https://www.costex.com/wp-content/uploads/2021/01/ctp_2021-logo.png' />} />
            <p style={{ margin: 0, padding: 0 }}>{`${dataSource[0].salePrice}`}</p>
          </p>,
        ]}
        size='small'
        //type='inner'
      >
        <Meta
          //avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
          description={dataSource[0].title}
          title={dataSource[0].code}
        />
      </Card>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  mode: PropTypes.string,
  setProductForSale: PropTypes.func,
};
