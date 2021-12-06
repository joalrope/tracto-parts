import { updateProductQty } from '../../actions/products';

export const updateQtyItemsSold = (products) => {
  products.map((item) => {
    const { code, qty, trademark, location } = item;
    updateProductQty({ code, trademark, location, qty: -qty });
  });
};

export const updateQtyItemsEntrance = (products) => {
  products.map((item) => {
    const { code, trademark, location, qty } = item;
    updateProductQty({ code, trademark, location, qty });
  });
};
