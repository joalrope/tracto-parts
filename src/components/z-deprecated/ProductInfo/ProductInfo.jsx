import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { jsonToTabular } from '../../../helpers/jsonTab/json-to-tabular';
// import { useWindowSize } from '../../../hooks/useWindowSize';
import { LandscapeTable } from '../../pages/private/sales/LandscapeTable/LandscapeTable';
import { PortraitTable } from '../../pages/private/sales/PortraitTable';
import { columns } from '../../../assets/data/products.dataConfig';
import './product-info.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProduct } from '../../../helpers/sales/add-products-for-sale';
import { replaceItemProdForSale } from '../../../helpers/sales/sales-utils';
import { addProductForSale /* , clearActivePoduct */, setProductsForSale } from '../../../actions/products';

export const ProductInfo = ({ product, mode }) => {
  const dispatch = useDispatch();
  const { activeProduct, productsForSale } = useSelector((state) => state.product);
  const data = jsonToTabular(product, mode);
  const selectedIndex = (code, trademark) =>
    productsForSale.findIndex((item) => item.code === code && item.trademark === trademark);

  const handleClick = (key, brand) => {
    if (key === 'trademark') {
      const selectedProduct = getSelectedProduct(brand, activeProduct);
      const { code, trademark } = selectedProduct;
      const isLoadedProduct = productsForSale.some(
        (product) => product.code === code && product.trademark === trademark
      );
      //TODO: Verificar cantidad disponible
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
            prodForSaleSel['total'] = Number(prodForSaleSel['qty']) * Number(prodForSaleSel['salePrice']);

            const products = replaceItemProdForSale(prodForSaleSel, productsForSale);

            dispatch(setProductsForSale(products));
          }
        });
      } else {
        dispatch(addProductForSale(selectedProduct));
      }
    }
  };

  const handleSelectBtnClick = (row) => {
    const pos = row in activeProduct.details ? row : 0;
    //const pos = activeProduct.details.hasOwnProperty(`${row}`) ? row : 0;
    const brand = activeProduct.details[pos].trademark;

    handleClick('trademark', brand);
    //dispatch(clearActivePoduct());
  };

  const handleDeleteBtnClick = () => {
    //dispatch(clearActivePoduct());
  };

  const actionButtonsProductInfo = [
    { type: 'delete', handleButtonClick: handleDeleteBtnClick },
    { type: 'select', handleButtonClick: handleSelectBtnClick },
  ];

  if (data === null) {
    return <></>;
  }

  return (
    <div className='mt-5 list-product-found-container animate__animated animate__fadeInDown animate__faster'>
      <div className='list-product-found'>
        <h5 className='list-products-found-title'>Detalle de Producto</h5>
        {mode === 'portrait' ? (
          <PortraitTable data={data} columns={columns} actionButtons={actionButtonsProductInfo} />
        ) : (
          <LandscapeTable key={data} data={data} columns={columns} actionButtons={actionButtonsProductInfo} />
        )}
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
  mode: PropTypes.string,
};
