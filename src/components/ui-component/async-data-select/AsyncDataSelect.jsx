import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { NotFoundContent } from './NotFoundContent';
import { SelectListItem } from './SelectListItem';
const { Option } = Select;

export const AsyncDataSelect = ({ placeholder, dataSource, result, notFoundAsyncData, disabled }) => {
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

  const style = { width: '100%' };

  return (
    <div>
      <Select
        className='--search-select__container'
        showSearch
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        notFoundContent={
          value.length <= 1 ? null : <NotFoundContent value={value} notFoundAsyncData={notFoundAsyncData} />
        }
        onBlur={() => setValue('')}
        disabled={disabled}
        listItemHeight={10}
        listHeight={250}
      >
        {options &&
          options.length >= 0 &&
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
  disabled: PropTypes.bool,
};
