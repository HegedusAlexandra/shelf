import React from "react";
import Stock from "../../components/Stock";
import Calendar from "../../components/Calendar";
import Recipe from '../../components/Recipe';
import { useLanguageNav } from "../../contexts/LanguageContext";

export default function Center() {
  const { currentNavigation } = useLanguageNav();

  const titleList = {
    stock: "Készlet",
    recipe: "Recept",
    main: "Irányítópult"
  };

  return (
    <div className="flex-1 h-[100vh] bg-stone-50 overflow-y-scroll hide-scrollbar smooth-scroll">
      <h1
        className="text-[6vh] w-full flex justify-center p-[2vw] text-stone-600"
      >
        {titleList[currentNavigation]}
      </h1>
      {currentNavigation === "main" && <Calendar />}
      {currentNavigation === "stock" && <Stock />}
      {currentNavigation === "recipe" && <Recipe />}
    </div>
  );
}
