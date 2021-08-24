import { fetchWithToken } from '../../../../../helpers/fetch';

export const getTransactionInfo = async () => {
  const { result } = await fetchWithToken('/transaction/getTransaction');
  const { controlNumber, ivaTax } = result;
  return { controlNumber, ivaTax };
};
