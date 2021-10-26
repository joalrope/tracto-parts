import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Divider, Form, InputNumber, Row, Select, Space } from 'antd';
import { CloseSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { ProductStock } from './ProductStock';
import { alignItemsRight } from '../AllForms';
import { findTrademarkFactoraByCode } from '../../../actions/trademarks';
import { setDisplayAddTrademarkForm } from '../../../actions/shows';

const Option = Select.Option;

export const ProductDetails = ({ form }) => {
  const dispatch = useDispatch();
  const { titles } = useSelector((state) => state.trademark);

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

  const listSelectOptions = titles.map((o) => <Option key={o}>{o}</Option>);

  const addItem = () => {
    dispatch(setDisplayAddTrademarkForm({ show: true, mode: 'add' }));
  };

  return (
    <Form.List name='details'>
      {(details, { add, remove }) => {
        return (
          <div className='--trademark-detail__row' style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {details.map((field, index) => (
              <Row key={field.key} gutter={24} justify='start' style={{ flexDirection: 'row' }}>
                <Col xs={24} lg={5}>
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
                        <Select
                          dropdownRender={(menu) => (
                            <div>
                              {menu}
                              <Divider style={{ margin: '0px' }} />
                              <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                                <a
                                  style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                  onClick={addItem}
                                >
                                  <Space>
                                    <PlusSquareOutlined />
                                    <span style={{ paddingTop: '4px' }}>Agregar marca</span>
                                  </Space>
                                </a>
                              </div>
                            </div>
                          )}
                        >
                          {listSelectOptions}
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
                    <InputNumber
                      placeholder='indique precio de costo'
                      style={alignItemsRight}
                      min={0.1}
                      controls={false}
                      decimalSeparator={','}
                      precision={2}
                      onPressEnter={() => {
                        setSalePrice(index);
                      }}
                      onFocus={(e) => e.target.select()}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={5}>
                  <Form.Item name={[index, 'salePrice']} label='Precio de Venta' rules={[{ required: true }]}>
                    <InputNumber
                      placeholder='indique precio de venta'
                      style={alignItemsRight}
                      min={1}
                      controls={false}
                      decimalSeparator={','}
                      precision={2}
                      onFocus={(e) => e.target.select()}
                    />
                  </Form.Item>
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
