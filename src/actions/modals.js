import { types } from '../types/types';

export const setDisplayPdfGenerated = (show) => ({
  type: types.displayGeneratePdf,
  payload: show,
});

export const setDisplayAddCustomerForm = (show) => ({
  type: types.displayFormCustomer,
  payload: show,
});

export const setDisplayAddProductForm = (show) => ({
  type: types.displayFormProduct,
  payload: show,
});

export const setDisplayAddTrademarkForm = (show) => ({
  type: types.displayFormTrademark,
  payload: show,
});

// export const uiCloseModal = () => ({
//   type: types.uiCloseModal,
// });

export const uiStartLoading = () => ({
  type: types.uiStartLoading,
});

export const uiFinishLoading = () => ({
  type: types.uiFinishLoading,
});
