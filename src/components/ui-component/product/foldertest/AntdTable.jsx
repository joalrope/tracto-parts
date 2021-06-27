import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';
import './antd-table.scss';

export const EditableContext = React.createContext(null);

export const AntdTable = ({ dataSource, cols }) => {
  //const [dataSource, setDataSource] = useState([]);
  /* constructor(props) {
    super(props);
    this.columns = props.cols;
  } */

  /*  handleDelete = (key) => {
    const dataSource = [...this.props.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  }; */

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    console.log(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = cols.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      <Table
        className='--product-for-sale__table'
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

AntdTable.propTypes = {
  cols: PropTypes.array,
  dataSource: PropTypes.array,
};
