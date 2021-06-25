import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table /*Button , Popconfirm  */ } from 'antd';

import { EditableRow } from './EditableRow';
import { EditableCell } from './EditableCell';
import './antd-table.scss';

export const EditableContext = React.createContext(null);

export class AntdTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = props.cols;
  }

  handleDelete = (key) => {
    const dataSource = [...this.props.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };

  render() {
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
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
          handleSave: this.handleSave,
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
          dataSource={this.props.dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}

AntdTable.propTypes = {
  cols: PropTypes.array,
  dataSource: PropTypes.array,
  //dataSource2: PropTypes.array,
  count: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    dataSource: state.product.productsForSale,
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    /* spinReels: () => {
      // How to call my class below method here
      UltimateConsoleFunctionality.spinReels();
      dispatch({ type: "SPIN" });
    },
    stopReels: () => {
      // How to call my class below method here
      UltimateConsoleFunctionality.stopReels();
      dispatch({ type: "STOP" });
    },
    quickSpinMethod: () => {
      dispatch({ type: "QUICKSPIN" });
    } */
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AntdTable);
