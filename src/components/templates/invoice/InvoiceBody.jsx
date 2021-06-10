import React from 'react';
import { TableAttrib } from '../../../classes/table-attrib-class';
import { columns } from '../../../assets/data/products-for-sale.dataConig';
import './invoice.scss';

export const InvoiceBody = ({ products }) => {
  const attrib = new TableAttrib(columns);

  return (
    <div className='invoice-body'>
      <table className='invoiced-products-for-sale-table'>
        <thead>
          {
            <tr>
              {Object.keys(products[0]).map(
                (key) => attrib.isCellVisible(key) && <th key={key}>{attrib.getTitleHeader(key)}</th>
              )}
            </tr>
          }
        </thead>
        <tbody>
          {Object.values(products).map((values) => (
            <tr key={values.id}>
              {Object.entries(values).map(
                ([key, value]) =>
                  attrib.isCellVisible(key) && (
                    <td key={key} className={attrib.getCellClass(key)}>
                      {attrib.getCellValue(key, value)}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
