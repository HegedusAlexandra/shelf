import React, { useState } from "react";
import NavButton from "../../components/Recipe/NavButton";
import plus from "../../assets/icons/plus.png";
import menu from "../../assets/icons/menu.png";

export default function Menu() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed z-20 left-[2vw] top-[2vh] h-[100%] bg-black ">
      <button
        onClick={toggleMenu}
        className={`absolute top-4 left-4 z-50 rounded-full hover:bg-black/10 transition-all ${
          isVisible ? "translate-x-[26vw]" : "translate-x-0"
        }`}
      >
        {isVisible ? (
          <button className="w-[30px] rotate-45 h-full flex justify-center items-center rounded-full hover:bg-white/50">
            <img src={plus} alt="plus" />
          </button>
        ) : (
          <button className="w-[30px] h-full flex justify-center items-center rounded-full hover:bg-white/50">
            <img src={menu} alt="plus" />
          </button>
        )}
      </button>
      <div
        className={`fixed top-0 left-0 h-full md:w-1/3 w-5/6 pt-[20vh] bg-white/20 backdrop-blur-xl flex flex-col justify-start items-center shadow-lg transform transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {[
          ["készlet", "stock"],
          ["naptár", "uprightarrow"],
          ["recept", "plus"],
          ["kijelentkezés", "logout"]
        ].map((el) => (
          <NavButton
            setIsVisible={setIsVisible}
            key={el[0] + "button"}
            title={el[0]}
            icon={el[1]}
          />
        ))}
      </div>
    </div>
  );
}
