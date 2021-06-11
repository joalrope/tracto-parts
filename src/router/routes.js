import {
  About,
  Contact,
  Dashboard,
  Equipment,
  Forgot,
  Home,
  Inventory,
  Login,
  NotFound,
  Products,
  Quote,
  Register,
  Reports,
  Sales,
} from '../components/pages/index';

import {
  HomeOutlined,
  ContactsOutlined,
  CommentOutlined,
  AreaChartOutlined,
  MacCommandOutlined,
  RollbackOutlined,
  AppstoreAddOutlined,
  LoginOutlined,
  TagsOutlined,
  DollarOutlined,
  UserAddOutlined,
  PrinterOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';

export const routes = [
  {
    key: 1,
    path: '/about',
    type: 'public',
    name: 'Nosotros',
    icon: CommentOutlined,
    component: About,
  },
  {
    key: 2,
    path: '/contact',
    type: 'public',
    name: 'Contacto',
    icon: ContactsOutlined,
    component: Contact,
  },
  {
    key: 3,
    path: '/app/dashboard',
    type: 'private',
    name: 'Panel de Control',
    icon: AreaChartOutlined,
    component: Dashboard,
  },
  {
    key: 4,
    path: '/equipment',
    type: 'public',
    name: 'Equipos',
    icon: MacCommandOutlined,
    component: Equipment,
  },
  {
    key: 5,
    path: '/forgot',
    type: 'public',
    name: '',
    icon: RollbackOutlined,
    component: Forgot,
  },
  {
    key: 6,
    path: '/home',
    type: 'public',
    name: 'Inicio',
    icon: HomeOutlined,
    component: Home,
  },
  {
    key: 7,
    path: '/app/inventory',
    type: 'private',
    name: 'Inventario',
    icon: AppstoreAddOutlined,
    component: Inventory,
  },
  {
    key: 8,
    path: '/login',
    type: 'public',
    name: 'Ingresar',
    icon: LoginOutlined,
    component: Login,
  },
  {
    key: 9,
    path: '/app/products',
    type: 'private',
    name: 'Productos',
    icon: TagsOutlined,
    component: Products,
  },
  {
    key: 10,
    path: '/app/quote',
    type: 'private',
    name: 'Cotizar',
    icon: DollarOutlined,
    component: Quote,
  },
  {
    key: 11,
    path: '/register',
    type: 'public',
    name: 'Registrarse',
    icon: UserAddOutlined,
    component: Register,
  },
  {
    key: 12,
    path: '/app/reports',
    type: 'private',
    name: 'Reportes',
    icon: PrinterOutlined,
    component: Reports,
  },
  {
    key: 13,
    path: '/app/sales',
    type: 'private',
    name: 'Ventas',
    icon: FileDoneOutlined,
    component: Sales,
  },

  {
    key: 14,
    type: 'error',
    component: NotFound,
  },
  { path: '/', pathTo: '/home', name: 'Inicio', redirect: true },
];
