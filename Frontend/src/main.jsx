// main.jsx - Entry point of the React application
// Mounts the App component into the root DOM element defined in index.html

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// StrictMode enables additional runtime warnings during development
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
