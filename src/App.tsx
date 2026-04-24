import "./App.css";
import { Outlet } from "react-router";

function App() {
  return (
    <main className="p-[14px]">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
