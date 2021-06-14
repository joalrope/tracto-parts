import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { NotFoundContentMsg } from './NotFoundContentMsg';
import { SelectListItem } from './SelectListItem';
const { Option } = Select;

export const AsyncDataSelect = ({placeholder, dataSource, result, notFoundAsyncData, style}) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  const onSearch = async (value) => {
    if (value) {
      setValue(value);
      setOptions(await dataSource(value));
    } else {
      setOptions([]);
    }
  };

  const onChange = (value) => {
    setValue(value);
    result(value);
    setValue('');
    setOptions([]);
  };

  return (
    <div>
      <Select
        showSearch
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        notFoundContent={value.length <= 1 ? null : notFoundAsyncData ? <NotFoundContentMsg noFoundresult={notFoundAsyncData} /> : 'Sin datos que mostrar'}
        onBlur={() => setValue('')}
      >
        {options.length >= 0 &&
          options.map((obj) => (
            <Option key={obj.value} value={obj.value}>
              <SelectListItem item={obj} />
            </Option>
          ))}
      </Select>
    </div>
  );
};

AsyncDataSelect.propTypes = {
  dataSource: PropTypes.func,
  placeholder: PropTypes.string,
  result: PropTypes.func,
  notFoundAsyncData: PropTypes.func,
  style: PropTypes.object,
};
