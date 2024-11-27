import React from "react";
import plus from "../assets/icons/plus.png";
import stock from "../assets/icons/house.png";
import uprightarrow from "../assets/icons/uprightarrow.png";
import print from "../assets/icons/print.png";
import { useLanguageNav } from "../contexts/LanguageContext";
import { Navigation } from "../utils/Enum";

export default function NavButton({ title, icon }) {
  const { currentNavigation, setCurrentNavigation } = useLanguageNav();

  // Handle navigation logic
  const handleNavigation = () => {
    const navigationMap = {
      készlet: Navigation.STOCK,
      naptár: Navigation.MAIN,
      nap: Navigation.DAY,
      napi_nyersanyagok: Navigation.DAILY,
      heti_nyersanyagok: Navigation.WEEKLY,
      recept: Navigation.RECIPE,
    };

    const newNavigation = navigationMap[title];
    // Only update navigation if it's different from the current one
    if (newNavigation && newNavigation !== currentNavigation) {
      setCurrentNavigation(newNavigation);
    }
  };

  // Determine the icon based on the provided prop
  const iconMap = {
    plus,
    stock,
    uprightarrow,
    print,
  };

  return (
    <button
      onClick={handleNavigation} // Trigger navigation update on click
      className={`w-[100%] h-[10vh]  bg-[#fad2e4] flex flex-row justify-between items-center px-[2vw] hover:bg-white focus:bg-sky-50`}
    >
      <p
        className="text-lg text-[#663F4F] font-bold drop-shadow-md pr-[1vw]"
        style={{
          textShadow:
            "2px 2px 2px rgba(255, 255, 255, 0.7)",
        }}
      >
        {title}
      </p>
      <img
        src={iconMap[icon]} // Dynamically fetch the correct icon
        alt={icon}
        className="w-[30px] h-[30px] rounded"
        style={{
          borderWidth: "2px", // Optional: Add a border for visual clarity
          borderColor: "blue",
        }}
      />
    </button>
  );
}
