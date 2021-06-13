import React, { /* useEffect, */ useState } from 'react';
import { Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCode, findProductById } from '../../../../actions/products';
import { ItemFound } from './search/ItemFound';
const { Option } = Select;

export const Inventory = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
  const { activeProduct } = useSelector((state) => state.product);
  let productsFound = [];

  const getItems = async (value) => {
    setValue(value);
    const products = await await getProductByCode(value);
    if (products) {
      products.map((item) => {
        productsFound.push({
          label: item.title,
          key: item.code,
          value: item.id,
        });
      });
      setOptions(productsFound);
    } else {
      setOptions([]);
    }
  };

  const onSearch = (value) => {
    if (value) {
      getItems(value);
    } else {
      setOptions([]);
    }
  };

  const onChange = (value) => {
    setValue(value);
    dispatch(findProductById(value));
    setValue('');
    setOptions([]);
  };

  return (
    <div>
      <h2>Inventario</h2>
      <div>
        <div>
          <Select
            showSearch
            value={value}
            placeholder='Encuentre un Producto'
            style={{ width: 250 }}
            defaultActiveFirstOption={false}
            showArrow={false}
            filterOption={false}
            onSearch={onSearch}
            onChange={onChange}
            notFoundContent={
              value.length <= 1 ? null : (
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <p> No Existe. Desea Agregarlo?</p>
                  <Button size='small' type='primary'>
                    {' '}
                    Ok{' '}
                  </Button>
                </div>
              )
            }
            onBlur={() => setValue('')}
          >
            {options &&
              options.map((obj) => (
                <Option key={obj.value} value={obj.value}>
                  <ItemFound item={obj} />
                  {/* <div style={{ fontWeight: 'bold' }}>{obj.key + ' ' + obj.label}</div> */}
                </Option>
              ))}
          </Select>
        </div>
      </div>

      <p>{activeProduct && JSON.stringify(activeProduct)}</p>
    </div>
  );
};
