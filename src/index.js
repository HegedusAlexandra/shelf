import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import reportWebVitals from "./reportWebVitals";
import "../src/utils/i18n/i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LanguageNavProvider } from "./contexts/LanguageContext";
import { Sitemap } from "./utils/Enum";
import { ApolloProvider } from '@apollo/client';
import client from './utils/ApolloClient';

const router = createBrowserRouter([
  {
    path: `/${Sitemap.HOME}`,
    element: (
      <div className="w-full h-full">
        <HomePage />
      </div>
    )
  },
  {
    path: `/${Sitemap.DASHBOARD}`,
    element: (
        <DashboardPage />
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <LanguageNavProvider>
      <RouterProvider router={router} />
    </LanguageNavProvider>
  </ApolloProvider>
);

reportWebVitals();
