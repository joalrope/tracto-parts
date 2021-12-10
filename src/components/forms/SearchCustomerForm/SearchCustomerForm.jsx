import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Col, Form, Modal, Row } from 'antd';
import { customerSetActive, getCustomerByCode } from '../../../actions/customers';
import { InputCode } from '../aa-form-controls/InputCode';
import { emptyCustomer } from '../CustomerForm/controller';

export const SearchCustomerForm = ({ searchResult }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const searchCustomer = async (code) => {
    const { ok, result } = await getCustomerByCode(code);

    if (!ok) {
      Modal.confirm({
        title: `El cliente con RIF: ${code} no existe`,
        content: '¿Desea crear este Cliente?',
        okText: 'Si',
        okType: 'primary',
        cancelText: 'No',
        confirmLoading: true,
        autoFocusButton: null,
        onCancel() {},
        onOk() {
          emptyCustomer['code'] = code;
          dispatch(customerSetActive(emptyCustomer));
          searchResult('add');
        },
      });
    } else {
      dispatch(customerSetActive(result));
      searchResult('edit');
    }
  };

  return (
    <Form
      name='customer-search'
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
        <Col sx={24} lg={8}>
          <InputCode withResult={true} onPressEnter={searchCustomer} />
        </Col>
      </Row>
    </Form>
  );
};

SearchCustomerForm.propTypes = {
  searchResult: PropTypes.func,
};
