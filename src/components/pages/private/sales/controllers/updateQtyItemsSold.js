import { updateProductQty } from '../../../../../actions/products';

export const updateQtyItemsSold = (products) => {
  products.map((item) => {
    const { id, code, qty, trademark, location } = item;
    updateProductQty(id, { code, trademark, location, qty: -qty });
  });
};
