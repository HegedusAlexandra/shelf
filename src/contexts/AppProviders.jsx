// AppProviders.js
import React from "react";
import { UserProvider } from "./UserContext";
import { LanguageProvider } from "./LanguageContext";

export const AppProviders = ({ children }) => (
  <UserProvider>
    <LanguageProvider>
        {children}
    </LanguageProvider>
  </UserProvider>
);
