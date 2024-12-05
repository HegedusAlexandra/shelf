import React from "react";

export default function ListofFunctions({
  setCurrentView,
  createNewRecipe,
  setshowLeftSidebars,
  showLeftSidebars
}) {
  return (
    <div className="flex flex-col py-[2vh] gap-2">
      <div
        className={`w-[100%] ml-[2vw] ring-[3px] ring-teal-500 text-black/60 font-bold text-md uppercase teal-50 md:flex flex-row justify-center items-center rounded-l-lg mt-[10vh]`}
      >
        <button
          onClick={() => setshowLeftSidebars(!showLeftSidebars)}
          className="bg-teal-400 w-[1vw] mx-auto h-[22vh] block rounded-full"
        ></button>

        <div
          className={`w-[90%] bg-stone-50 text-black/60 font-bold text-sm uppercase teal-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
        >
          <button
            onClick={() => {
              setCurrentView("add");
              createNewRecipe();
            }}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-teal-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Új hozzáadása
          </button>
          <button
            onClick={() => setCurrentView("read")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-teal-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Olvasási nézet
          </button>
          <button
            onClick={() => setCurrentView("edit")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-teal-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Szerkesztés
          </button>
        </div>
      </div>
      <div
        className={`w-[100%] ml-[2vw] ring-[3px] ring-teal-500 text-black/60 font-bold text-md uppercase teal-50 md:flex flex-row justify-center items-center rounded-l-lg mt-[2vh]`}
      >
        <button
          onClick={() => setshowLeftSidebars(!showLeftSidebars)}
          className="bg-teal-400 w-[1vw] mx-auto h-[30vh] block rounded-full"
        ></button>
        <div
          className={`w-[90%] bg-stone-50 text-black/60 font-bold text-sm uppercase teal-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
        >
          <button
            onClick={() => {
              setCurrentView("delete");
              createNewRecipe();
            }}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-rose-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Törlés
          </button>
          <button
            onClick={() => setCurrentView("calendar")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-teal-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Naptárhoz adás
          </button>
          <button
            onClick={() => setCurrentView("stock")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-teal-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Készlet történet
          </button>
          <button
            onClick={() => setCurrentView("print")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[3px] ring-teal-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Nyomtatás
          </button>
        </div>
      </div>
    </div>
  );
}
