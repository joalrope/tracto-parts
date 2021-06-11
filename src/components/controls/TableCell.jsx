import React from 'react';
import { TableAttrib } from '../../helpers/sales/table-attrib-class';

export const TableCell = ({
  key,
  idRow,
  value,
  span,
  columns,
  handleClick,
}) => {
  const attrib = new TableAttrib(columns);

  return (
    <td
      key={idRow}
      rowSpan={span}
      align={attrib.getCellAlign(key)}
      className={attrib.getCellClass(key)}
      onClick={() => handleClick(key, value)}>
      {attrib.getCellValue(key, value)}
    </td>
  );
};
