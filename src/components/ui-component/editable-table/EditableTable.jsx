import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';
import './editable-table.scss';

export const EditableContext = React.createContext(null);

export const EditableTable = ({ dataSource, cols, tax, saveTableData }) => {
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
        summary={(pageData) => {
          let totalInvoice = 0;
          let totalTax = 0;

          pageData.forEach(({ totalItem }) => {
            totalInvoice += totalItem;
            totalTax += totalItem * (tax / 100);
          });

          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell align='right' colSpan={6}>
                  Total Venta:
                </Table.Summary.Cell>
                <Table.Summary.Cell align={'right'}>
                  {Number(totalInvoice).toLocaleString('es-CO', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell align='right' colSpan={6}>
                  {`I.V.A. (${tax}%):`}
                </Table.Summary.Cell>
                <Table.Summary.Cell align={'right'}>
                  {Number(totalTax).toLocaleString('es-CO', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell align='right' colSpan={6}>
                  Total Factura:
                </Table.Summary.Cell>
                <Table.Summary.Cell align={'right'}>
                  {(Number(totalInvoice) + Number(totalTax)).toLocaleString('es-CO', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
    </div>
  );
};

EditableTable.propTypes = {
  cols: PropTypes.array,
  dataSource: PropTypes.array,
  tax: PropTypes.number,
  saveTableData: PropTypes.func,
};
