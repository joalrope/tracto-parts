import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Row, Col, Popconfirm } from 'antd';
import { CloseSquareOutlined } from '@ant-design/icons';
import { addProductForSale, setProductsForSale, findProductById, getProductByCode } from '../../../../actions/products';
import { findCustomerById, getCustomerByCode } from '../../../../actions/customers';
import { deleteItemProdForSale, replaceItemProdForSale } from '../../../../helpers/sales/sales-utils';
//import { ProductsForSale } from '../../../ui-component/product/for-sale/ProductsForSale';
import { AsyncDataSelect } from '../../../ui-component/async-data-select/AsyncDataSelect';
import { EditableTable } from '../../../ui-component/editable-table/EditableTable';
import { CustomerInfo } from '../../../ui-component/customer/info/CustomerInfo';
import { ProductInfo } from '../../../ui-component/product/info/ProductInfo';
import { Invoice } from '../../../templates/invoice/Invoice';
import { GeneratePdfFromHtml } from '../../../wrappers/GeneratePdfFromHtml';
import { ResultModal } from '../../../wrappers/ResultModal';
import { getTransactionInfo } from './controllers/getTransactionInfo';
//import { getTotals } from './controllers/totals';
import { msgWhenUnmounting } from './controllers/pdfRenderResult';
//import { controlNumber, ivaTax } from './controllers/getTransactionInfo';
import { forSaleColumns } from '../../../../assets/data/products.dataConfig';
import './sales.scss';

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

  //const data = getTotals(controlNumber, ivaTax);

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

  const noDataFounded = (msg) => {
    console.log(msg);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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
      setTitle('Producto repetido');
      setSubTitle(`El Producto ${record.code} ya existe en la venta. ¿Desea aumentar la cantidad a vender?`);
      setShowModal(true);
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

  const handleCancel = () => {
    setShowModal(false);
  };
  const handleOk = () => {
    setShowModal(false);
    const index = selectedIndex(selectedProduct.id, selectedProduct.trademark);
    const prodForSaleSel = productsForSale[index];

    selectedProduct.key = productsForSale.length + 1;
    prodForSaleSel.qty++;
    prodForSaleSel.totalItem = prodForSaleSel.qty * prodForSaleSel.salePrice;
    const products = replaceItemProdForSale(prodForSaleSel, productsForSale);
    dispatch(setProductsForSale(products));
  };

  return (
    <div className='--sale-page__container'>
      {showModal && (
        <ResultModal
          status={'info'}
          title={title}
          subTitle={subTitle}
          visible={showModal}
          okText={'Si'}
          handleOk={handleOk}
          cancelText={'No'}
          handleCancel={handleCancel}
        />
      )}
      {displayInvoicePdf && (
        <GeneratePdfFromHtml WrappedComponent={Invoice} /* data={data} */ msgWhenUnmounting={msgWhenUnmounting} />
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
              //disabled={Boolean(activeCustomer)}
            />

            <div className='--search-product__title'>Producto:</div>
            <AsyncDataSelect
              placeholder={'Encuentre un Producto'}
              dataSource={products}
              result={productResult}
              //notFoundAsyncData={() => {}}
              //disabled={Boolean(activeProduct)}
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
                {/* <ProductsForSale products={productsForSale} tax={ivaTax} /> */}
                <EditableTable dataSource={productsForSale} cols={forSaleColumns} saveTableData={saveEditedProducts} />
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* {displayAddCustomerForm && <AddCustomerForm />} */}
    </div>
  );
};
