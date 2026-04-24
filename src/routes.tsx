import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import App from "./App";
import { distressEntryRoutes } from "./features/DistressEntry/routes";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/distress-entry" replace />,
      },
      ...distressEntryRoutes,
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
