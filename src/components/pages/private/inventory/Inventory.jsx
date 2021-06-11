import React, { useEffect, useState } from 'react';
import { Input, AutoComplete } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductsLoaded, findProductByCode } from '../../../../actions/products';
import { ItemFound } from './search/ItemFound';

export const Inventory = () => {
  const [options, setOptions] = useState(null);
  //const [inputvalue, setInputvalue] = useState(null);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  let productsFound = [];

  useEffect(() => {
    dispatch(findProductByCode('todos'));
    console.log(products);
    if (products) {
      products.map((item) => {
        productsFound.push({
          id: item.id,
          label: <ItemFound item={item} />,
          value: item.id,
        });
      });
      console.log(productsFound);
      setOptions(productsFound);
      console.log(options);
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearProductsLoaded());
      setOptions([]);
    };
  }, []);

  // const handleSearch = (value) => {
  //   console.log(value);
  // };

  const onSelect = (value) => {
    console.log('onSelect', value);
    //setInputvalue(null);
  };
  return (
    <div>
      <h2>Inventario</h2>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: 300,
        }}
        options={options}
        onSelect={onSelect}
        filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        // onSearch={handleSearch}
        //onChange={(value) => setInputvalue(value)}
        //value={inputvalue}
      >
        <Input.Search size='middle' placeholder='input here' />
      </AutoComplete>
    </div>
  );
};
