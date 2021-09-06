import { setDisplayAddProductForm } from '../../../actions/display';
import { createProduct } from '../../../actions/products';

export const saveNewProduct = (values) => {
  return (dispatch) => {
    const newProduct = {
      code: values.code.toUpperCase(),
      title: values.title.toUpperCase(),
      category: values.category.toUpperCase(),
      details: [
        {
          trademark: values.trademark.toUpperCase(),
          stock: [
            {
              location: values.location.toUpperCase(),
              qty: Number(values.qty),
            },
          ],
          costPrice: Number(values.costPrice),
          salePrice: Number(values.salePrice),
        },
      ],
      replacement: values.replacement,
      status: values.status,
    };

    dispatch(createProduct(newProduct));
    dispatch(setDisplayAddProductForm(false));
  };
};

export const cancelNewProduct = () => {
  return (dispatch) => {
    dispatch(setDisplayAddProductForm(false));
  };
};
