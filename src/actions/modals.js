import { types } from '../types/types';

export const setDisplayPdfGenerated = (show) => ({
  type: types.displayGeneratePdf,
  payload: show,
});

export const setDisplayAddCustomerForm = (show) => ({
  type: types.displayFormCustomerAdd,
  payload: show,
});

export const setDisplayAddProductForm = (show) => ({
  type: types.modalsProductForm,
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
