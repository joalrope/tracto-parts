import { objectId } from '../object-id-generator';
import { objectMax } from '../object-with-max-value';

export const getSelectedProduct = (brand, activeProduct) => {
  const { code, title, details } = activeProduct;
  const [{ salePrice, stock }] = details.filter(({ trademark }) => trademark === brand);
  const total = salePrice;
  const { location, qty } = objectMax(stock, 'qty');

  return {
    id: objectId(),
    code,
    title,
    trademark: brand,
    qty: 1,
    location,
    qtyAvailable: qty,
    salePrice,
    total,
  };
};
