import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
