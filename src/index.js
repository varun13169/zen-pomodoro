import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { makeServer } from "./server";

// Call make Server
makeServer();

import App from "./App";
import {
  AuthContextProvider,
  ThemeContextProvider,
  TodoTasksContextProvider,
} from "./contexts";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <ThemeContextProvider>
      <AuthContextProvider>
        <TodoTasksContextProvider>
          <App />
        </TodoTasksContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </BrowserRouter>
  // </StrictMode>
);
