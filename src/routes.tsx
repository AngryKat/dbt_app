import { createBrowserRouter, type RouteObject } from "react-router";

import App from "./App";
import { StressForm } from "./features/StressForm";

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <StressForm />,
      },
    ],
  },
];

export const router = createBrowserRouter(appRoutes);
