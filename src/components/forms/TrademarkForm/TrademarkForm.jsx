import React from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Input, Modal, Row } from 'antd';
import { ModalForm } from '../../wrappers/ModalForm/ModalForm';
import { useDispatch, useSelector } from 'react-redux';
import { saveNewTrademark, cancelNewTrademark } from './controller';
import { addNewTrademarksTitle } from '../../../actions/trademarks';

export const Trademark = ({ form }) => {
  /* const setTrademark = async (e) => {
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
        },
      });
    } else {
      dispatch(productSetActive(result));
    }
  }; */

  return (
    <Form
      name='trademark-form'
      form={form}
      layout={'horizontal'}
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
    >
      <Row gutter={24}>
        <Col sx={24} lg={12}>
          <Form.Item
            name={['title']}
            label={'Descripción:'}
            rules={[
              {
                required: true,
                message: 'La descripción es obligatoria!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col sx={24} lg={12}>
          <Form.Item
            name={['factor']}
            label={'Factor:'}
            rules={[
              {
                required: true,
                message: 'El factor de multiplicación es obligatorio!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

Trademark.propTypes = { form: PropTypes.object };

export const TrademarkForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { trademarkForm } = useSelector((state) => state.show);
  const { show, mode } = trademarkForm;

  const onOk = (values) => {
    const newTrademark = values.title.toUpperCase();
    const message = `Confirma crear la marca ${newTrademark}?`;

    Modal.confirm({
      title: 'Crear Marca',
      content: [message],
      okText: 'Si',
      cancelText: 'No',
      onOk() {
        dispatch(addNewTrademarksTitle(newTrademark));
        dispatch(saveNewTrademark(values));
        form.resetFields();
      },
    });
  };

  const onCancel = () => {
    dispatch(cancelNewTrademark());
    form.resetFields();
  };

  return (
    <ModalForm
      WrappedComponent={Trademark}
      title={mode === 'add' ? 'Crear Marca' : 'Actualizar Marca'}
      visible={show}
      form={form}
      onOk={onOk}
      okText='Aceptar'
      onCancel={onCancel}
      cancelText={'Cancelar'}
      width={'25vw'}
    />
  );
};

TrademarkForm.propTypes = {};
