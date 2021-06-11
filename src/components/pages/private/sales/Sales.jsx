import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CustomerInfo } from './CustomerInfo/CustomerInfo';
import { Invoice } from '../../../templates/invoice/Invoice';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { ProductsForSale } from './ProductForSale/ProductsForSale';
import { getTransactionInfo } from './controllers/getTransactionInfo';
import { getTotals } from './controllers/totals';
import { msgWhenUnmounting } from './controllers/pdfRenderResult';
import { controlNumber, ivaTax } from './controllers/getTransactionInfo';
import { Search } from '../../../controls/Search';
import { Input } from 'antd';
import './sales.scss';

export const Sales = () => {
  const { productsForSale } = useSelector((state) => state.product);
  const { displayInvoicePdf } = useSelector((state) => state.display);

  useEffect(() => {
    getTransactionInfo();
  }, []);

  /* const addCusromerResult = ({ ok, data }) => {
    if (ok) {
      persistCustomer(data);
    }
  }; */

  const data = getTotals(controlNumber, ivaTax);

  /* const closeFrm = () => {
    dispatch(displayAddCustomerForm(false));
  }; */

  return (
    <div className='container mt-5'>
      <div className='search'>
        <h2>Ventas</h2>
        <Input />
        <Search />
        {displayInvoicePdf && (
          <GeneratePdfFromHtml WrappedComponent={Invoice} data={data} msgWhenUnmounting={msgWhenUnmounting} />
        )}
      </div>

      {/* {displayAddCustomerForm && <AddCustomerForm />} */}
      <CustomerInfo />
      {productsForSale.length > 0 && <ProductsForSale products={productsForSale} tax={ivaTax} />}
    </div>
  );
};
