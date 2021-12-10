import { createCustomer } from '../../../actions/customers';
import { setDisplayAddCustomerForm } from '../../../actions/shows';

export const saveNewCustomer = (values) => {
  return (dispatch) => {
    let isCo;
    let contact;
    if (values.type !== 'V') {
      isCo = true;
      contact = [
        {
          contactName: values.contactName,
          contactPhone: values.contactPhone,
          contactEmail: values.contactEmail,
        },
      ];
    } else {
      isCo = false;
      contact = [];
    }

    const newCustomer = {
      code: `${values.type}-${values.code}`,
      name: values.name,
      address: values.address,
      phone: values.phone,
      email: values.email,
      isCo,
      contact,
      hasCredit: values.hasCredit,
      creditLimit: values.creditLimit,
    };
    dispatch(createCustomer(newCustomer));
    dispatch(setDisplayAddCustomerForm({ show: false, mode: '' }));
  };
};

export const cancelNewCustomer = () => {
  return (dispatch) => {
    dispatch(setDisplayAddCustomerForm({ show: false, mode: '' }));
  };
};

export const emptyCustomer = {
  code: '',
  name: '',
  address: '',
  phone: '',
  email: '',
  isCo: false,
  contact: [{ contactName: '', contactPhone: '', contactEmail: '' }],
  hasCredit: false,
  creditLimit: 0,
};
