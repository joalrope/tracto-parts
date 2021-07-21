import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { customerSetActive } from '../../../actions/customers';
import { RadioInput } from '../../controls/RadioInput/RadioInput';

export const OnCredit = () => {
  const dispatch = useDispatch();
  const { activeCustomer: customer } = useSelector((state) => state.customer);
  const [creditDays, setCreditDays] = useState('7');

  const handleOnChange = (value) => {
    customer['paymentConditions'] = `Venta a credito ${value} días`;
    customer['creditDays'] = value;
    dispatch(customerSetActive(customer));
  };

  return (
    <fieldset className='options'>
      <legend className='legend-days'>Plazo en días</legend>
      <RadioInput label={'7'} value={'7'} checked={creditDays} setter={setCreditDays} handleOnChange={handleOnChange} />
      <RadioInput
        label={'15'}
        value={'15'}
        checked={creditDays}
        setter={setCreditDays}
        handleOnChange={handleOnChange}
      />
      <RadioInput
        label={'30'}
        value={'30'}
        checked={creditDays}
        setter={setCreditDays}
        handleOnChange={handleOnChange}
      />
    </fieldset>
  );
};
