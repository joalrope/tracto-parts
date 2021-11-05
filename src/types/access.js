import { roles } from './roles';

const { seller, storer, storerChief, manager, admin, owner, developer } = roles;

export const access = {
  allPage: [seller, storer, storerChief, manager, admin, owner, developer],
  stock: [storer, storerChief, manager, manager, admin, developer], // Inventario
  products: [storer, storerChief, manager, admin, developer], // Productos
  quote: [storer, storerChief, seller, manager, admin, owner], // Cotizacion
  sales: [storerChief, seller, manager, admin, developer], // Ventas
  reports: [manager, admin, owner, developer], // Reportes
  billing: [manager, admin, owner, developer], // billing
  dashboard: [owner, developer], // Panel
};
