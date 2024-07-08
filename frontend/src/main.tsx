import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { ApolloProvider } from "@apollo/client";
import { client } from "./apolloClient.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([{ path: "/", element: <Home /> }]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
