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
    <div className="flex-1 h-[100vh] bg-sky-300 overflow-y-scroll hide-scrollbar smooth-scroll">
      <h1
        className="text-[10vh] font-bold w-full flex justify-center p-[2vw] text-sky-300 bg-sky-50"
        style={{
          textShadow:
            "1px 1px 1px rgba(0, 0, 0, 0.7), -1px -1px 2px rgba(0, 0, 0, 0.2)"
        }}
      >
        {titleList[currentNavigation]}
      </h1>
      {currentNavigation === "main" && <Calendar />}
      {currentNavigation === "stock" && <Stock />}
      {currentNavigation === "recipe" && <Recipe />}
    </div>
  );
}
