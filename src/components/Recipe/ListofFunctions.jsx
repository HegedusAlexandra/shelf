import React from "react";

export default function ListofFunctions({
  setCurrentView,
  createNewRecipe,
  setshowLeftSidebars,
  showLeftSidebars,
  setCakeId
}) {
  return (
    <div className="flex flex-col py-[2vh] gap-2">
      <div
        className={`w-[100%] ml-[2vw] text-black/60 font-bold text-md uppercase teal-50 md:flex flex-row justify-center items-center rounded-l-lg mt-[10vh]`}
      >
        <button
          onClick={() => setshowLeftSidebars(!showLeftSidebars)}
          className="w-[2vw] h-[20vh] flex items-center justify-center bg-green-400 rounded-l-md font-playwrite py-4 px-auto hover:bg-green-600"
        >
          <div
            className="text-center text-sm rotate-180"
            style={{
              writingMode: "vertical-rl",
              whiteSpace: "nowrap"
            }}
          >
            actions
          </div>
        </button>
        <div
          className={`w-[90%] bg-stone-50 text-black/60 font-bold text-sm uppercase teal-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
        >
          <button
            onClick={() => {
              setCurrentView("add");
              createNewRecipe();
            }}
            className="w-full  h-[6vh] my-[4px] hover:bg-green-50 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Új hozzáadása
          </button>
          <button
            onClick={() =>{ setCurrentView("search"); setCakeId("")}}
            className="w-full  h-[6vh] my-[4px] hover:bg-green-50 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Olvasási nézet
          </button>
        </div>
      </div>
    </div>
  );
}
