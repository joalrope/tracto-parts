export const getQtyAvailable = ({ details }) => {
  return details
    .map(({ stock }) => {
      const { qty } = stock.reduce((a, b) => ({ qty: a.qty + b.qty }));
      return qty;
    })
    .reduce((a, b) => a + b);
};
