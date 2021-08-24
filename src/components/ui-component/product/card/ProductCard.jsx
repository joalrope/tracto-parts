import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Image, Tooltip, Carousel, Tag } from 'antd';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
import { getUrlImage } from '../../../../helpers/getUrlImage';
//import { urlImages } from '../../../../assets/data/urlImages';
import noImage from '../../../../assets/images/no-imagen.png';
import { getTrademarkIcons } from '../../../../helpers/getTrademarkIcons';
import './product-card.scss';

const { Meta } = Card;
/* <img src={`${process.env.PUBLIC_URL}/assets/icons/${item.trademark}.png`} alt={item.trademark} /> */

export const ProductCard = ({ product, setProductForSale }) => {
  const dispatch = useDispatch();
  const carouselRef = useRef('');
  const stockCarouselRef = useRef('');

  const clearActiveProduc = () => {
    dispatch(productClearActive());
  };

  let qtyAvailable = 0;
  const handleTrademarkClick = (trademark, salePrice, location) => {
    product.details.map((detail) => {
      if (detail.trademark === trademark) {
        detail.stock.map((stock) => {
          qtyAvailable = qtyAvailable + stock.qty;
        });
      }
    });

    const selectedProduct = {
      id: product.id,
      code: product.code,
      title: product.title,
      trademark,
      location,
      qty: 1,
      qtyAvailable,
      salePrice,
      totalItem: salePrice,
    };
    setProductForSale(selectedProduct);
  };

  const handleClickPrev = () => {
    carouselRef.current.prev();
  };

  const handleClickNext = () => {
    carouselRef.current.next();
  };

  const settings = {
    nextArrow: <LeftOutlined onClick={handleClickPrev} />,
    prevArrow: <RightOutlined onClick={handleClickNext} />,
  };

  const url = getUrlImage(product.code, product.details[0].trademark);

  return (
    <div className='product-card__container'>
      <Card
        className='--product-card__itself'
        cover={
          <Image
            alt={`${product.code}.jpg`}
            src={url}
            style={{ backgroundColor: '#f2bd15' }}
            //src={`${urlImages[product.details[0].trademark.toLowerCase()]}${product.code}.jpg`}
            fallback={noImage}
          />
        }
        //actions={actions}
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
        <Carousel
          myRef={carouselRef}
          className='--product-card__carousel'
          arrows
          {...settings}
          dots={false}
          //afterChange={onChangeCarousel}
        >
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
                    //afterChange={onChangeCarousel}
                  >
                    {Object.values(item.stock).map((stock) => {
                      return (
                        <div key={stock.location} className='--product-card__stock' noStyle>
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
