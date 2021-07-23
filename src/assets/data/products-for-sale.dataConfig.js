export const pdfColumns = [
  {
    name: 'id',
    title: 'id',
    type: 'string',
    visible: false,
    class: 'text-left',
  },
  {
    name: 'key',
    title: 'Item',
    type: 'string',
    visible: true,
    class: 'text-center',
  },
  {
    name: 'item',
    title: 'Item',
    type: 'string',
    visible: true,
    class: 'text-center',
  },
  {
    name: 'code',
    title: 'Código',
    type: 'string',
    visible: true,
    class: 'text-left',
  },
  {
    name: 'title',
    title: 'Descripción',
    type: 'string',
    visible: true,
    class: 'text-left',
  },
  {
    name: 'trademark',
    title: 'Marca',
    type: 'string',
    visible: true,
    class: 'text-center',
  },
  {
    name: 'salePrice',
    title: 'Precio Venta',
    type: 'number',
    visible: true,
    class: 'bold text-right',
  },
  {
    name: 'qty',
    title: 'Cantidad',
    type: 'number',
    visible: true,
    editable: true,
    class: 'td-input-qty bold text-right pointer',
  },
  {
    name: 'total',
    title: 'Total Item',
    type: 'number',
    visible: true,
    editable: false,
    class: 'bold text-right',
  },
  {
    name: 'subTotal',
    title: 'SUB-TOTAL',
    type: 'string',
    visible: true,
    editable: false,
    class: 'text-right',
  },
  {
    name: 'saleTotal',
    title: 'TOTAL VENTA',
    type: 'string',
    visible: true,
    editable: false,
    class: 'text-right',
  },
];

export const template = ['item', 'code', 'title', 'trademark', 'qty', 'qtyAvailable', 'salePrice', 'total'];
