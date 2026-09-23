import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./app";
import PreviewGate from "./preview-gate";
import "./style.css";
import "./layouts.css";
import "./pages.css";
import "./pages-extra.css";
import "./misc.css";
import "./overlays.css";
import "./responsive.css";
import "./enhancements.css";
import "./iteration.css";
import "./professional.css";

const Router =
  import.meta.env.VITE_GITHUB_PAGES === "true" ? HashRouter : BrowserRouter;

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PreviewGate>
      <Router>
        <App />
      </Router>
    </PreviewGate>
  </React.StrictMode>,
);
