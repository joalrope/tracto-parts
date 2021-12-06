import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import moment from 'moment';
import { addProductForSale, setProductsForSale } from '../../../../actions/products';
import { forSaleColumns } from '../../../../assets/data/products.dataConfig';
import { createSale } from '../../../../actions/sales';
import { updateQtyItemsSold } from '../../../../helpers/products/update-qty-items';
import { Invoice } from '../../../templates/invoice/Invoice';
import { CustomerCard } from '../../../ui-component/customer/card/CustomerCard';
import { EditableTable } from '../../../ui-component/editable-table/EditableTable';
import { ProductCard } from '../../../ui-component/product/card/ProductCard';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { checkInConfirm, repeatedProductConfirm } from './controllers/confirms';
import { getBillingInfo } from './controllers/getBillingInfo';
import { msgWhenUnmounting } from './controllers/pdfRenderResult';
import { saleInfo } from './controllers/saleInfo';
import { showInfoQtyAvailable } from './controllers/showInfoQtyAvailable';
import { setItemsForBilling } from './controllers/setItemsForBilling';
import { productAlreadySale } from './controllers/productAlreadySale';
import { summary } from './components/Summary';
import { ActionRender } from './components/ActionRender';
import { SearchCustomer } from './components/SearchCustomer';
import { SearchProduct } from './components/SearchProduct';
import './sales.scss';

export const Sales = () => {
  const dispatch = useDispatch();
  const [ivaTax, setIvaTax] = useState(0);
  const [invoiceNumber, setInvoiceNumber] = useState('');

  useEffect(async () => {
    const abortController = new AbortController();
    const billingInfo = await getBillingInfo();
    if (billingInfo) {
      const { controlNumber, ivaTax } = billingInfo;
      setIvaTax(ivaTax);
      setInvoiceNumber(controlNumber);
    }
    return () => {
      abortController.abort();
    };
  }, []);

  const { activeProduct, productsForSale } = useSelector((state) => state.product);
  const { activeCustomer } = useSelector((state) => state.customer);
  const { displayInvoicePdf } = useSelector((state) => state.show);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!forSaleColumns.find((obj) => obj.key === 'action')) {
    forSaleColumns.push({
      title: '',
      key: 'action',
      width: 50,
      render: ActionRender,
    });
  }

  const setProductForSale = (record) => {
    setSelectedProduct(record);
    const isLoadedProduct = productAlreadySale(productsForSale, selectedProduct);

    if (!isLoadedProduct) {
      record.key = productsForSale.length + 1;
      record.qty = 1;
      record.totalItem = record.qty * record.salePrice;
      dispatch(addProductForSale(record));
    } else {
      repeatedProductConfirm(record, productsForSale, selectedProduct);
    }
  };

  const saveEditedProducts = (products) => {
    Object.values(products).map((product) => {
      const productAvailable = showInfoQtyAvailable(product);
      if (!productAvailable) {
        product.qty = product.qtyAvailable;
      }
      product.totalItem = product.qty * product.salePrice;
    });
    dispatch(setProductsForSale(products));
  };

  const [amountTax, setAmountTax] = useState(0);
  const data = saleInfo(invoiceNumber, ivaTax);

  const handleCheckIn = () => {
    checkInConfirm(invoiceNumber, checkIn);
  };

  const checkIn = () => {
    if (invoiceNumber === '') return;

    const { billingData, totals } = data;

    const items = setItemsForBilling(productsForSale);
    updateQtyItemsSold(productsForSale);

    const newSale = {
      invoiceNumber,
      date: billingData.date,
      coin: 'USD$',
      customer: { code: activeCustomer.code, name: activeCustomer.name },
      items,
      purchaseTotal: totals.purchaseTotal,
      taxes: [{ title: 'ivaTax', rate: billingData.ivaTax, amount: amountTax }],
      invoiceTotal: totals.invoiceTotal,
      payment: {
        onCredit: false,
        creditDays: 0,
        isPaid: true,
        paymentDate: moment().format('DD/MM/YYYY'),
      },
    };

    dispatch(createSale(newSale));
  };

  return (
    <div className='--sale-page__container'>
      {displayInvoicePdf && (
        <GeneratePdfFromHtml
          WrappedComponent={Invoice}
          data={data}
          msgWhenUnmounting={() => msgWhenUnmounting(invoiceNumber)}
        />
      )}
      <Row className='--sale-page__row'>
        <div className='--search-data__container'>
          <Divider className='--search-data__divider' orientation='center'>
            Busqueda
          </Divider>
          <div className='--search-inputs__container'>
            <div className='--search-customer__title'>Cliente:</div>
            <SearchCustomer />
            <div className='--search-product__title'>Producto:</div>
            <SearchProduct />
          </div>
        </div>
        <div className='--info-data__container'>
          <div className='--asset-selector__container'>
            {activeCustomer && (
              <div className='--customer-active__container'>
                <Divider className='--customer-active__divider' orientation='center'>
                  Comprador
                </Divider>
                <CustomerCard customer={activeCustomer} />
              </div>
            )}
            {activeProduct && (
              <div className='--product-active__container'>
                <Divider className='--product-active__divider' orientation='center'>
                  Productos
                </Divider>
                <ProductCard product={activeProduct} mode={'landscape'} setProductForSale={setProductForSale} />
              </div>
            )}
          </div>
        </div>
      </Row>
      <Row className='--sale-page__row'>
        {productsForSale.length > 0 && (
          <div className='--products-for-sale__container'>
            <Divider className='--products-for-sale__divider' orientation='center'>
              Productos para la Venta
            </Divider>
            <EditableTable
              cols={forSaleColumns}
              dataSource={productsForSale}
              saveTableData={saveEditedProducts}
              summary={() => summary(productsForSale, ivaTax, setAmountTax)}
              pagination={false}
            />
            <div className='--products-for-sale__check-in-container'>
              <Button
                className='--products-for-sale__check-in-button'
                disabled={!activeCustomer ? true : false}
                icon={<ShoppingCartOutlined />}
                onClick={handleCheckIn}
                type='primary'
              >
                Facturar
              </Button>
            </div>
          </div>
        )}
      </Row>
    </div>
  );
};
