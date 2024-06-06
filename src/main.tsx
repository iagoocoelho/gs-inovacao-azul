import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { GeoapifyContext } from "@geoapify/react-geocoder-autocomplete";
import { BrowserRouter } from "react-router-dom";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GeoapifyContext apiKey={import.meta.env.VITE_MAPS_API_KEY}>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </GeoapifyContext>
);
