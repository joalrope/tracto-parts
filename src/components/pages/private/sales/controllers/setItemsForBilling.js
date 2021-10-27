export const setItemsForBilling = (products) => {
  products.map((item) => {
    const { code, title, qty, trademark, salePrice, totalItem } = item;
    return {
      code,
      title,
      qty,
      trademark,
      price: salePrice,
      totalItem,
      isTaxable: true,
    };
  });
};
