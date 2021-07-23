import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';
import './editable-table.scss';

export const EditableContext = React.createContext(null);

export const EditableTable = ({ dataSource, cols, summary, saveTableData }) => {
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    saveTableData(newData);
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

  let summaryRender = null;
  if (summary) {
    summaryRender = (pageData) => summary(pageData);
  }

  return (
    <div className='--editable-info__container'>
      <Table
        className='--editable-info__table'
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: 'max-content' }}
        summary={summaryRender}
      />
    </div>
  );
};

EditableTable.propTypes = {
  cols: PropTypes.array,
  dataSource: PropTypes.array,
  summary: PropTypes.number,
  saveTableData: PropTypes.func,
};
