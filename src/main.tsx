import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { TooltipProvider } from "@/components/shadcn/tooltip"
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TooltipProvider>
    <RouterProvider router={router} />
    </TooltipProvider>
  </StrictMode>,
);
