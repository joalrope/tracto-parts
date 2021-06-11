import { types } from '../types/types';

export const displayPdfGenerated = (show) => ({
  type: types.displayGeneratePdf,
  payload: show,
});

export const displayAddCustomerForm = (show) => ({
  type: types.displayAddCustomerForm,
  payload: show,
});

// export const uiCloseModal = () => ({
//   type: types.uiCloseModal,
// });

// export const uiStartLoading = () => ({
//   type: types.uiStartLoading,
// });

// export const uiFinishLoading = () => ({
//   type: types.uiFinishLoading,
// });
