import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Image, Tooltip, Carousel } from 'antd';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
import './product-info.scss';

const { Meta } = Card;

export const ProductInfo = ({ product, setProductForSale }) => {
  const dispatch = useDispatch();
  const carouselRef = useRef('');

  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

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

  const onChangeCarousel = (e) => {
    console.log(e);
  };

  const handleClickPrev = () => {
    console.log('uuuuuuuuu');
    carouselRef.current.prev();
  };

  const handleClickNext = () => {
    carouselRef.current.next();
  };

  const settings = {
    prevArrow: <LeftOutlined onClick={handleClickPrev} />,
    nextArrow: <RightOutlined onClick={handleClickNext} />,
  };

  return (
    <div className='product-info__container'>
      <Card
        style={{ width: 150 }}
        cover={<Image alt='example' src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />}
        //actions={actions}
        size='small'
        title={product.code}
        extra={<CloseOutlined onClick={clearActiveProduc} />}
      >
        <Meta description={<span>{product.title}</span>} />
        <Carousel
          myRef={carouselRef}
          className='--product-card__carousel'
          arrows
          {...settings}
          dots={false}
          afterChange={onChangeCarousel}
        >
          {Object.values(product.details).map((item) => {
            return (
              <div key={item.trademark} className='--product-card__details'>
                <Tooltip key={item.trademark} placement='topLeft' title='Clic para agregar a la venta'>
                  <Avatar
                    className='--product-card__brand-avatar'
                    src={
                      <img src={`${process.env.PUBLIC_URL}/assets/icons/${item.trademark}.png`} alt={item.trademark} />
                    }
                    //size={48}
                    onClick={() => handleTrademarkClick(item.trademark, item.salePrice)}
                  />
                  {Object.values(item.stock).map((stock) => {
                    return (
                      <div key={1} className='--product-card__stock'>
                        <p>{`Precio: $${item.salePrice}`}</p>
                        <p>{`Cantidad: ${stock.qty}`}</p>
                        <p>{`Locación : ${stock.location}`}</p>
                      </div>
                    );
                  })}
                </Tooltip>
              </div>
            );
          })}
        </Carousel>
      </Card>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  setProductForSale: PropTypes.func,
};
