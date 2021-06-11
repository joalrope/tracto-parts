export const replaceItemProdForSale = (item, array) => {
  return array.map((product) => {
    if (product.code === item.code && product.trademark === item.trademark) return item;
    return product;
  });
};

export const deleteItemProdForSale = (id, array) => {
  return array.filter((product) => product.id !== id);
};
