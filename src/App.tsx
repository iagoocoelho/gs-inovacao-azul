import Routers from "./routes/Routers";
import { Toaster } from "@/components/ui/toaster";
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import "./index.css";



function App() {
  return (
    <>
      <div className="min-h-[100vh] sea flex flex-col">
        <Routers />
        <Toaster />
      </div>
    </>
  );
}

export default App;
