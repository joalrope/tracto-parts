import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Form, Space, Select } from 'antd';
import { CloseSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { setDisplayAddTrademarkForm } from '../../../actions/shows';
import { getTrademarksTitle } from '../../../actions/trademarks';

const Option = Select.Option;

export const InputTrademark = ({ details, field, add, remove, index = -1 }) => {
  const dispatch = useDispatch();
  const { titles } = useSelector((state) => state.trademark);
  const listSelectOptions = titles.map((o) => <Option key={o}>{o}</Option>);

  const addItem = () => {
    dispatch(setDisplayAddTrademarkForm({ show: true, mode: 'add' }));
  };

  useEffect(() => {
    dispatch(getTrademarksTitle());
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: '1 0 88%' }}>
        <Form.Item
          label={
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div>Marca</div>
              {details?.length - 1 === index && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <PlusSquareOutlined
                    style={{
                      color: '#5cb85c',
                      fontSize: '18px',
                      marginLeft: 10,
                    }}
                    onClick={() => add(field.name)}
                  />
                </div>
              )}
            </div>
          }
          name={index === -1 ? 'trademark' : [index, 'trademark']}
          rules={[{ required: true }]}
        >
          <Select
            dropdownMatchSelectWidth={160}
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: '0px' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                  <a style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }} onClick={addItem}>
                    <Space align='baseline'>
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
      {details?.length > 1 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <CloseSquareOutlined
            style={{
              color: '#dc1919',
              fontSize: '18px',
              marginLeft: 5,
              marginBottom: 5,
            }}
            onClick={() => remove(field.name)}
          />
        </div>
      )}
    </div>
  );
};

InputTrademark.propTypes = {
  details: PropTypes.array,
  field: PropTypes.object,
  index: PropTypes.number,
  add: PropTypes.func,
  remove: PropTypes.func,
};
