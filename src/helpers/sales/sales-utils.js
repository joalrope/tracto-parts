import { store } from '../../store/store';

export const replaceItemProdForSale = (item, array) => {
  return array.map((product) => {
    if (product.code === item.code && product.trademark === item.trademark) return item;
    return product;
  });
};

export const deleteItemProdForSale = (id) => {
  const state = store.getState();
  const { productsForSale } = state.product;
  const filteredProducts = productsForSale.filter((product) => product.id !== id);
  let newProducts = [];

  filteredProducts.map((product, index) => {
    newProducts.push({ key: index + 1, ...product });
  });

  return filteredProducts;
};
