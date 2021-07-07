import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Card, Avatar, Image, Tooltip, Carousel, Tag } from 'antd';
import { CloseOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import { productClearActive } from '../../../../actions/products';
//import { getImageFromUrl } from '../../../../helpers/getImage';
import noImage from '../../../../assets/images/no-image.jpeg';
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
    carouselRef.current.prev();
  };

  const handleClickNext = () => {
    carouselRef.current.next();
  };

  const settings = {
    prevArrow: <LeftOutlined onClick={handleClickPrev} />,
    nextArrow: <RightOutlined onClick={handleClickNext} />,
  };

  const [productImage, setProductImage] = useState(noImage);

  useEffect(async () => {
    if (product.details[0].trademark.toUpperCase() === 'CAT' || product.details[0].trademark.toUpperCase() === 'CTP') {
      /* const result = await getImageFromUrl(
        `https://www.ctpsales.costex.com:11443/Webpics/BigPictures/${product.code}.jpg`
      );
      console.log(result); */
      setProductImage(`https://www.ctpsales.costex.com:11443/Webpics/BigPictures/${product.code}.jpg`);
      //console.log(productImage);
    } else {
      console.log('no CAT or CTP', product.details[0].trademark);
    }
  }, [product.code]);

  //let productImage = '../../../../assets/images/no-image.jpeg';
  //`https://www.ctpsales.costex.com:11443/Webpics/BigPictures/${product.code}.jpg`

  return (
    <div className='product-info__container'>
      <Card
        style={{ width: 200 }}
        cover={<Image alt='example' src={productImage} />}
        //actions={actions}
        size='small'
        title={
          <Tag color='#001529' style={{ fontWeight: 'bolder' }}>
            {product.code}
          </Tag>
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
          afterChange={onChangeCarousel}
        >
          {Object.values(product.details).map((item) => {
            return (
              <div key={item.trademark} className='--product-card__details'>
                {}
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
                        <div className='--product-card__stock-items'>
                          <p>Precio:</p>
                          <p>Cantidad:</p>
                          <p>Locación:</p>
                        </div>
                        <div className='--product-card__stock-values'>
                          <p>{item.salePrice}</p>
                          <p>{stock.qty}</p>
                          <p>{stock.location}</p>
                        </div>
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
