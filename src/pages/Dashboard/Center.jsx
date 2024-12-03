import React from "react";
import Stock from "./Stock";
import Calendar from "./Calendar";
import Recipe from './Recipe';
import { useLanguageNav } from "../../contexts/LanguageContext";
import  { Navigation } from '../../utils/Enum'

export default function Center() {
  const { currentNavigation } = useLanguageNav();

  return (
    <div className="w-[100%] flex flex-row justify-center items-center bg-orange-300">
      {currentNavigation === Navigation.MAIN && <Calendar />}
      {currentNavigation === Navigation.STOCK && <Stock />}
      {currentNavigation === Navigation.RECIPE && <Recipe />}
    </div>
  );
}
