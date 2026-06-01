import { Outlet } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/tanstack-query-client";
import { AppLayout } from "./features/AppLayout";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </QueryClientProvider >
  );
}

export default App;
