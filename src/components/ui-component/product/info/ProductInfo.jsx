import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Image, Collapse, Tooltip } from 'antd';
import { CloseOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
//import cat from '../../../../assets/images/cat.png';
import './product-info.scss';

const { Meta } = Card;
const { Panel } = Collapse;

export const ProductInfo = ({ product, setProductForSale }) => {
  const dispatch = useDispatch();
  const dataSource = product;

  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

  const genExtra = () => (
    <Tooltip placement='topLeft' title='Detalles'>
      <CheckCircleTwoTone />
    </Tooltip>
  );

  const handleTrademarkClick = (trademark, salePrice) => {
    const selectedProduct = {
      id: product.id,
      code: product.code,
      title: product.title,
      trademark,
      qty: 1,
      salePrice,
      totalItem: salePrice,
    };
    setProductForSale(selectedProduct);
  };

  const action = dataSource.details.map((item) => {
    return (
      <div key={item.trademark}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Tooltip placement='topLeft' title='Clic para agregar a la venta'>
            <Avatar
              src={<img src={`${process.env.PUBLIC_URL}/assets/icons/${item.trademark}.png`} alt={item.trademark} />}
              size={24}
              onClick={() => handleTrademarkClick(item.trademark, item.salePrice)}
            />
          </Tooltip>
        </div>

        <Collapse bordered={false} style={{ backgroundColor: 'transparent' }}>
          <Panel showArrow={false} header={<span>{`$${item.salePrice}`}</span>} key='1' extra={genExtra()}>
            {Object.values(item.stock).map((loc) => (
              <div key={loc.location} className='stock'>
                <p>{`Cant: ${loc.qty}`}</p>
                <p>{`Loc : ${loc.location}`}</p>
              </div>
            ))}
          </Panel>
        </Collapse>
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
