import { setDisplayAddProductForm } from '../../../actions/modals';
import { createProduct } from '../../../actions/products';

export const saveNewProduct = (values) => {
  const { code, title, category, details, replacement, status } = values;

  return (dispatch) => {
    const newProduct = {
      code: code.toUpperCase(),
      title: title.toUpperCase(),
      category: category.toUpperCase(),
      details: [
        {
          trademark: details.trademark.toUpperCase(),
          stock: [
            {
              location: details.stock.location.toUpperCase(),
              qty: Number(details.stock.qty),
            },
          ],
          costPrice: Number(details.trademark.costPrice),
          salePrice: Number(details.trademark.salePrice),
        },
      ],
      replacement,
      status,
    };

    dispatch(createProduct(newProduct));
    dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
  };
};

export const cancelNewProduct = () => {
  return (dispatch) => {
    dispatch(setDisplayAddProductForm({ show: false, mode: '' }));
  };
};

export const emptyProduct = {
  code: '',
  title: '',
  details: [
    {
      trademark: '',
      costPrice: 0,
      salePrice: 0,
      stock: [
        {
          location: '',
          qty: 0,
        },
      ],
    },
  ],
  category: '',
  measurement: '',
  status: '',
  replacement: '',
};
