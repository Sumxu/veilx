import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Node = lazy(() => import("@/pages/Node/index"));
const Home = lazy(() => import("@/pages/Tabbar/Home/index"));
export const routes = [
  { path: "/", element: <Navigate to="/Home" replace /> },
  { path: "/Home", element: <Home /> },
  { path: "/Node", element: <Node /> },
];