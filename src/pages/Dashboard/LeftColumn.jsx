import React, { useState } from "react";
import NavButton from "../../components/NavButton";

export default function LeftColumn() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleLeftColumn = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative h-[100%] bg-black">
      {/* Button to toggle the LeftColumn */}
      <button
        onClick={toggleLeftColumn}
        className={`absolute top-4 left-4 z-50 bg-lime-900 text-lime-200 px-2 rounded-full shadow-lg hover:bg-gray-700 transition-all ${isVisible ? "translate-x-[26vw]" : "translate-x-0"}`}
      >
        {isVisible ? "Close" : "Menu"}
      </button>

      {/* LeftColumn with animation */}
      <div
        className={`fixed top-0 left-0 h-full w-1/3 bg-pink bg-cover bg-no-repeat bg-bottom flex flex-col justify-start items-center shadow-lg transform transition-transform duration-500 ${
          isVisible ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-[12vh] w-full "></div>
        {[
          ["készlet", "stock"],
          ["naptár", "uprightarrow"],
          ["recept", "plus"],
        ].map((el) => (
          <NavButton setIsVisible={setIsVisible} key={el[0] + " button"} title={el[0]} icon={el[1]} />
        ))}
      </div>
    </div>
  );
}
