export const getLocation = ({ details }) => {
  return details.map(({ stock }) => {
    stock.map(({ location }) => location);
  });
};

export const getLocationByTrademark = (details, trademark) => {
  return details.map((detail) => {
    const { stock } = detail;
    if (detail.trademark === trademark) {
      stock.map(({ location }) => {
        return location;
      });
    }
  });
};
