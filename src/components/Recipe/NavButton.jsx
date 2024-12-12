import React from "react";
import plus from "../../assets/icons/plus.png";
import stock from "../../assets/icons/house.png";
import uprightarrow from "../../assets/icons/uprightarrow.png";
import print from "../../assets/icons/print.png";
import logout from "../../assets/icons/logout.png";
import { Navigation,Sitemap } from "../../utils/Enum";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function NavButton({ title, icon, setIsVisible }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      navigate("/");
    }
  };

  const handleNavigation = () => {
    const navigationMap = {
      fő: Navigation.MAIN,
      készlet:  Sitemap.DASHBOARD + '/' + Navigation.STOCK,
      naptár: Sitemap.DASHBOARD + '/' + Navigation.CALENDAR,
      recept: Sitemap.DASHBOARD + '/' + Navigation.RECIPE
    };

    const newNavigation = navigationMap[title];
    if (newNavigation) {
      navigate(`/${newNavigation}`);
    }
    setIsVisible(false);
  };

  const iconMap = {
    plus,
    stock,
    uprightarrow,
    print,
    logout
  };

  return (
    <button
      onClick={title === "kijelentkezés" ? handleLogout : handleNavigation}
      className={`w-[100%] h-[8vh] bg-transparent flex flex-row justify-between items-center px-[2vw] hover:bg-white/30 hover:backdrop-blur-lg focus:bg-[#fafafa]`}
    >
      <p className="text-lg text-black pr-[1vw] uppercase">{title}</p>
      <img
        src={iconMap[icon]}
        alt={icon}
        className="w-[20px] h-[20px] rounded"
      />
    </button>
  );
}
