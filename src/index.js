import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import reportWebVitals from "./reportWebVitals";
import "../src/utils/i18n/i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./screens/Layout";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Sitemap } from "./utils/Enum";

const router = createBrowserRouter([
  {
    path: `/${Sitemap.HOME}`,
    element: (
      <div className="w-full h-full py-[10vh]">
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
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <RouterProvider router={router} />
  </LanguageProvider>
);

reportWebVitals();
