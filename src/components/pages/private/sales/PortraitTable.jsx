import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getSelectedProduct } from '../../../../helpers/sales/add-products-for-sale';
import { addProductForSale, setProductsForSale } from '../../../../actions/products';
import { replaceItemProdForSale } from '../../../../helpers/sales/sales-utils';
import { TableAttrib } from '../../../../classes/table-attrib-class';
import { ActionButtom } from '../../../controls/ActionButtom/ActionButtom';

export const PortraitTable = ({ data, columns, actionButtons }) => {
  const dispatch = useDispatch();
  const { activeProduct, productsForSale } = useSelector((state) => state.product);
  const attrib = new TableAttrib(columns);

  const selectedIndex = (code, trademark) =>
    productsForSale.findIndex((item) => item.code === code && item.trademark === trademark);

  const handleClick = (key, brand) => {
    if (key === 'trademark') {
      const selectedProduct = getSelectedProduct(brand, activeProduct);
      const { code, trademark } = selectedProduct;

      const isLoadedProduct = productsForSale.some(
        (product) => product.code === code && product.trademark === trademark
      );

      if (isLoadedProduct) {
        Swal.fire({
          title: 'Desea sumarlo al anterior?',
          html: `El Producto con codigo: <b> ${code} </b>de la marca <b>${trademark}</b> ya esta agregado`,
          icon: 'question',
          showDenyButton: true,
          confirmButtonText: '<i class="fa fa-thumbs-up"></i> Si!',
          denyButtonText: '<i class="fa fa-thumbs-down"></i> No!',
        }).then((result) => {
          if (result.isConfirmed) {
            const index = selectedIndex(code, trademark);
            const prodForSaleSel = productsForSale[index];
            let qtyLoaded;

            productsForSale.some((product) => {
              if (product.code === code && product.trademark === trademark) {
                qtyLoaded = Number(product.qty);
              }
              return null;
            });

            prodForSaleSel['qty'] = Number(qtyLoaded) + 1;
            prodForSaleSel['total'] = Number(qtyLoaded) * Number(prodForSaleSel['salePrice']);

            const products = replaceItemProdForSale(prodForSaleSel, productsForSale);

            dispatch(setProductsForSale(products));
          }
        });
      } else {
        dispatch(addProductForSale(selectedProduct));
      }
    }
  };

  return (
    <table className='portrait-table'>
      <tbody>
        {Object.entries(data).map(([key, value], index, array) => (
          <tr key={key}>
            {attrib.isCellVisible(key) && <th key={key}>{attrib.getTitleHeader(key)}</th>}
            {Object.values(value).map(
              ({ value, span }) =>
                attrib.isCellVisible(key) && [
                  <td
                    key={key + value}
                    colSpan={span}
                    align={attrib.getCellAlign(key)}
                    className={attrib.getCellClass(key)}
                    onClick={() => handleClick(key, value)}
                  >
                    {attrib.getCellValue(key, value)}
                  </td>,
                  index === array.length && <td>{'aqui'}</td>,
                ]
            )}
          </tr>
        ))}
        <tr>
          {Object.values(actionButtons).map(({ type, handleButtonClick }, index) => (
            <ActionButtom key={index} type={type} handleClick={handleButtonClick} />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

PortraitTable.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  actionButtons: PropTypes.array,
};
