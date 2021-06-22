export const template = ['code', 'name', 'address', 'email', 'phone', 'isRegularCustomer', 'contact'];

export const columns = [
  {
    key: 'code',
    dataIndex: 'code',
    title: 'RIF',
  },
  {
    key: 'name',
    dataIndex: 'name',
    title: 'Nombre',
  },
  {
    key: 'address',
    dataIndex: 'address',
    title: 'Dirección',
    width: 400,
    align: 'center',
  },
  {
    key: 'email',
    dataIndex: 'email',
    title: 'Correo',
  },
  {
    key: 'phone',
    dataIndex: 'phone',
    title: 'Teléfono',
  },
];
