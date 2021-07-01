import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Image, /* Collapse, */ Tooltip } from 'antd';
import { CloseOutlined /* , CheckCircleTwoTone  */ } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
import cat from '../../../../assets/images/cat.png';
import './product-info.scss';

const { Meta } = Card;
//const { Panel } = Collapse;

export const ProductInfo = ({ product, setProductForSale }) => {
  const dispatch = useDispatch();
  const dataSource = product;

  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

  /*  const genExtra = () => (
    <Tooltip placement='topLeft' title='Detalles'>
      <CheckCircleTwoTone />
    </Tooltip>
  ); */

  const action = dataSource.details.map((item) => {
    return (
      <div key={item.trademark}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tooltip placement='topLeft' title='Clic para agregar a la venta'>
            <Avatar src={<img src={cat} />} size={24} onClick={() => setProductForSale(product)} />
          </Tooltip>
        </div>
        {/*  <Collapse bordered={false} style={{ backgroundColor: 'transparent' }}>
          <Panel showArrow={false} header={<span>{`$${item.salePrice}`}</span>} key='1' extra={genExtra()}>
            <p>{`Cant: ${item.details.qty}`}</p>
            <p>{`Loc : ${item.details.location}`}</p>
          </Panel>
        </Collapse> */}
      </div>
    );
  });

  const actions = [];
  actions.push(action);

  return (
    <div className='product-info__container'>
      <Card
        style={{ width: 150 }}
        cover={<Image alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        actions={actions}
        size='small'
        title={dataSource.code}
        extra={<CloseOutlined onClick={clearActiveProduc} />}
      >
        <Meta description={<span>{dataSource.title}</span>} />
      </Card>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  setProductForSale: PropTypes.func,
};
