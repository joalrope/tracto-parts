import { fetchWithToken } from '../../../../../helpers/fetch';

export const getBillingInfo = async () => {
  const { result } = await fetchWithToken('/billings/getBilling');
  const { controlNumber, ivaTax } = result;
  return { controlNumber, ivaTax };
};
