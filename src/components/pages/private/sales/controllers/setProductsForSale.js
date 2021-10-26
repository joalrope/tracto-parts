/* 

export const setProductForSale = (record) => {
  setSelectedProduct(record);
  const isLoadedProduct = productsForSale.some(
    (product) => product.code === record.code && product.trademark === record.trademark
  );

  if (!isLoadedProduct) {
    record.key = productsForSale.length + 1;
    record.qty = 1;
    record.totalItem = record.qty * record.salePrice;
    dispatch(addProductForSale(record));
  } else {
    repeatedProductConfirm(record, productsForSale, selectedProduct);
  }
}; */
