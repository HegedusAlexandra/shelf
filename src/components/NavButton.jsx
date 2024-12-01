import React from "react";
import plus from "../assets/icons/plus.png";
import stock from "../assets/icons/house.png";
import uprightarrow from "../assets/icons/uprightarrow.png";
import print from "../assets/icons/print.png";
import logout from '../assets/icons/logout.png'
import { useLanguageNav } from "../contexts/LanguageContext";
import { Navigation } from "../utils/Enum";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function NavButton({ title, icon, setIsVisible }) {
  const { currentNavigation, setCurrentNavigation } = useLanguageNav();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      navigate("/"); // Redirect to the login page
    }
  };

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
    setIsVisible(false);
  };

  // Determine the icon based on the provided prop
  const iconMap = {
    plus,
    stock,
    uprightarrow,
    print,
    logout
  };

  return (
    <button
      onClick={title === "kijelentkezés" ? handleLogout : handleNavigation} // Trigger navigation update on click
      className={`w-[100%] h-[8vh] bg-transparent flex flex-row justify-between items-center px-[2vw] hover:bg-white/30 backdrop-blur-lg focus:bg-[#fafafa]`}
    >
      <p
        className="text-lg text-lime-300 drop-shadow-md pr-[1vw] uppercase"
        style={{
          textShadow: "2px 2px 2px rgba(0, 0, 0, 0.7)"
        }}
      >
        {title}
      </p>
      <img
        src={iconMap[icon]} // Dynamically fetch the correct icon
        alt={icon}
        className="w-[20px] h-[20px] rounded"
        style={{
          borderWidth: "2px", // Optional: Add a border for visual clarity
          borderColor: "blue"
        }}
      />
    </button>
  );
}
