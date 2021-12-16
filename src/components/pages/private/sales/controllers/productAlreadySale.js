export const productAlreadySale = (products, product) => {
  return products.some((item) => item.code === product.code && item.trademark === product.trademark);
};
