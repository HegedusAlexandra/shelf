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
        className={`w-[100%] xl:ml-[2vw] text-black/60 text-md uppercase teal-50 flex xl:flex-row flex-row-reverse justify-center items-center xl:rounded-l-lg xl:rounded-r-none rounded-r-xl rounded-l-none mt-[6vh]`}
      >
        <button
          onClick={() => setshowLeftSidebars(!showLeftSidebars)}
          className="xl:w-[2vw] md:w-[4vw] w-[6vw] flex items-center justify-center font-bold bg-green-400 xl:rounded-l-md rounded-r-md xl:rounded-r-none rounded-l-none font-playwrite xl:py-[30px] py-[10px] px-auto hover:bg-green-600"
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
          className={`w-[90%] bg-stone-50 text-black/60 text-sm uppercase teal-50 flex flex-col justify-start items-center xl:rounded-l-lg xl:rounded-r-none rounded-r-lg rounded-l-none py-[2vh] pr-[0vh]`}
          style={{
            boxShadow: "1px 2px 16px rgba(0, 0, 0, 0.8)"
          }}
        >
          <button
            onClick={() => {
              setCurrentView("add");
              createNewRecipe();
            }}
            className="w-full h-[4vh] my-[4px] hover:ring-green-200 hover:ring-1 focus:bg-green-200 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg"
          >
            Új hozzáadása
          </button>
          <button
            onClick={() =>{ setCurrentView("search"); setCakeId("")}}
            className="w-full h-[4vh] my-[4px] hover:ring-green-200 hover:ring-1 focus:bg-green-200 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg "
          >
            Olvasási nézet
          </button>
        </div>
      </div>
    </div>
  );
}
