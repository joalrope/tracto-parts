import React /* , { useState, useEffect }  */ from 'react';
import PropTypes from 'prop-types';
import { Space, Table, Tooltip } from 'antd';
import { CloseSquareOutlined, EditOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
//import Swal from 'sweetalert2';
import { deleteItemProdForSale /* , replaceItemProdForSale  */ } from '../../../../helpers/sales/sales-utils';
//import { setProductsForSale } from '../../../../actions/products';
//import { displayPdfGenerated } from '../../../../actions/display';

import { jsonToTabular } from '../../../../helpers/jsonTab/json-to-tabular';
import { forSaleColumns } from '../../../../assets/data/products.dataConfig';
import './products-for-sale.scss';
import { setProductsForSale } from '../../../../actions/products';

export const ProductsForSale = ({ products, mode }) => {
  const dispatch = useDispatch();
  //const [qty, setQty] = useState(null);
  //const [onEditMode, setOnEditMode] = useState({ status: false, rowKey: null });
  //const [indexRow, setIndexRow] = useState(null);
  Object.values(products).map((value, index) => {
    value.key = index + 1;
  });

  // const { productsForSale } = useSelector((state) => state.product);
  //const attrib = new TableAttrib(pdfColumns);
  //const coin = 'USD$.';
  //const initRow = products[0]['id'];

  /* useEffect(() => {
    setIndexRow(initRow);
  }, [initRow]); */

  const { productsForSale } = useSelector((state) => state.product);
  //const selectedIndex = (id) => productsForSale.findIndex((item) => item.id === id);

  /* const onEdit = (key, id, currentQty) => {
    if (key === 'qty') {
      setOnEditMode({
        status: true,
        rowKey: id,
      });
      setQty(currentQty);
    } else {
      if (onEditMode.status) {
        const index = selectedIndex(id);
        const prodForSaleSel = productsForSale[index];
        //TODO: obtener el campo editado y actualizar prodForSaleSel['campo editado']
        prodForSaleSel['qty'] = qty;
        prodForSaleSel['total'] = qty * Number(prodForSaleSel['salePrice']);
        const products = replaceItemProdForSale(prodForSaleSel, productsForSale);

        dispatch(setProductsForSale(products));
        onCancel();
      }
    }
  }; */

  /* const onCancel = () => {
    setOnEditMode({
      status: false,
      rowKey: null,
    });

    setQty(null);
  }; */

  /* const handleKeyPress = (id, value, key) => {
    if (key === 'Enter') {
      setQty(value);
      onEdit('id', id, value);
    }
  }; */

  /* const subTotal = Object.values(products).reduce((total, { total: item }) => {
    return total + item;
  }, 0); */

  //const totalTax = (subTotal * tax) / 100;
  //const gralTotal = subTotal + totalTax;

  const handleDeleteBtnClick = (id) => {
    console.log(id);
    const products = deleteItemProdForSale(id, productsForSale);
    dispatch(setProductsForSale(products));
  };

  const editProduct = (e) => {
    console.log(e);
  };

  /* const handleUpBtnClick = (rowId) => {
    const index = selectedIndex(rowId);
    const selection = productsForSale[index];
    const qtyAvailable = selection['qtyAvailable'];
    if (selection['qty'] >= qtyAvailable) {
      Swal.fire({
        title: 'Por Favor Verifique cantidad disponible',
        html: `El producto con codigo: <b>${selection['code']}</b> de la marca <b>${selection['trademark']}</b> 
               solo tiene <b>${selection['qtyAvailable']} </b>disponible${selection['qtyAvailable'] > 1 ? 's' : ''}`,
        icon: 'warning',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Entendido!',
        confirmButtonColor: '#f2bd15',
      });
    } else {
      selection['qty']++;
      selection['total'] = selection['qty'] * selection['salePrice'];
      const products = replaceItemProdForSale(selection, productsForSale);

      dispatch(setProductsForSale(products));
    }
  }; */

  /* const handleDownBtnClick = (rowId) => {
    const index = selectedIndex(rowId);
    const selection = productsForSale[index];
    selection['qty']--;
    if (selection['qty'] < 1) selection['qty'] = 1;
    selection['total'] = selection['qty'] * selection['salePrice'];
    const products = replaceItemProdForSale(selection, productsForSale);

    dispatch(setProductsForSale(products));
  };
 */
  // const handleCheckIn = () => {
  //   if (activeCustomer) {
  //     return dispatch(displayPdfGenerated(true));
  //   }
  //   Swal.fire('No ha seleccionado Cliente al cual facturar', 'Por favor seleccione uno', 'warning');
  // };

  // const handleFocus = (e) => e.target.select();

  const actionRender = (record) => {
    return (
      <Space size='small'>
        <Tooltip placement='topLeft' title='Eliminar Producto'>
          <CloseSquareOutlined className='--action-icon__remove' onClick={() => handleDeleteBtnClick(record.id)} />
        </Tooltip>
        <Tooltip placement='topLeft' title='Agregar para la venta'>
          <EditOutlined className='--action-icon__edit' onClick={() => editProduct(record)} />
        </Tooltip>
      </Space>
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

  const tabulatedProduct = jsonToTabular(products, mode);
  let dataSource = [];

  Object.values(tabulatedProduct).map((product) => {
    let json = {};
    Object.entries(product).map((value) => {
      return (json[value[0]] = value[1]['value']);
    });

    dataSource.push(json);
  });

  return (
    <div className='products-for-sale__container'>
      <Table
        className='--product-for-sale__table'
        dataSource={dataSource}
        columns={forSaleColumns}
        size='small'
        bordered={true}
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    </div>
  );
};

ProductsForSale.propTypes = {
  products: PropTypes.array,
  mode: PropTypes.string,
};
