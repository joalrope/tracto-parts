import React from 'react';
import PropTypes from 'prop-types';
//import { TableAttrib } from '../../../classes/table-attrib-class';
//import { pdfColumns } from '../../../assets/data/products-for-sale.dataConfig';
import './invoice.scss';
import { EditableTable } from '../../ui-component/editable-table/EditableTable';
import { forSaleColumns } from '../../../assets/data/products.dataConfig';

export const InvoiceBody = ({ products }) => {
  //const attrib = new TableAttrib(pdfColumns);
  console.log(products);

  return (
    <div className='invoice-body'>
      <EditableTable dataSource={products} cols={forSaleColumns} tax={0} /* saveTableData={saveEditedProducts} */ />

      {/* <table className='invoiced-products-for-sale-table'>
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
                      {attrib.getCellValue(key, value) !== 0 ? attrib.getCellValue(key, value) : ''}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

InvoiceBody.propTypes = {
  products: PropTypes.object,
};
