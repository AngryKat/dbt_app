import type { RouteObject } from "react-router";

import { DistressEntry } from ".";
import { DistressEntryForm } from "./features/DistressEntryForm";
import { Emotions } from "./features/Emotions";

export const distressEntryRoutes: RouteObject[] = [
  {
    path: "distress-entry",
    element: <DistressEntry />,
    children: [
      {
        index: true,
        element: <DistressEntryForm />,
      },
      {
        path: "emotions",
        element: <Emotions />,
      },
    ],
  },
];
