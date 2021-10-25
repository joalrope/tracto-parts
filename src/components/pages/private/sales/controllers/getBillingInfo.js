import { fetchWithToken } from '../../../../../helpers/fetch';

export const getBillingInfo = async () => {
  const { ok, result } = await fetchWithToken('/billings/getBilling');
  if (ok) {
    const { controlNumber, ivaTax } = result;
    return { controlNumber, ivaTax };
  }
};
