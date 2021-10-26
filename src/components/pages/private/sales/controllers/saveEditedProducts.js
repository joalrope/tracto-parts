import { useDispatch } from 'react-redux';
import { setProductsForSale } from '../../../../../actions/products';
import { showInfoQtyAvailable } from './showInfoQtyAvailable';

export const saveEditedProducts = (products) => {
  const dispatch = useDispatch();
  Object.values(products).map((product) => {
    const productAvailable = showInfoQtyAvailable(product);
    if (!productAvailable) {
      product.qty = product.qtyAvailable;
    }
    product.totalItem = product.qty * product.salePrice;
  });
  dispatch(setProductsForSale(products));
};
