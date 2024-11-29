import React from "react";
import Stock from "../../components/Stock";
import Calendar from "../../components/Calendar";
import Recipe from '../../components/Recipe';
import { useLanguageNav } from "../../contexts/LanguageContext";

export default function Center() {
  const { currentNavigation } = useLanguageNav();

  return (
    <div className="w-[100%] h-[100vh] bg-[#fccb62] overflow-y-scroll hide-scrollbar smooth-scroll">
      <div className="absolute z-10 r-0 w-[5vw] h-[5vw] rounded-full bg-[#fccb62]"></div>
      {currentNavigation === "main" && <Calendar />}
      {currentNavigation === "stock" && <Stock />}
      {currentNavigation === "recipe" && <Recipe />}
    </div>
  );
}
