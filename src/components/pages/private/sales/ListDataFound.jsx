import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import './list-data-found.scss';

export const ListDataFound = ({ data, columns, handleClick, hasHeader = false }) => {
  const [isTableVisible, setIsTableVisible] = useState(true);

  const manageClick = (item) => {
    setIsTableVisible(false);
    handleClick(item);
  };

  return (
    isTableVisible && (
      <table className='found-data-table'>
        {hasHeader && (
          <thead>
            <tr>{columns.map((column) => column[2] && <th key={column[0]}>{column[1]}</th>)}</tr>
          </thead>
        )}
        <tbody>
          {data.map((item) => (
            <tr key={item[columns[0][0]]} onClick={() => manageClick(item)}>
              {columns.map((column) => column[2] && <td key={item[column[0]]}>{item[column[0]]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

ListDataFound.propTypes = {
  data: PropTypes.object,
  columns: PropTypes.object,
  handleClick: PropTypes.func,
  hasHeader: PropTypes.bool,
};
