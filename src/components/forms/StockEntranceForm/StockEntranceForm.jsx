import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Modal, Row, Space } from 'antd';
import { CloseSquareOutlined, PlusOutlined } from '@ant-design/icons';
import { InputCode } from '../aa-form-controls/InputCode';
import { InputNumeric } from '../aa-form-controls/InputNumeric';
import { InputTrademark } from '../aa-form-controls/InputTrademark';
import { checkAmountMatch } from './controllers';

const emptyEntrance = {
  totalAmount: 0.0001,
  items: [{ code: '', trademark: 'CTP', qty: 1, costPrice: 0 }],
};

export const StockEntranceForm = () => {
  const [form] = Form.useForm();
  const [hasAmountBilling, setHasAmountBilling] = useState(false);

  const onOk = () => {
    form
      .validateFields()
      .then((values) => {
        const { hasAmountBilling, totalAmount, items } = values;

        if (hasAmountBilling) {
          const billingAmount = items
            .map(({ qty, costPrice }) => {
              return qty * costPrice;
            })
            .reduce((a, b) => a + b, 0);

          checkAmountMatch(totalAmount, billingAmount, items);
        } else {
          console.log(`dispatch(saveNewStockEntrance(${JSON.stringify(items, null, 2)}))`);
        }
      })
      .catch(({ errorFields }) => {
        const errors = errorFields.map((field) => {
          return `${field.errors[0]}, `;
        });
        Modal.warning({
          title: 'Error al enviar los datos',
          content: [errors],
          okText: 'Aceptar',
          okType: 'primary',
          confirmLoading: true,
          autoFocusButton: null,
          onOk() {},
        });
      });
  };

  const onCancel = () => {
    form.resetFields();
  };

  const onChangeHasAmountBilling = (e) => {
    setHasAmountBilling(e.target.checked);
  };

  return (
    <Form form={form} name='stock-entrance' initialValues={emptyEntrance} layout={'horizontal'}>
      <Row>
        <Col xs={24} lg={8}>
          <Form.Item name='hasAmountBilling' valuePropName='checked' wrapperCol={{ offset: 5 }}>
            <Checkbox onChange={onChangeHasAmountBilling}>Monto Factura</Checkbox>
          </Form.Item>
        </Col>
        <Col xs={24} lg={8}>
          {hasAmountBilling && (
            <InputNumeric
              name='totalAmount'
              label='Monto Total:'
              placeholder='Introduzca el monto de la factura'
              rules={[{ required: true, type: 'number', min: 0.0001, message: 'Favor indicar el monto total.' }]}
            />
          )}
        </Col>
      </Row>

      <Form.List name='items'>
        {(items, { add, remove }) => (
          <>
            {items.map((field, index) => (
              <Space key={index} align='baseline'>
                <Row key={field.code} gutter={12} align='middle' justify='space-around'>
                  <Col xs={24} lg={6}>
                    <InputCode index={index} />
                  </Col>

                  <Col xs={24} lg={6}>
                    <InputTrademark field={field} index={index} />
                  </Col>

                  <Col xs={24} lg={6}>
                    <InputNumeric
                      name='qty'
                      label='Cantidad'
                      placeholder='indique la cantidad'
                      rules={[
                        { required: true, type: 'number', min: 0.0002, message: 'Ingrese la cantidad del producto' },
                      ]}
                      index={index}
                    />
                  </Col>
                  <Col xs={24} lg={5}>
                    <InputNumeric
                      name='costPrice'
                      label='Precio'
                      placeholder='indique el Precio'
                      rules={[{ required: true, type: 'number', min: 0.0002, message: 'Indique el precio' }]}
                      index={index}
                    />
                  </Col>
                  <Col xs={24} lg={1}>
                    <CloseSquareOutlined
                      style={{
                        color: '#dc1919',
                        fontSize: '18px',
                        marginLeft: 5,
                        marginBottom: 28,
                      }}
                      onClick={() => remove(field.name)}
                    />
                  </Col>
                </Row>
              </Space>
            ))}

            <Row gutter={12} justify='end'>
              <Form.Item>
                <Button type='dashed' onClick={() => add()} icon={<PlusOutlined />}>
                  Agregar item
                </Button>
              </Form.Item>
            </Row>
            <Row gutter={12} justify='center'>
              <Col>
                <Button onClick={onCancel}>Cancelar</Button>
              </Col>
              <Col>
                <Button type='primary' onClick={onOk}>
                  Guardar
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </Form>
  );
};
