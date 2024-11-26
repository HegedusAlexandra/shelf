import React from "react";
import Calendar from "../../components/Calendar";

export default function DashboardPage() {
  return (
    <div className="w-full bg-amber-50 p-[2vw] flex flex-col justify-center items-center">
      <Calendar />
    </div>
  );
}
