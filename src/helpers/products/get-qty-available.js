export const getQtyAvailable = ({ details }) => {
  return details
    .map(({ stock }) => {
      const { qty } = stock.reduce((a, b) => ({ qty: a.qty + b.qty }));
      return qty;
    })
    .reduce((a, b) => a + b);
};

export const getQtyAvailableByTrademark = (details, trademark) => {
  return details
    .map((detail) => {
      const { stock } = detail;
      if (detail.trademark === trademark) {
        const { qty } = stock.reduce((a, b) => ({ qty: a.qty + b.qty }));
        return qty;
      } else {
        return 0;
      }
    })
    .reduce((a, b) => a + b);
};
