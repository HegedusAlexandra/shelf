import React from "react";
import Menu from "./Menu";

export default function Layout({ children }) {
  return (
    <div className="w-full flex flex-row justify-center items-center font-opensans">
      <Menu />
      <div className="w-[100%] h-[100%] flex flex-row justify-center items-center bg-teal-900">
        {children}
      </div>
    </div>
  );
}
