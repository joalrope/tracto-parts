import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row } from 'antd';
import { ProductStock } from './ProductStock';
import { findTrademarkFactoraByCode } from '../../../actions/trademarks';
import { InputTrademark } from '../aa-form-controls/InputTrademark';
import { InputCostPrice, InputSalePrice } from '../aa-form-controls/InputNumeric';

export const ProductDetails = ({ form }) => {
  const setSalePrice = async (index) => {
    const trademark = form.getFieldsValue().details[index].trademark;
    const factor = Number(await findTrademarkFactoraByCode(trademark));
    const totalValue = Math.round(Number(form.getFieldsValue().details[index].costPrice) * factor);

    form.setFields([
      {
        name: ['details', index, 'salePrice'],
        value: totalValue,
      },
    ]);
  };

  return (
    <Form.List name='details'>
      {(details, { add, remove }) => {
        return (
          <div className='--trademark-detail__row' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {details.map((field, index) => (
              <Row key={field.key} gutter={24} justify='start' style={{ flexDirection: 'row' }}>
                <Col xs={24} lg={5}>
                  <InputTrademark details={details} field={field} index={index} add={add} remove={remove} />
                </Col>
                <Col xs={24} lg={5}>
                  <InputCostPrice
                    index={index}
                    onPressEnter={() => {
                      setSalePrice(index);
                    }}
                  />
                </Col>
                <Col xs={24} lg={5}>
                  <InputSalePrice index={index} />
                </Col>
                <Col xs={24} lg={9}>
                  {<ProductStock field={field} />}
                </Col>
              </Row>
            ))}
          </div>
        );
      }}
    </Form.List>
  );
};

ProductDetails.propTypes = {
  form: PropTypes.object,
};
