import React /* useEffect, useState*/ from 'react';
//import { Select } from 'antd';
//import {  useDispatch,  useSelector } from 'react-redux';
//import { getProductByCode, findProductById } from '../../../../actions/products';
//import { SelectListItem } from './search/SelectListItem';
//import { NotFoundContentMsg } from './search/NotFoundContentMsg';
//const { Option } = Select;

export const Inventory = () => {
  //const [options, setOptions] = useState([]);
  //const [value, setValue] = useState([]);
  //const dispatch = useDispatch();
  // const { activeProduct } = useSelector((state) => state.product);
  //let productsFound = [];

  /* const getItems = async (value) => {
    //setValue(value);
    const products = await await getProductByCode(value);
    if (products) {
      products.map((item) => {
        productsFound.push({
          label: item.title,
          key: item.code,
          value: item.id,
        });
      });
      //setOptions(productsFound);
    } else {
      //setOptions([]);
    }
  }; */

  /*  const onSearch = (value) => {
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
  }; */

  return (
    <div>
      <h2>Inventario</h2>
      {/*       <Select
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
 */}
      {/* <p>{activeProduct && JSON.stringify(activeProduct)}</p> */}
    </div>
  );
};
