import React from 'react';
import PropTypes from 'prop-types';
import { TableAttrib } from '../../../classes/table-attrib-class';
import { invoiceCols } from '../../../assets/data/products-for-sale.dataConfig';
import './invoice.scss';

export const InvoiceBody = ({ products }) => {
  const column = new TableAttrib(invoiceCols);

  return (
    <div className='invoice-body'>
      <table className='invoiced-products-for-sale-table'>
        <thead>
          {
            <tr>
              {Object.keys(products[0]).map(
                (key) => column.isCellVisible(key) && <th key={key}>{column.getTitleHeader(key)}</th>
              )}
            </tr>
          }
        </thead>
        <tbody>
          {Object.values(products).map((values) => {
            return (
              <tr key={`${values.id}${values.item}`}>
                {Object.entries(values).map(
                  ([key, value]) =>
                    column.isCellVisible(key) && (
                      <td key={key} className={column.getCellClass(key)}>
                        {column.value(key, value)}
                      </td>
                    )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

InvoiceBody.propTypes = {
  products: PropTypes.array,
};
