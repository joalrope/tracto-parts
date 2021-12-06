import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Col, Form, Modal, Row, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  getProductLocation,
  setProductsEntrance,
  clearProductsEntrance,
  getProductByCode,
  productSetActive,
} from '../../../actions/products';
import { objectMin } from '../../../helpers/object-with-max-value';
import { InputCode } from '../aa-form-controls/InputCode';
import { InputCostPrice, InputNumeric, InputQty } from '../aa-form-controls/InputNumeric';
import { InputTrademark } from '../aa-form-controls/InputTrademark';
import { RemoveIcon } from '../aa-form-controls/RemoveIcon';
import { InputLocation } from '../aa-form-controls/InputLocation';
import { onButtonSaveOk } from './controllers';
import { emptyProduct } from '../ProductForm/controller';
import { setDisplayAddProductForm } from '../../../actions/shows';

const fieldWatchs = ['code', 'trademark'];

export const StockEntranceForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { productsEntrance } = useSelector((state) => state.product);
  const [hasAmountBilling, setHasAmountBilling] = useState(false);
  const [formValues, setFormValues] = useState({ totalAmount: 0, items: productsEntrance });
  const initialItems = { code: '', trademark: 'CTP', location: '', costPrice: 0 };
  const emptyEntrance = {
    totalAmount: 0.0001,
    items: productsEntrance,
  };

  useEffect(() => {
    setFormValues(emptyEntrance);
  }, []);

  const onClickAddItem = (add) => {
    const { items } = form.getFieldsValue();
    dispatch(setProductsEntrance(items));
    add(initialItems);
  };

  const onCancel = () => {
    form.resetFields();
    dispatch(clearProductsEntrance());
  };
  const onClick = (form) => {
    onButtonSaveOk(form);
    dispatch(clearProductsEntrance());
  };

  const onChangeHasAmountBilling = (e) => {
    setHasAmountBilling(e.target.checked);
  };

  const onFieldsChange = async (e) => {
    const fieldChanged = e[0].name.slice(-1).pop();
    const index = e[0].name.slice(-2)[0];

    if (fieldWatchs.includes(fieldChanged)) {
      const { items } = form.getFieldsValue();
      const { code, trademark } = items[index];
      if (code.length > 2) {
        const stock = await getProductLocation(code, trademark);
        if (stock?.length > 0) {
          const locationMin = objectMin(stock, 'qty');

          form.setFields([
            {
              name: ['items', index, 'location'],
              value: locationMin?.location,
            },
          ]);
        }
      }
    }
  };

  const searchProduct = async (code) => {
    const { ok } = await getProductByCode(code);
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
          dispatch(setDisplayAddProductForm({ show: true, mode: 'add' }));
        },
      });
    }
  };

  return (
    <Form
      form={form}
      name='stock-entrance'
      initialValues={formValues}
      onFieldsChange={onFieldsChange}
      layout={'vertical'}
    >
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
                  <Col xs={24} lg={4}>
                    <InputCode index={index} withResult={true} onPressEnter={searchProduct} />
                  </Col>
                  <Col xs={24} lg={5}>
                    <InputTrademark field={field} index={index} />
                  </Col>
                  <Col xs={24} lg={5}>
                    <InputLocation index={index} />
                  </Col>
                  <Col xs={24} lg={5}>
                    <InputQty index={index} />
                  </Col>
                  <Col xs={24} lg={4}>
                    <InputCostPrice index={index} />
                  </Col>
                  <Col xs={24} lg={1}>
                    <RemoveIcon
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              </Space>
            ))}

            <Row gutter={12} justify='start'>
              <Form.Item>
                <Button type='dashed' onClick={() => onClickAddItem(add)} icon={<PlusOutlined />}>
                  Agregar item
                </Button>
              </Form.Item>
            </Row>
            <Row gutter={12} justify='center'>
              <Col>
                <Button onClick={onCancel}>Cancelar</Button>
              </Col>
              <Col>
                <Button type='primary' onClick={() => onClick(form)}>
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
