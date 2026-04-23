import "./App.css";
import { StressForm } from "./features/StressForm";

function App() {
  return (
    <main className="p-2">
      <div className="flex min-h-svh flex-col items-center justify-center">
        <StressForm />
      </div>
    </main>
  );
}

export default App;
