import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

const redirectUri = window.location.hostname === 'localhost'
  ? window.location.origin
  : 'https://syntaxtual.co';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="d273liu.ca.auth0.com"
      clientId="G3cUNE1TJgDRlxR5bVbZAOeTss2sAjTT"
      authorizationParams={{
        redirect_uri: redirectUri
      }}
    >
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
);
