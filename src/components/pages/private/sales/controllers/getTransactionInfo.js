import { fetchWithToken } from '../../../../../helpers/fetch';

const urlLastTransaction = '/transaction/lastTransaction';
export let controlNumber;
export let ivaTax;

export const getTransactionInfo = async () => {
  const { result } = await fetchWithToken(urlLastTransaction);
  controlNumber = result.nextNumberTransaction;
  ivaTax = result.ivaTax;
};
