import React from "react";
import ReactDOM from "react-dom/client";

import "rc-pagination/assets/index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
