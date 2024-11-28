import React from "react";
import plus from "../assets/icons/plus.png";
import stock from "../assets/icons/house.png";
import uprightarrow from "../assets/icons/uprightarrow.png";
import print from "../assets/icons/print.png";
import { useLanguageNav } from "../contexts/LanguageContext";
import { Navigation } from "../utils/Enum";

export default function NavButton({ title, icon,setIsVisible }) {
  const { currentNavigation, setCurrentNavigation } = useLanguageNav();

  // Handle navigation logic
  const handleNavigation = () => {
    const navigationMap = {
      készlet: Navigation.STOCK,
      naptár: Navigation.MAIN,
      recept: Navigation.RECIPE,
    };

    const newNavigation = navigationMap[title];
    // Only update navigation if it's different from the current one
    if (newNavigation && newNavigation !== currentNavigation) {
      setCurrentNavigation(newNavigation);
    }
    setIsVisible(false)
  };

  // Determine the icon based on the provided prop
  const iconMap = {
    plus,
    stock,
    uprightarrow,
    print,
  };

  // Fix the mapping of titles to display names
  const namesMap = {
    készlet: "Készlet",
    naptár: "Naptár",
    recept: "Recept",
  };

  return (
    <button
      onClick={handleNavigation} // Trigger navigation update on click
      className={`w-[100%] h-[8vh] bg-transparent flex flex-row justify-between items-center px-[2vw] hover:bg-white focus:bg-sky-50`}
    >
      <p
        className="text-lg text-lime-300 font-bold drop-shadow-md pr-[1vw]"
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)",
        }}
      >
        {namesMap[title] || title} {/* Show a mapped name or fallback to title */}
      </p>
      <img
        src={iconMap[icon]} // Dynamically fetch the correct icon
        alt={icon}
        className="w-[20px] h-[20px] rounded"
        style={{
          borderWidth: "2px", // Optional: Add a border for visual clarity
          borderColor: "blue",
        }}
      />
    </button>
  );
}
