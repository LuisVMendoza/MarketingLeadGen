import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "./style.css";
import "./layouts.css";
import "./pages.css";
import "./pages-extra.css";
import "./misc.css";
import "./overlays.css";
import "./responsive.css";
import "./enhancements.css";
import "./iteration.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
