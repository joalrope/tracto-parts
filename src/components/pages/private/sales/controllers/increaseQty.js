import { store } from '../../../../../store/store';
import { setProductsForSale } from '../../../../../actions/products';
import { replaceItemProdForSale } from '../../../../../helpers/sales/sales-utils';
import { showInfoQtyAvailable } from './showInfoQtyAvailable';

export const increaseQty = (products, product) => {
  const { dispatch } = store;
  const index = products.findIndex((item) => item.id === product.id && item.trademark === product.trademark);
  const prodForSaleSel = products[index];
  const curProduct = JSON.parse(JSON.stringify(prodForSaleSel));
  curProduct.qty++;
  const productAvailable = showInfoQtyAvailable(curProduct);

  if (productAvailable) {
    //product.key = products.length + 1;
    prodForSaleSel.qty++;
    prodForSaleSel.totalItem = prodForSaleSel.qty * prodForSaleSel.salePrice;
    const newProducts = replaceItemProdForSale(prodForSaleSel, products);
    dispatch(setProductsForSale(newProducts));
  }
};
