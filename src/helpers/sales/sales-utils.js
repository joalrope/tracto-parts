export const replaceItemProdForSale = (item, array) => {
  return array.map((product) => {
    if (product.code === item.code && product.trademark === item.trademark) return item;
    return product;
  });
};

export const deleteItemProdForSale = async (id, array) => {
  return await array.filter((product) => product.id !== id);
};
