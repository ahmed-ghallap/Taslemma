import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

const supportsContainerQueries = "container" in document.documentElement.style;

if (!supportsContainerQueries) {
  import("container-query-polyfill");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
