import Routers from "./routes/Routers";
import { Toaster } from "@/components/ui/toaster";

import "./index.css";

function App() {
  return (
    <>
      <div className="min-h-[100vh] sea">
        <Routers />
        <Toaster />
        {/* <div className="min-w-[100vw] min-h-[100vh] absolute top-0 pointer-events-none"></div> */}
      </div>
    </>
  );
}

export default App;
