import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Col, Popconfirm, Button } from 'antd';
import { CloseSquareOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { findCustomerById, getCustomerByCode } from '../../../../actions/customers';
import { setDisplayPdfGenerated, setDisplayAddCustomerForm } from '../../../../actions/display';
import { forSaleColumns } from '../../../../assets/data/products.dataConfig';
import { addProductForSale, setProductsForSale, findProductById, getProductByCode } from '../../../../actions/products';
import { deleteItemProdForSale, replaceItemProdForSale } from '../../../../helpers/sales/sales-utils';
import { Invoice } from '../../../templates/invoice/Invoice';
import { AsyncDataSelect } from '../../../ui-component/async-data-select/AsyncDataSelect';
import { NotFoundContentMsg } from '../../../ui-component/async-data-select/NotFoundContentMsg';
import { CustomerCard } from '../../../ui-component/customer/card/CustomerCard';
import { EditableTable } from '../../../ui-component/editable-table/EditableTable';
import { ProductCard } from '../../../ui-component/product/card/ProductCard';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { ResultModal } from '../../../wrappers/ResultModal';
import { getTransactionInfo, controlNumber, ivaTax } from './controllers/getTransactionInfo';
import { msgWhenUnmounting } from './controllers/pdfRenderResult';
import { getTotals } from './controllers/totals';
import './sales.scss';
import { AddCustomerForm } from '../../../forms/AddCustomerForm';

export const Sales = () => {
  const dispatch = useDispatch();
  const { activeProduct, productsForSale } = useSelector((state) => state.product);
  const { activeCustomer } = useSelector((state) => state.customer);
  const { displayInvoicePdf } = useSelector((state) => state.display);
  const customers = async (value) => await getCustomerByCode(value);
  const products = async (value) => await getProductByCode(value);

  useEffect(async () => {
    await getTransactionInfo();
  }, []);

  const data = getTotals(controlNumber, ivaTax);

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
    } else {
      setStatus('info');
      setTitle('Producto repetido');
      setSubTitle(`El Producto ${record.code} ya existe en la venta. ¿Desea aumentar la cantidad a vender?`);
      setShowRepeatProductModal(true);
    }
  };

  const handleCheckIn = () => {
    dispatch(setDisplayPdfGenerated(true));
  };

  const selectedIndex = (id, trademark) =>
    productsForSale.findIndex((item) => item.id === id && item.trademark === trademark);

  const saveEditedProducts = (products) => {
    Object.values(products).map((product) => {
      product.totalItem = product.qty * product.salePrice;
    });
    dispatch(setProductsForSale(products));
  };

  const startAddNewCustomer = (resp) => {
    if (resp === 'ok') {
      dispatch(setDisplayAddCustomerForm(true));
    }
  };

  const saveNewCustomer = (values) => {
    console.log('Received values of form: ', values);
    dispatch(setDisplayAddCustomerForm(false));
  };

  const cancelNewCustomer = () => {
    dispatch(setDisplayAddCustomerForm(false));
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
            console.log('clic Ok producto repetido');
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
              notFoundContent={
                <NotFoundContentMsg
                  msg={'No existe el cliente, Desea agregarlo?'}
                  noFoundResult={startAddNewCustomer}
                />
              }
              //notFoundAsyncData={noDataFounded}
              //disabled={Boolean(activeCustomer)}
            />

            <div className='--search-product__title'>Producto:</div>
            <AsyncDataSelect
              placeholder={'Encuentre un Producto'}
              dataSource={products}
              result={productResult}
              //notFoundContent={null}
              //disabled={Boolean(activeProduct)}
            />
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
            {productsForSale.length > 0 && (
              <div className='--products-for-sale__container'>
                <Divider className='--products-for-sale__divider' orientation='center'>
                  Productos para la Venta
                </Divider>
                {/* <ProductsForSale products={productsForSale} tax={ivaTax} /> */}
                <EditableTable
                  dataSource={productsForSale}
                  cols={forSaleColumns}
                  tax={ivaTax}
                  saveTableData={saveEditedProducts}
                />
                <div className='--products-for-sale__check-in-container'>
                  <Button
                    className='--products-for-sale__check-in-button'
                    disabled={!activeCustomer ? true : false}
                    icon={<ShoppingCartOutlined />}
                    onClick={handleCheckIn}
                  >
                    Facturar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <AddCustomerForm onOk={saveNewCustomer} onCancel={cancelNewCustomer} />
    </div>
  );
};
