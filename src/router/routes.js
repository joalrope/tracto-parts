// import { AppLayout } from '../layouts/AppLayout';
import { Home, Sales, Inventory } from '../components/pages';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

// export const initRoutes = [
//   { path: '/', name: 'Starter', type: 'public', component: AppLayout },
// ];

export const routes = [
  {
    key: 1,
    path: '/home',
    name: 'Inicio',
    icon: UserOutlined,
    component: Home,
  },
  {
    key: 2,
    path: '/app/sales',
    name: 'Ventas',
    icon: VideoCameraOutlined,
    component: Sales,
  },
  {
    key: 3,
    path: '/app/inventory',
    name: 'Inventario',
    icon: UploadOutlined,
    component: Inventory,
  },

  // { path: '/', pathTo: '/home', name: 'Inicio', redirect: true },
];
