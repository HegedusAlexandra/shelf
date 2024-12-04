import React from "react";

export default function ListofFunctions({ setCurrentView, createNewRecipe }) {
  return (
    <div className="flex flex-col">
      <div
        className={`w-[100%] ml-[2vw] ring-[6px] ring-green-400 text-black/60 font-bold text-md uppercase green-50 md:flex flex-col justify-center items-center rounded-l-lg mt-[10vh]`}
      >
        <div
          className={`w-[90%] ml-[2vw] bg-stone-50 text-black/60 font-bold text-sm uppercase green-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
        >
          <button
            onClick={() => {
              setCurrentView("add");
              createNewRecipe();
            }}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-green-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Új hozzáadása
          </button>
          <button
            onClick={() => setCurrentView("read")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-green-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Olvasási nézet
          </button>
          <button
            onClick={() => setCurrentView("edit")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-green-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Szerkesztés
          </button>
        </div>
      </div>
      <div
        className={`w-[100%] ml-[2vw] ring-[6px] ring-green-400 text-black/60 font-bold text-md uppercase green-50 md:flex flex-col justify-center items-center rounded-l-lg mt-[2vh]`}
      >
        <div
          className={`w-[90%] ml-[2vw] bg-stone-50 text-black/60 font-bold text-sm uppercase green-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
        >
          <button
            onClick={() => {
              setCurrentView("delete");
              createNewRecipe();
            }}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-red-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Törlés
          </button>
          <button
            onClick={() => setCurrentView("calendar")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-green-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Naptárhoz adás
          </button>
          <button
            onClick={() => setCurrentView("stock")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-green-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg"
          >
            Készlet történet
          </button>
          <button
            onClick={() => setCurrentView("print")}
            className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-green-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
          >
            Nyomtatás
          </button>
        </div>
      </div>
    </div>
  );
}