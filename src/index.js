import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import "./i18n"; // if not already initialized here

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <HomePage />
  </BrowserRouter>
);
