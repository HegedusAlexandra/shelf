import React from "react";
import Menu from "./Menu";
import Center from "./Center";

export default function DashboardPage() {

  return (
    <div className="w-full flex flex-row justify-center items-center font-opensans">  
      <Menu/>
      <Center />
    </div>
  );
}
