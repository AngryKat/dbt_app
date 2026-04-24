import type { RouteObject } from "react-router";

import { DistressEntries } from "./index";
import { DistressEntryForm } from "./features/DistressEntryForm";
import { Emotions } from "./features/Emotions";

export const distressEntryRoutes: RouteObject[] = [
  {
    path: "distress-entry",
    element: <DistressEntries />,
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
