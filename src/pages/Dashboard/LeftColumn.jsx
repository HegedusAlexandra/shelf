import React from "react";
import NavButton from "../../components/NavButton";

export default function LeftColumn() {
  return (
    <div className="w-1/4 h-[100%] flex flex-col justify-start items-center bg-pink bg-contain bg-no-repeat bg-bottom">
      {[
        ["készlet", "stock"],
        ["naptár", "uprightarrow"],
        ["napi_nyersanyagok", "print"],
        ["heti_nyersanyagok", "print"],
        ["recept", "plus"]
      ].map((el) => (
        <NavButton key={el[0] + " button"} title={el[0]} icon={el[1]} />
      ))}
    </div>
  );
}
