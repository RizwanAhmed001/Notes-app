import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import NoteContextProvider from "./context/NoteContent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NoteContextProvider>
        <App />
      </NoteContextProvider>
    </BrowserRouter>
  </StrictMode>,
);
