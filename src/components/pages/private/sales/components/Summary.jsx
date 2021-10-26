import React from 'react';
import { Table } from 'antd';

export const summary = (pageData, ivaTax, setAmountTax) => {
  let totalInvoice = 0;
  let totalTax = 0;

  pageData.forEach(({ totalItem }) => {
    totalInvoice += totalItem;
    totalTax += totalItem * (ivaTax / 100);
  });

  setAmountTax(totalTax);

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
          {`I.V.A. (${ivaTax}%):`}
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
};
