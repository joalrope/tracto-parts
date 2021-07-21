import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { customerClearActive, customerSetActive } from '../../../../../actions/customers';
import { jsonToTabular } from '../../../../../helpers/jsonTab/json-to-tabular';
import { LandscapeTable } from '../LandscapeTable/LandscapeTable';
import { PortraitTable } from '../PortraitTable';
import { columns } from '../../../../../assets/data/customer.dataConfig';
import './customer-info.scss';
import { OnCredit } from './OnCredit';

export const CustomerInfo = ({ mode = 'landscape' }) => {
  const dispatch = useDispatch();
  const [isSaleOnCredit, setIsSaleOnCredit] = useState(false);
  const { activeCustomer: customer } = useSelector((state) => state.customer);

  useEffect(
    function () {
      if (customer) {
        customer['paymentConditions'] = `Venta de contado`;
        customer['creditDays'] = '0';
      }
    },
    [customer]
  );

  if (!customer) return null;
  const data = jsonToTabular(customer, mode);
  const { isRegularCustomer, creditDays } = customer;

  const handleClickDeleteCustomerActive = () => {
    dispatch(customerClearActive());
  };

  const handleOnClick = (e) => {
    if (e.target.checked) {
      customer['paymentConditions'] = `Venta a credito ${creditDays} días`;
    } else {
      customer['paymentConditions'] = `Venta de contado`;
    }
    dispatch(customerSetActive(customer));
    setIsSaleOnCredit(document.getElementById('creditSaleCheck').checked);
  };

  const actionButtonsCustomerInfo = [{ type: 'delete', handleButtonClick: handleClickDeleteCustomerActive }];

  if (data === null) {
    return <></>;
  }

  return (
    <div className='mt-5 client-info-container'>
      <div className='client-info'>
        <h5 className='client-info-title'>Información del Cliente</h5>
        {mode === 'portrait' ? (
          <PortraitTable data={data} columns={columns} actionButtons={actionButtonsCustomerInfo} />
        ) : (
          <LandscapeTable key={data} data={data} columns={columns} actionButtons={actionButtonsCustomerInfo} />
        )}
      </div>
      {isRegularCustomer && (
        <div className='sale-mode'>
          <div className='form-check'>
            <input type='checkbox' className='form-check-input' id='creditSaleCheck' onChange={handleOnClick} />
            <label className='form-check-label' htmlFor='creditSaleCheck'>
              Venta a Crédito
            </label>
          </div>
          {isSaleOnCredit && <OnCredit />}
        </div>
      )}
    </div>
  );
};

CustomerInfo.propTypes = {
  mode: PropTypes.string,
};
