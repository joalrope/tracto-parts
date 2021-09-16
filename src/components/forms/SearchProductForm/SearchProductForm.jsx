import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Col, Form, Input, message, Row } from 'antd';
import { getProductByCode, productSetActive } from '../../../actions/products';

export const SearchProductForm = ({ searchResult }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const searchProduct = async (e) => {
    const code = e.target.value.toUpperCase();

    const { ok, result } = await getProductByCode(code);
    if (!ok) {
      message.warning({
        content: `No existe un producto con el código: ${code}`,
        style: {
          marginTop: '25vh',
        },
      });
      return;
    }
    dispatch(productSetActive(result));
    searchResult();
  };

  return (
    <Form
      name='product-search'
      form={form}
      layout={'horizontal'}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      <Row>
        <Col sx={24} lg={6}>
          <Form.Item
            name={['code']}
            label={'Código:'}
            rules={[
              {
                required: true,
                message: 'El código es necesario!',
              },
            ]}
          >
            <Input onPressEnter={searchProduct} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

SearchProductForm.propTypes = {
  searchResult: PropTypes.func,
};
