import React, { useState } from 'react';
import { Select } from 'antd';
import { useDispatch } from 'react-redux';
import { getProductByCode, findProductById } from '../../../../actions/products';
import { NotFoundContentMsg } from './search/NotFoundContentMsg';
import { SelectListItem } from './search/SelectListItem';
const { Option } = Select;

export const AsyncDataSrlect = () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const dispatch = useDispatch();
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
        notFoundContent={value.length <= 1 ? null : <NotFoundContentMsg />}
        onBlur={() => setValue('')}
      >
        {options &&
          options.map((obj) => (
            <Option key={obj.value} value={obj.value}>
              <SelectListItem item={obj} />
            </Option>
          ))}
      </Select>
    </div>
  );
};
