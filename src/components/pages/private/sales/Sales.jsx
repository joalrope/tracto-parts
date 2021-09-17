import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Popconfirm, Button, Table } from 'antd';
import { CloseSquareOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { findCustomerById, getCustomerByCode } from '../../../../actions/customers';
import {
  setDisplayAddCustomerForm,
  setDisplayAddProductForm,
  //setDisplayPdfGenerated,
} from '../../../../actions/modals';
import { forSaleColumns } from '../../../../assets/data/products.dataConfig';
import {
  addProductForSale,
  setProductsForSale,
  findProductById,
  getProductsByCodeRegex,
  updateProductQty,
} from '../../../../actions/products';
import { deleteItemProdForSale, replaceItemProdForSale } from '../../../../helpers/sales/sales-utils';
import { Invoice } from '../../../templates/invoice/Invoice';
import { AsyncDataSelect } from '../../../ui-component/async-data-select/AsyncDataSelect';
import { NotFoundContentMsg } from '../../../ui-component/async-data-select/NotFoundContentMsg';
import { CustomerCard } from '../../../ui-component/customer/card/CustomerCard';
import { EditableTable } from '../../../ui-component/editable-table/EditableTable';
import { ProductCard } from '../../../ui-component/product/card/ProductCard';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { ResultModal } from '../../../wrappers/ResultModal';
import { getTransactionInfo } from './controllers/getTransactionInfo';
import { msgWhenUnmounting } from './controllers/pdfRenderResult';
import { saleInfo } from './controllers/saleInfo';
import './sales.scss';
import { createSale } from '../../../../actions/sales';

export const Sales = () => {
  const dispatch = useDispatch();
  const [activeSale, setActiveSale] = useState(false);
  const [ivaTax, setIvaTax] = useState(0);
  const [controlNumber, setControlNumber] = useState('');

  useEffect(async () => {
    const { controlNumber, ivaTax } = await getTransactionInfo();
    setIvaTax(ivaTax);
    setControlNumber(controlNumber);
    //console.log('useEffect', ivaTax, controlNumber);
  }, [activeSale]);

  const { activeProduct, productsForSale } = useSelector((state) => state.product);
  const { activeCustomer } = useSelector((state) => state.customer);
  const { displayInvoicePdf } = useSelector((state) => state.modals);
  const customers = async (value) => await getCustomerByCode(value);
  const products = async (value) => await getProductsByCodeRegex(value);

  const handleDelete = (id, trademark) => {
    const newProducts = deleteItemProdForSale(id, trademark);
    dispatch(setProductsForSale(newProducts));
  };

  const actionRender = (record) => {
    return (
      <div className='action-button__column'>
        <Popconfirm
          title={`¿Seguro desea eliminar ${record.code}?`}
          onConfirm={() => handleDelete(record.id, record.trademark)}
          okText='Si'
          cancelText='No'
        >
          <CloseSquareOutlined className='--action-icon__remove' />
        </Popconfirm>
      </div>
    );
  };

  const actionColumn = {
    title: '',
    key: 'action',
    width: 50,
    render: actionRender,
  };

  if (!forSaleColumns.find((obj) => obj.key === 'action')) {
    forSaleColumns.push(actionColumn);
  }

  const customerResult = (id) => {
    dispatch(findCustomerById(id));
  };

  const productResult = (id) => {
    dispatch(findProductById(id));
  };

  const [showRepeatProductModal, setShowRepeatProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');

  const setProductForSale = (record) => {
    setSelectedProduct(record);
    const isLoadedProduct = productsForSale.some(
      (product) => product.code === record.code && product.trademark === record.trademark
    );

    if (!isLoadedProduct) {
      record.key = productsForSale.length + 1;
      record.qty = 1;
      record.totalItem = record.qty * record.salePrice;
      dispatch(addProductForSale(record));
      setActiveSale(true);
    } else {
      setStatus('info');
      setTitle('Producto repetido');
      setSubTitle(`El Producto ${record.code} ya existe en la venta. ¿Desea aumentar la cantidad a vender?`);
      setShowRepeatProductModal(true);
    }
  };

  const selectedIndex = (id, trademark) =>
    productsForSale.findIndex((item) => item.id === id && item.trademark === trademark);

  const saveEditedProducts = (products) => {
    Object.values(products).map((product) => {
      product.totalItem = product.qty * product.salePrice;
    });
    dispatch(setProductsForSale(products));
  };

  /* const startAddNewCustomer = (resp) => {
    if (resp === 'ok') {
      dispatch(setDisplayAddCustomerForm(true));
    } else {
      console.log(resp);
    }
  }; */
  /*  const startAddNewProduct = (resp) => {
    if (resp === 'ok') {
      dispatch(setDisplayAddProductForm(true));
    }
  }; */

  const [amountTax, setAmountTax] = useState(0);

  const summary = (pageData) => {
    let totalInvoice = 0;
    let totalTax = 0;

    pageData.forEach(({ totalItem }) => {
      totalInvoice += totalItem;
      totalTax += totalItem * (ivaTax / 100);
    });

    setAmountTax(totalTax);

    return (
      <>
        <Table.Summary.Row>
          <Table.Summary.Cell align='right' colSpan={6}>
            Total Venta:
          </Table.Summary.Cell>
          <Table.Summary.Cell align={'right'}>
            {Number(totalInvoice).toLocaleString('es-CO', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell align='right' colSpan={6}>
            {`I.V.A. (${ivaTax}%):`}
          </Table.Summary.Cell>
          <Table.Summary.Cell align={'right'}>
            {Number(totalTax).toLocaleString('es-CO', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Table.Summary.Cell>
        </Table.Summary.Row>
        <Table.Summary.Row>
          <Table.Summary.Cell align='right' colSpan={6}>
            Total Factura:
          </Table.Summary.Cell>
          <Table.Summary.Cell align={'right'}>
            {(Number(totalInvoice) + Number(totalTax)).toLocaleString('es-CO', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </>
    );
  };

  const data = saleInfo(controlNumber, ivaTax);

  const handleCheckIn = async () => {
    //dispatch(setDisplayPdfGenerated(true));

    const { transactionData, totals } = data;

    const items = productsForSale.map((item) => {
      const { id, code, title, qty, trademark, location, salePrice, totalItem } = item;
      updateProductQty(id, { code, trademark, location, qty: -qty });
      return {
        code,
        title,
        qty,
        trademark,
        price: salePrice,
        totalItem,
        isTaxable: true,
      };
    });

    const newSale = {
      invoiceNumber: controlNumber,
      date: transactionData.date,
      coin: 'USD$',
      customer: { code: activeCustomer.code, name: activeCustomer.name },
      items,
      purchaseTotal: totals.purchaseTotal,
      taxes: [{ title: 'ivaTax', rate: transactionData.ivaTax, amount: amountTax }],
      invoiceTotal: totals.invoiceTotal,
      payment: {
        onCredit: false,
        creditDays: 0,
        isPaid: false,
        paymentDate: '',
      },
    };

    dispatch(createSale(newSale));
    setActiveSale(false);
  };

  return (
    <div className='--sale-page__container'>
      {showRepeatProductModal && (
        <ResultModal
          status={status}
          title={title}
          subTitle={subTitle}
          visible={showRepeatProductModal}
          okText={'Si'}
          handleOk={() => {
            //console.log('clic Ok producto repetido');
            const index = selectedIndex(selectedProduct.id, selectedProduct.trademark);
            const prodForSaleSel = productsForSale[index];

            selectedProduct.key = productsForSale.length + 1;
            prodForSaleSel.qty++;
            prodForSaleSel.totalItem = prodForSaleSel.qty * prodForSaleSel.salePrice;
            const products = replaceItemProdForSale(prodForSaleSel, productsForSale);
            dispatch(setProductsForSale(products));
            setShowRepeatProductModal(false);
          }}
          cancelText={'No'}
          handleCancel={() => {
            setShowRepeatProductModal(false);
          }}
        />
      )}
      {displayInvoicePdf && (
        <GeneratePdfFromHtml
          WrappedComponent={Invoice}
          data={data}
          msgWhenUnmounting={() => msgWhenUnmounting(controlNumber, setActiveSale)}
        />
      )}
      <Row className='--sale-page__row'>
        <div className='--search-data__container'>
          <Divider className='--search-data__divider' orientation='center'>
            Busqueda
          </Divider>
          <div className='--search-inputs__container'>
            <div className='--search-customer__title'>Cliente:</div>
            <AsyncDataSelect
              placeholder={'Seleccione un Cliente'}
              dataSource={customers}
              result={customerResult}
              notFoundContent={
                <NotFoundContentMsg
                  msg={'No existe el cliente, Desea agregarlo?'}
                  noFoundResult={() => {
                    dispatch(setDisplayAddCustomerForm(true));
                  }}
                />
              }
            />

            <div className='--search-product__title'>Producto:</div>
            <AsyncDataSelect
              placeholder={'Encuentre un Producto'}
              dataSource={products}
              result={productResult}
              notFoundContent={
                <NotFoundContentMsg
                  msg={'No existe el producto, Desea agregarlo?'}
                  noFoundResult={() => {
                    dispatch(setDisplayAddProductForm({ show: true, mode: 'add' }));
                  }}
                />
              }
            />
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
            {/* <ProductsForSale products={productsForSale} tax={ivaTax} /> */}
            <EditableTable
              cols={forSaleColumns}
              dataSource={productsForSale}
              saveTableData={saveEditedProducts}
              summary={summary}
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
