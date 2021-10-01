import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Row } from 'antd';
import { CloseSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { alignItemsRight } from '../AllForms';

export const ProductStock = ({ field }) => {
  return (
    <Form.List name={[field.name, 'stock']} initialValue={[{ location: undefined, qty: undefined }]}>
      {(stock, { add, remove }) => {
        return stock.map((field, index) => (
          <Row key={field.key} gutter={24}>
            <Col xs={24} lg={12}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ flex: '1 0 88%' }}>
                  <Form.Item
                    label={
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>Locación</div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {stock.length - 1 === index && (
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
                    name={[index, 'location']}
                    rules={[{ required: true }]}
                  >
                    <Input placeholder='ingrese locacion' />
                  </Form.Item>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {stock.length > 1 ? (
                    <CloseSquareOutlined
                      style={{
                        color: '#dc1919',
                        fontSize: 18,
                        marginLeft: 5,
                        marginBottom: 5,
                      }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name={[index, 'qty']} label='Cantidad' rules={[{ required: true }]}>
                <Input placeholder='ingrese cantidad' style={alignItemsRight} />
              </Form.Item>
            </Col>
          </Row>
        ));
      }}
    </Form.List>
  );
};

ProductStock.propTypes = {
  field: PropTypes.object,
};
