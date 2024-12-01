import React from "react";
import Stock from "../../components/Stock";
import Calendar from "../../components/Calendar";
import Recipe from '../../components/Recipe';
import { useLanguageNav } from "../../contexts/LanguageContext";

export default function Center() {
  const { currentNavigation } = useLanguageNav();

  return (
    <div className="w-[100%] flex flex-row justify-center items-center bg-orange-300">
      {currentNavigation === "main" && <Calendar />}
      {currentNavigation === "stock" && <Stock />}
      {currentNavigation === "recipe" && <Recipe />}
    </div>
  );
}
