import React from "react";
import LeftColumn from "./LeftColumn";
import Center from "./Center";

export default function DashboardPage() {

  return (
    <div className="w-full h-[100vh] flex flex-row justify-center items-center font-opensans">
      <LeftColumn/>
      <Center />
    </div>
  );
}
