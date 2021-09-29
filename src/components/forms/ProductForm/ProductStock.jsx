import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Row } from 'antd';
import { CloseSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';

export const ProductStock = ({ field }) => {
  return (
    <Form.List name={[field.name, 'stock']}>
      {(stock, { add, remove }) => {
        return stock.map((field, index) => (
          <Row key={field.key} gutter={24}>
            <Col xs={24} lg={12}>
              <Form.Item name={[index, 'location']} label='Locación' rules={[{ required: true }]}>
                <Input placeholder='ingrese locacion' />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item name={[index, 'qty']} label='Cantidad' rules={[{ required: true }]}>
                <Input placeholder='ingrese cantidad' />
              </Form.Item>
            </Col>
            {stock.length > 1 ? (
              <CloseSquareOutlined className='--action-icon__remove' onClick={() => remove(field.name)} />
            ) : null}
            <PlusSquareOutlined
              onClick={() => {
                add();
              }}
            />
            Add nickname
          </Row>
        ));
      }}
    </Form.List>
  );
};

ProductStock.propTypes = {
  field: PropTypes.object,
};
