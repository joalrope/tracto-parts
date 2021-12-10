import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Image, Tooltip, Carousel, Tag } from 'antd';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
import noImage from '../../../../assets/images/no-imagen.png';
import { getUrlIconImage } from '../../../../helpers/getUrlIconImage';
import { getQtyAvailableByTrademark } from '../../../../helpers/products/get-qty-available';
import { getTrademarkIcons } from '../../../../helpers/getTrademarkIcons';
import './product-card.scss';

const { Meta } = Card;

export const ProductCard = ({ product, setProductForSale }) => {
  const dispatch = useDispatch();
  const trademarkCarouselRef = useRef('');
  const stockCarouselRef = useRef('');

  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

  const handleTrademarkClick = (trademark, salePrice, location) => {
    const selectedProduct = {
      id: product.id,
      code: product.code,
      title: product.title,
      trademark,
      location,
      qty: 1,
      qtyAvailable: getQtyAvailableByTrademark(product.details, trademark),
      salePrice,
      totalItem: salePrice,
    };
    console.log(selectedProduct.code);
    setProductForSale(selectedProduct);
  };

  const handleClickPrev = () => {
    trademarkCarouselRef.current.prev();
  };

  const handleClickNext = () => {
    trademarkCarouselRef.current.next();
  };

  const settings = {
    nextArrow: <LeftOutlined onClick={handleClickNext} />,
    prevArrow: <RightOutlined onClick={handleClickPrev} />,
  };

  const url = getUrlIconImage(product.code, product.details[0].trademark);

  return (
    <div className='product-card__container'>
      <Card
        className='--product-card__itself'
        cover={
          <Image
            alt={`${product.code}.jpg`}
            src={url}
            style={{ backgroundColor: '#f2bd15', height: '200px' }}
            fallback={noImage}
          />
        }
        size='small'
        title={
          <div className='--product-card__title-card'>
            Código:{'  '}
            <Tag color='#f2bd15' style={{ fontWeight: 'bolder', color: '#000000bf' }}>
              {product.code}
            </Tag>
          </div>
        }
        extra={<CloseOutlined onClick={clearActiveProduc} />}
      >
        <Meta description={<span>{product.title}</span>} />
        <Carousel myRef={trademarkCarouselRef} className='--product-card__carousel' arrows {...settings} dots={false}>
          {Object.values(product.details).map((item) => {
            return (
              <div key={item.trademark} className='--product-card__details'>
                <Tooltip key={item.trademark} placement='topLeft' title='Clic para agregar a la venta'>
                  <Avatar
                    className='--product-card__brand-avatar'
                    src={<img src={getTrademarkIcons(item.trademark.toLowerCase())} alt={item.trademark} />}
                    //size={48}
                    onClick={() => handleTrademarkClick(item.trademark, item.salePrice, item.stock[0].location)}
                  />

                  <Carousel
                    myRef={stockCarouselRef}
                    className='--product-stock__carousel'
                    arrows
                    {...settings}
                    dots={false}
                  >
                    {Object.values(item.stock).map((stock) => {
                      return (
                        <div key={stock.location} className='--product-card__stock'>
                          <div className='--product-card__stock-items'>
                            <p>Precio:</p>
                            <p>Cantidad:</p>
                            <p>Locación:</p>
                          </div>
                          <div className='--product-card__stock-values'>
                            <p>
                              {Number(item.salePrice).toLocaleString('es-ES', {
                                maximumFractionDigits: 2,
                                minimumFractionDigits: 2,
                              })}
                            </p>
                            <p>{stock.qty}</p>
                            <p>{stock.location}</p>
                          </div>
                        </div>
                      );
                    })}
                  </Carousel>
                </Tooltip>
              </div>
            );
          })}
        </Carousel>
      </Card>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
  setProductForSale: PropTypes.func,
};
