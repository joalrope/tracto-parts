import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Col } from 'antd';
import { findCustomerById, getCustomerByCode } from '../../../../actions/customers';
import { findProductById, getProductByCode } from '../../../../actions/products';
import { AsyncDataSelect } from '../../../ui-component/async-data-select/AsyncDataSelect';

import { CustomerInfo } from '../../../ui-component/customer/info/CustomerInfo';
import { ProductInfo } from '../../../ui-component/product/info/ProductInfo';
import { Invoice } from '../../../templates/invoice/Invoice';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { ProductsForSale } from './ProductForSale/ProductsForSale';
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

  return (
    <div className='container mt-5'>
      <div className='search'>
        {displayInvoicePdf && (
          <GeneratePdfFromHtml WrappedComponent={Invoice} data={data} msgWhenUnmounting={msgWhenUnmounting} />
        )}
        <Row>
          <Col xs={24} sm={12} md={8} lg={8} xl={8}>
            <div className='--search-data__container'>
              <Divider style={{ margin: '5px 0' }} orientation='center'>
                Busqueda
              </Divider>
              <AsyncDataSelect
                placeholder={'Seleccione un Cliente'}
                style={{ width: '100%' }}
                dataSource={customers}
                result={customerResult}
                notFoundAsyncData={noDataFounded}
              />

              <AsyncDataSelect
                placeholder={'Encuentre un Producto'}
                style={{ width: '100%', marginTop: '10px' }}
                dataSource={products}
                result={productResult}
                notFoundAsyncData={() => {}}
              />
            </div>
          </Col>
        </Row>
      </div>
      {/* {displayAddCustomerForm && <AddCustomerForm />} */}
      <Row>
        <Col xs={24} sm={24} md={22} lg={22} xl={22}>
          {activeCustomer && (
            <div className='--customer-active__container'>
              <Divider style={{ margin: '25px 0 5px 0' }} orientation='center'>
                Datos del Comprador
              </Divider>
              <CustomerInfo customer={activeCustomer} />
            </div>
          )}

          {activeProduct && (
            <div className='--product-active__container'>
              <Divider style={{ margin: '25px 0 5px 0' }} orientation='center'>
                Datos del Producto
              </Divider>
              <ProductInfo product={activeProduct} mode={'landscape'} />
            </div>
          )}
        </Col>
      </Row>
      {productsForSale.length > 0 && <ProductsForSale products={productsForSale} tax={ivaTax} />}
    </div>
  );
};
