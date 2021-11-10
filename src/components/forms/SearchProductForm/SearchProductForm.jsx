import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Col, Form, Modal, Row } from 'antd';
import { getProductByCode, productSetActive } from '../../../actions/products';
import { emptyProduct } from '../ProductForm/controller';
import { InputCode } from '../aa-form-controls/InputCode';

export const SearchProductForm = ({ searchResult }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const searchProduct = async (e) => {
    const code = e.target.value.toUpperCase();

    const { ok, result } = await getProductByCode(code);
    if (!ok) {
      Modal.confirm({
        title: `El producto de código: ${code} no existe`,
        content: '¿Desea crear este Producto?',
        okText: 'Si',
        okType: 'primary',
        cancelText: 'No',
        confirmLoading: true,
        autoFocusButton: null,
        onCancel() {},
        onOk() {
          emptyProduct['code'] = code;
          dispatch(productSetActive(emptyProduct));
          searchResult('add');
        },
      });
    } else {
      dispatch(productSetActive(result));
      searchResult('edit');
    }
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
          <InputCode onPressEnter={searchProduct} />
        </Col>
      </Row>
    </Form>
  );
};

SearchProductForm.propTypes = {
  searchResult: PropTypes.func,
};
