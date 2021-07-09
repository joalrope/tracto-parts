import { store } from '../../store/store';

export const replaceItemProdForSale = (item, array) => {
  return array.map((product) => {
    if (product.code === item.code && product.trademark === item.trademark) return item;
    return product;
  });
};

export const deleteItemProdForSale = (id, trademark) => {
  const state = store.getState();
  const { productsForSale } = state.product;
  const filteredProducts = productsForSale.filter(
    (product) => product.id !== id || (product.id === id && product.trademark !== trademark)
  );

  return reorderedByKey(filteredProducts);
};

const reorderedByKey = (objectsArray) => {
  let reorderedItems = [];

  objectsArray.map((object, index) => {
    let { key, ...rest } = object;
    key = index + 1;
    reorderedItems.push({ key, ...rest });
  });

  return reorderedItems;
};
