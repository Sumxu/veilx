import { lazy } from "react";
import { Navigate } from "react-router-dom";
const Node = lazy(() => import("@/pages/Node/index"));
const Home = lazy(() => import("@/pages/Tabbar/Home/index"));
const GuidePage = lazy(() => import("@/pages/GuidePage/index"));
const MyTeam = lazy(() => import("@/pages/MyTeam/index"));
export const routes = [
  { path: "/", element: <Navigate to="/GuidePage" replace /> },
  { path: "/Home", element: <Home /> },
  { path: "/Node", element: <Node /> },
  { path: "/GuidePage", element: <GuidePage /> },
  { path: "/MyTeam", element: <MyTeam /> },
];
