import { roles } from './roles';

const { seller, storer, storerChief, manager, admin, owner, developer } = roles;

export const access = {
  allPage: [seller, storer, storerChief, manager, admin, owner, developer],
  customer: [storer, storerChief, manager, admin, developer], // Clientes
  stock: [storer, storerChief, manager, manager, admin, developer], // Inventario
  products: [storer, storerChief, manager, admin, developer], // Productos
  quote: [storer, storerChief, seller, manager, admin, owner], // Cotizacion
  sales: [storer, storerChief, seller, manager, admin, developer], // Ventas
  deliveryNotes: [storer, storerChief, manager, admin, developer], // Notas deentrega
  reports: [manager, admin, owner, developer], // Reportes
  billing: [manager, admin, owner, developer], // billing
  dashboard: [owner, developer], // Panel
};
