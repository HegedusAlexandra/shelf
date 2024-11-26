import React from "react";
import Stock from "../../components/Stock";
import Calendar from "../../components/Calendar";
import Daylist from '../../components/DayList';
import Weeklylist from '../../components/WeeklyList';
import Recipe from '../../components/Recipe';
import { useLanguageNav } from "../../contexts/LanguageContext";

export default function Center() {
  const { currentNavigation } = useLanguageNav();

  const titleList = {
    day: "Napi lista",
    daily: "Napi nyersanyagok",
    weekly: "Heti nyersanyagok",
    stock: "Készlet",
    recipe: "Recept",
    main: "Irányítópult"
  };

  return (
    <div className="flex-1 h-[100vh] bg-cyan-50">
      <h1
        className="text-[10vh] font-bold w-full flex justify-center p-[2vw] text-cyan-300 bg-cyan-50"
        style={{
          textShadow:
            "1px 1px 1px rgba(0, 0, 0, 0.7), -1px -1px 2px rgba(0, 0, 0, 0.2)"
        }}
      >
        {titleList[currentNavigation]}
      </h1>
      {currentNavigation === "main" && <Calendar />}
      {currentNavigation === "stock" && <Stock />}
      {currentNavigation === "daily" && <Daylist />}
      {currentNavigation === "weekly" && <Weeklylist />}
      {currentNavigation === "recipe" && <Recipe />}
    </div>
  );
}
