import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
//import { NotFoundContent } from './NotFoundContent';
import { SelectListItem } from './SelectListItem';
const { Option } = Select;

export const AsyncDataSelect = ({ placeholder, dataSource, result, notFoundContent, disabled }) => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [fetching, setFetching] = React.useState(false);

  const onSearch = async (value) => {
    if (value) {
      setValue(value);
      setFetching(true);
      setOptions(await dataSource(value));
      setFetching(false);
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

  const showNotFountContent = () => {
    if (options?.length === 0 && value.length > 1) {
      return notFoundContent;
    }
    return null;
  };

  return (
    <div>
      <Select
        className='--search-select__container'
        showSearch
        value={value}
        placeholder={placeholder}
        style={style}
        defaultActiveFirstOption={true}
        showArrow={false}
        filterOption={false}
        onSearch={onSearch}
        onChange={onChange}
        notFoundContent={fetching ? <Spin size='small' /> : showNotFountContent()}
        onBlur={() => setValue('')}
        disabled={disabled}
        listItemHeight={10}
        listHeight={250}
      >
        {options.length > 0 &&
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
  notFoundContent: PropTypes.element,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};
