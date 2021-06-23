import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { findCustomerById, getCustomerByCode } from '../../../../actions/customers';
import { addProductForSale, findProductById, getProductByCode } from '../../../../actions/products';
import { AsyncDataSelect } from '../../../ui-component/async-data-select/AsyncDataSelect';

import { CustomerInfo } from '../../../ui-component/customer/info/CustomerInfo';
import { ProductInfo } from '../../../ui-component/product/info/ProductInfo';
import { Invoice } from '../../../templates/invoice/Invoice';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { ProductsForSale } from '../../../ui-component/product/for-sale/ProductsForSale';
import { getTransactionInfo } from './controllers/getTransactionInfo';
import { getTotals } from './controllers/totals';
import { msgWhenUnmounting } from './controllers/pdfRenderResult';
import { controlNumber, ivaTax } from './controllers/getTransactionInfo';
import './sales.scss';

export const Sales = () => {
  const dispatch = useDispatch();
  const { activeProduct, productsForSale } = useSelector((state) => state.product);
  const { activeCustomer } = useSelector((state) => state.customer);
  const { displayInvoicePdf } = useSelector((state) => state.display);
  const customers = async (value) => await getCustomerByCode(value);
  const products = async (value) => await getProductByCode(value);
  const [key, setKey] = useState(1);

  useEffect(() => {
    getTransactionInfo();
  }, []);

  const data = getTotals(controlNumber, ivaTax);

  const customerResult = (id) => {
    dispatch(findCustomerById(id));
  };

  const productResult = (id) => {
    dispatch(findProductById(id));
  };

  const noDataFounded = (msg) => {
    console.log(msg);
  };

  const setProductForSale = (record) => {
    setKey(key + 1);
    const product = JSON.parse(JSON.stringify(record));
    product.key = key;
    product.qty = 1;
    product.totalItem = product.salePrice;
    dispatch(addProductForSale(product));
  };

  return (
    <div className='--sale-page__container'>
      {displayInvoicePdf && (
        <GeneratePdfFromHtml WrappedComponent={Invoice} data={data} msgWhenUnmounting={msgWhenUnmounting} />
      )}
      <Row>
        <Col className='--sale-page__display'>
          <div className='--search-data__container'>
            <Divider orientation='center'>Busqueda</Divider>
            <div className='--search-customer__title'>Cliente:</div>
            <AsyncDataSelect
              placeholder={'Seleccione un Cliente'}
              dataSource={customers}
              result={customerResult}
              notFoundAsyncData={noDataFounded}
              disabled={Boolean(activeCustomer)}
            />

            <div className='--search-product__title'>Producto:</div>
            <AsyncDataSelect
              placeholder={'Encuentre un Producto'}
              dataSource={products}
              result={productResult}
              notFoundAsyncData={() => {}}
              disabled={Boolean(activeProduct)}
            />
          </div>

          <div className='--info-data__container'>
            {activeCustomer && (
              <div className='--customer-active__container'>
                <Divider className='--customer-active__divider' orientation='center'>
                  Datos del Comprador
                </Divider>
                <CustomerInfo customer={activeCustomer} />
              </div>
            )}
            {activeProduct && (
              <div className='--product-active__container'>
                <Divider className='--product-active__divider' orientation='center'>
                  Datos del Producto
                </Divider>
                <ProductInfo product={activeProduct} mode={'landscape'} setProductForSale={setProductForSale} />
              </div>
            )}
            {productsForSale.length > 0 && (
              <div className='--products-for-sale__container'>
                <Divider className='--products-for-sale__divider' orientation='center'>
                  Productos para la Venta
                </Divider>
                <ProductsForSale products={productsForSale} tax={ivaTax} />
              </div>
            )}
          </div>

          {activeProduct && false && (
            <div className='--image-active__container'>
              <Divider style={{ margin: '10px 0 8px 0' }} orientation='center'>
                Imagen
              </Divider>
              <div className='--image-data__frame'>
                <img src='' alt='' />
              </div>
            </div>
          )}
        </Col>
      </Row>
      {/* {displayAddCustomerForm && <AddCustomerForm />} */}
    </div>
  );
};
