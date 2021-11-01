import React from 'react';
import {
  About,
  Billing,
  Contact,
  Dashboard,
  Equipment,
  Forgot,
  Home,
  Stock,
  Login,
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

export const routes = {
  header: [
    {
      key: 1,
      path: '/home',
      type: 'public',
      name: 'Inicio',
      icon: HomeOutlined,
      component: Home,
    },
    {
      key: 2,
      path: '/equipment',
      type: 'public',
      name: 'Equipos',
      icon: MacCommandOutlined,
      component: Equipment,
    },
    {
      key: 3,
      path: '/contact',
      type: 'public',
      name: 'Contacto',
      icon: ContactsOutlined,
      component: Contact,
    },
    {
      key: 4,
      path: '/about',
      type: 'public',
      name: 'Nosotros',
      icon: CommentOutlined,
      component: About,
    },
    {
      key: 5,
      path: '/login',
      type: 'auth',
      role: 'public',
      name: 'Ingresar',
      icon: LoginOutlined,
      component: Login,
    },
    {
      key: 6,
      path: '/register',
      type: 'auth',
      role: 'public',
      name: 'Registrarse',
      icon: UserAddOutlined,
      component: Register,
    },
    {
      key: 7,
      path: '/logout',
      type: 'auth',
      role: 'private',
      name: 'Salir',
      icon: UserAddOutlined,
    },
    {
      key: 8,
      path: '/forgot',
      type: 'auth',
      name: '',
      icon: RollbackOutlined,
      component: Forgot,
    },
    { path: '/', pathTo: '/home', name: 'Inicio', redirect: true },
  ],
  sider: [
    {
      key: 1,
      path: '/app/dashboard',
      type: 'private',
      menu: 'sider',
      name: 'Panel de Control',
      icon: <AreaChartOutlined />,
      component: Dashboard,
    },

    {
      key: 2,
      path: '/app/stock',
      type: 'private',
      menu: 'sider',
      name: 'Inventario',
      icon: AppstoreAddOutlined,
      component: Stock,
    },
    {
      key: 13,
      path: '/app/sales',
      type: 'private',
      menu: 'sider',
      name: 'Ventas',
      icon: FileDoneOutlined,
      component: Sales,
    },
    {
      key: 14,
      path: '/app/billing',
      type: 'private',
      menu: 'sider',
      name: 'Facturación',
      icon: FileDoneOutlined,
      component: Billing,
    },
  ],
  submenu: [
    {
      key: 10.5,
      path: '/app/stock',
      type: 'private',
      menu: '',
      name: 'Productos',
      icon: TagsOutlined,
      component: Products,
    },
    {
      key: 11,
      path: '/app/quote',
      type: 'private',
      menu: '',
      name: 'Cotizar',
      icon: DollarOutlined,
      component: Quote,
    },
    {
      key: 12,
      path: '/app/reports',
      type: 'private',
      menu: '',
      name: 'Reportes',
      icon: PrinterOutlined,
      component: Reports,
    },
  ],
};
