import { useDispatch } from 'react-redux';
import { createCustomer } from '../../../actions/customers';
import { setDisplayAddCustomerForm } from '../../../actions/display';

const dispatch = useDispatch();

export const saveNewCustomer = (values) => {
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
  dispatch(setDisplayAddCustomerForm(false));
};
