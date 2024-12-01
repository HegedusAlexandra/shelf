import React, { useState } from "react";
import NavButton from "../../components/NavButton";
import plus from "../../assets/icons/plus.png";
import menu from "../../assets/icons/menu.png";

export default function LeftColumn() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleLeftColumn = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="fixed z-20 left-[2vw] top-[2vh] h-[100%] bg-black">
      <button
        onClick={toggleLeftColumn}
        className={`absolute top-4 left-4 z-50 text-lime-200 rounded-full hover:bg-gray-700 transition-all ${
          isVisible ? "translate-x-[26vw]" : "translate-x-0"
        }`}
      >
        {isVisible ? (
          <button className="w-[30px] rotate-45 h-full flex justify-center items-center ring-[1px] ring-gray-500 rounded-full hover:bg-white/50">
            <img src={plus} alt="plus" />
          </button>
        ) : (
          <button className="w-[31px] h-full flex justify-center items-center rounded-full text-black hover:bg-white/50">
            <img src={menu} alt="plus" />
          </button>
        )}
      </button>
      <div
        className={`fixed top-0 left-0 h-full md:w-1/3 w-5/6 bg-pink bg-cover bg-no-repeat bg-bottom flex flex-col justify-start items-center shadow-lg transform transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[12vh] w-full "></div>
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
