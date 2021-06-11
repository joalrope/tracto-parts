import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { ActionButtom } from '../../../../controls/ActionButtom/ActionButtom';
import { TableAttrib } from '../../../../../classes/table-attrib-class';
import { columns } from '../../../../../assets/data/products-for-sale.dataConig';
import { deleteItemProdForSale, replaceItemProdForSale } from '../../../../../helpers/sales/sales-utils';
import { setProductsForSale } from '../../../../../actions/products';
import { displayPdfGenerated } from '../../../../../actions/display';
import './products-for-sale.scss';

export const ProductsForSale = ({ products, tax }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(null);
  const [onEditMode, setOnEditMode] = useState({ status: false, rowKey: null });
  const [indexRow, setIndexRow] = useState(null);
  const [headData] = products;
  const { activeCustomer } = useSelector((state) => state.customer);
  const attrib = new TableAttrib(columns);
  const coin = 'USD$.';
  const initRow = products[0]['id'];

  useEffect(() => {
    setIndexRow(initRow);
  }, [initRow]);

  const { productsForSale } = useSelector((state) => state.product);
  const selectedIndex = (id) => productsForSale.findIndex((item) => item.id === id);

  const onEdit = (key, id, currentQty) => {
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
  };

  const onCancel = () => {
    setOnEditMode({
      status: false,
      rowKey: null,
    });

    setQty(null);
  };

  const handleKeyPress = (id, value, key) => {
    if (key === 'Enter') {
      setQty(value);
      onEdit('id', id, value);
    }
  };

  const subTotal = Object.values(products).reduce((total, { total: item }) => {
    return total + item;
  }, 0);

  const totalTax = (subTotal * tax) / 100;
  const gralTotal = subTotal + totalTax;

  const handleDeleteBtnClick = (rowId) => {
    const products = deleteItemProdForSale(rowId, productsForSale);

    dispatch(setProductsForSale(products));
  };

  const handleUpBtnClick = (rowId) => {
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
  };

  const handleDownBtnClick = (rowId) => {
    const index = selectedIndex(rowId);
    const selection = productsForSale[index];
    selection['qty']--;
    if (selection['qty'] < 1) selection['qty'] = 1;
    selection['total'] = selection['qty'] * selection['salePrice'];
    const products = replaceItemProdForSale(selection, productsForSale);

    dispatch(setProductsForSale(products));
  };

  const handleCheckIn = () => {
    if (activeCustomer) {
      return dispatch(displayPdfGenerated(true));
    }
    Swal.fire('No ha seleccionado Cliente al cual facturar', 'Por favor seleccione uno', 'warning');
  };

  const handleFocus = (e) => e.target.select();

  return (
    <div className='products-for-sale-container mt-5'>
      <div className='products-for-sale'>
        <h5 className='products-for-sale-title'>Productos a Facturar</h5>
        <table className='products-for-sale-table'>
          <thead>
            <tr>
              {Object.keys(headData).map(
                (key) => attrib.isCellVisible(key) && <th key={key}>{attrib.getTitleHeader(key)}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {Object.values(products).map((values) => (
              <tr key={values.id} onMouseOver={() => setIndexRow(values.id)}>
                {Object.entries(values).map(([key, value]) =>
                  onEditMode.status && onEditMode.rowKey === values.id && attrib.isCellEditable(key)
                    ? attrib.isCellVisible(key) && (
                        <input
                          key={values.id}
                          autoFocus={true}
                          onBlur={() => onEdit('id', values.id, Number(value))}
                          onFocus={handleFocus}
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          onKeyPress={(e) => handleKeyPress(values.id, Number(e.target.value), e.key)}
                        />
                      )
                    : attrib.isCellVisible(key) && (
                        <td
                          key={key}
                          className={attrib.getCellClass(key)}
                          onClick={() => onEdit(key, values.id, Number(value))}
                        >
                          {attrib.getCellValue(key, value)}
                        </td>
                      )
                )}

                {indexRow === values.id && (
                  <>
                    <ActionButtom type='delete' row={values.id} handleClick={handleDeleteBtnClick} />
                    <ActionButtom type='up' row={values.id} handleClick={handleUpBtnClick} />
                    <ActionButtom type='down' row={values.id} handleClick={handleDownBtnClick} />
                  </>
                )}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}></td>
              <th colSpan={2} className='text-right'>
                SUB-TOTAL:
              </th>
              <th className='text-right'>{attrib.getCellValue('total', subTotal)}</th>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <th colSpan={2} className='text-right'>{`I.V.A. (${tax * 100}%):`}</th>
              <th className='text-right'>{attrib.getCellValue('total', totalTax)}</th>
            </tr>
            <tr>
              <td colSpan={3}></td>
              <th colSpan={2} className='text-right'>
                TOTAL VENTA ({coin}):
              </th>
              <th className='text-right'>{attrib.getCellValue('total', gralTotal)}</th>
              <ActionButtom title={'Facturar'} type='edit' row={gralTotal} handleClick={handleCheckIn} />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

ProductsForSale.propTypes = {
  products: PropTypes.object,
  tax: PropTypes.number,
};
