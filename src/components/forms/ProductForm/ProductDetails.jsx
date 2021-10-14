import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Row, Select } from 'antd';
import { CloseSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { ProductStock } from './ProductStock';
import { alignItemsRight } from '../AllForms';
import { findTrademarkFactoraByCode } from '../../../actions/trademarks';

const Option = Select.Option;

export const ProductDetails = ({ form }) => {
  const setSalePrice = async (index) => {
    const trademark = form.getFieldsValue().details[index].trademark;
    const factor = Number(await findTrademarkFactoraByCode(trademark));
    const totalValue = Number(form.getFieldsValue().details[index].costPrice) * factor;

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
                <Col xs={24} lg={4}>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ flex: '1 0 88%' }}>
                      <Form.Item
                        label={
                          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div>Marca</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {details.length - 1 === index && (
                                <PlusSquareOutlined
                                  style={{
                                    color: '#5cb85c',
                                    fontSize: '18px',
                                    marginLeft: 10,
                                  }}
                                  onClick={() => add(field.name)}
                                />
                              )}
                            </div>
                          </div>
                        }
                        name={[index, 'trademark']}
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Option value='CAT'>CAT</Option>
                          <Option value='CTP'>CTP</Option>
                          <Option value='DONALDSON'>DONALDSON</Option>
                          <Option value='MAC BEE'>MAC BEE</Option>
                          <Option value='WIX'>WIX</Option>
                          <Option value=''>{''}</Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {details.length > 1 ? (
                        <CloseSquareOutlined
                          style={{
                            color: '#dc1919',
                            fontSize: '18px',
                            marginLeft: 5,
                            marginBottom: 5,
                          }}
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={5}>
                  <Form.Item name={[index, 'costPrice']} label='Precio de Costo' rules={[{ required: true }]}>
                    <Input
                      placeholder='indique precio de costo'
                      style={alignItemsRight}
                      onPressEnter={() => {
                        setSalePrice(index);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={5}>
                  <Form.Item name={[index, 'salePrice']} label='Precio de Venta' rules={[{ required: true }]}>
                    <Input placeholder='indique precio de venta' style={alignItemsRight} />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={10}>
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
  /* trademarks: PropTypes.array, */
};
