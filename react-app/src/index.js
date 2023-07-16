import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import { CompanyProvider } from "./Contexts/CompanyContext";

import App from "./App";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <CompanyProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CompanyProvider>
  </AuthProvider>
);
