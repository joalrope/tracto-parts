import {
  AboutPage,
  ContactPage,
  DashboardPage,
  EquipmentPage,
  ForgotPage,
  HomePage,
  InventoryPage,
  LoginPage,
  //ProductsPage,
  //QuotePage,
  RegisterPage,
  ReportPage,
  SalesPage,
} from "../../components/pages";

const arAll = "all"; // Todos

const arInve = ["storer", "storer-chief", "admin", "developer"]; // Inventario
//const arProd = ['storer', 'storer-chief', 'admin', 'developer']; // Productos
//const arQuot = ['freelance', 'storer', 'storer-chief', 'seller', 'admin', 'owner', 'developer']; // Cotizacion
const arSell = ["storer-chief", "seller", "admin", "developer"]; // Ventas
const arRepo = ["admin", "owner", "developer"]; // Reportes
const arDash = ["owner", "developer"]; // Panel

export const items = [
  { id: 10, title: "Inicio", to: "/", roles: arAll, component: HomePage },
  {
    id: 20,
    title: "Equipos",
    to: "/equipments",
    roles: arAll,
    component: EquipmentPage,
  },
  {
    id: 30,
    title: "Contacto",
    to: "/contact",
    roles: arAll,
    component: ContactPage,
  },
  {
    id: 40,
    title: "Nosotros",
    to: "/about",
    roles: arAll,
    component: AboutPage,
  },
  { id: 50, title: "", to: "/login", roles: arAll, component: LoginPage },
  {
    id: 60,
    title: "",
    to: "/register",
    roles: arAll,
    component: RegisterPage,
  },
  {
    id: 70,
    title: "",
    to: "/forgot",
    roles: arAll,
    component: ForgotPage,
  },
  {
    id: 80,
    title: "Inventario",
    to: "/app/inventory",
    roles: arInve,
    component: InventoryPage,
  },
  // {
  //   id: 90,
  //   title: 'Cargar',
  //   to: '/app/prods-in',
  //   roles: arProd,
  //   component: ProductsPage,
  // },
  // {
  //   id: 100,
  //   title: 'Descargar',
  //   to: '/app/prods-out',
  //   roles: arProd,
  //   component: ProductsPage,
  // },
  {
    id: 110,
    title: "Ventas",
    to: "/app/sales",
    roles: arSell,
    component: SalesPage,
  },
  // {
  //   id: 120,
  //   title: 'Cotización',
  //   to: '/app/quote',
  //   roles: arQuot,
  //   component: QuotePage,
  // },
  {
    id: 130,
    title: "Reportes",
    to: "/app/reports",
    roles: arRepo,
    component: ReportPage,
  },
  {
    id: 140,
    title: "Panel",
    to: "/app/dashboard",
    roles: arDash,
    component: DashboardPage,
  },
];
