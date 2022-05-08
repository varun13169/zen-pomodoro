import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";

import App from "./App";
import { ThemeContextProvider, TodoTasksContextProvider } from "./contexts";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <TodoTasksContextProvider>
          <App />
        </TodoTasksContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </StrictMode>
);
