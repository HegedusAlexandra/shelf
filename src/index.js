import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import "../src/utils/i18n/i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Sitemap } from "./utils/Enum";
import { ApolloProvider } from "@apollo/client";
import client from "./utils/ApolloClient";
import { AppProviders } from "./contexts/AppProviders";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import Layout from './pages/Dashboard/Layout'
import Calendar from './pages/Dashboard/Calendar'
import Stock from './pages/Dashboard/Stock'
import Recipe from './pages/Dashboard/Recipe'

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
      <Layout>
        <DashboardPage />
      </Layout>
    )
  },
  {
    path: `/${Sitemap.DASHBOARD}/calendar`,
    element: (
      <Layout>
        <Calendar />
      </Layout>
    )
  },
  {
    path: `/${Sitemap.DASHBOARD}/recipe`,
    element: (
      <Layout>
        <Recipe />
      </Layout>
    )
  },
  {
    path: `/${Sitemap.DASHBOARD}/stock`,
    element: (
      <Layout>
        <Stock />
      </Layout>
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </ApolloProvider>
);

reportWebVitals();
