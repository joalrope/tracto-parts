//const auth = ['storer-chief', 'admin', 'owner'];
export const productInfoTemplate = [
  'code',
  'title',
  'trademark',
  'qty',
  'location',
  'salePrice',
  'replacement',
  'measurement',
  'status',
];

export const activeProductTemplate = ['code', 'title', 'category', 'details', 'replacement', 'measurement', 'status'];

export const columns = [
  { title: 'Código', dataIndex: 'code', key: 'code' },
  { title: 'Descripción', dataIndex: 'title', key: 'title', width: 150 },
  { title: 'Marca', dataIndex: 'trademark', key: 'trademark' },
  { title: 'Cantidad', dataIndex: 'qty', key: 'qty' },
  { title: 'Locación', dataIndex: 'location', key: 'location' },
  { title: 'Precio Venta', dataIndex: 'salePrice', key: 'salePrice' },
  { title: 'Equivalencias', dataIndex: 'replacement', key: 'replacement' },
  { title: 'Medidas', dataIndex: 'measurement', key: 'measurement' },
  { title: 'Condición', dataIndex: 'status', key: 'status' },
];
