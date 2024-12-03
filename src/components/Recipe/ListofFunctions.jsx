import React from "react";

export default function ListofFunctions({setView}) {
  return (
    <div
      className={`w-[18%] ml-[2vw] ring-[6px] ring-lime-500 text-black/60 font-bold text-md uppercase lime-50 md:flex flex-col justify-center items-center rounded-l-lg mt-[10vh]`}
    >
    <div
      className={`w-[90%] ml-[2vw] bg-stone-50 text-black/60 font-bold text-sm uppercase lime-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
    >
      <button onClick={() => setView('print')} className="w-full h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Nyomtatás
      </button>
      <button onClick={() => setView('add')} className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Új hozzáadása
      </button>
      <button onClick={() => setView('read')} className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] rounded-l-lg">
        Olvasási nézet
      </button>
      <button onClick={() => setView('edit')} className="w-full  h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Szerkesztés
      </button>
      <button onClick={() => setView('search')} className="w-full h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Keresés
      </button>
      <button onClick={() => setView('search')} className="w-full h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Naptárhoz adom
      </button>
      <button onClick={() => setView('search')} className="w-full h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Raktár történet
      </button>
      <button onClick={() => setView('delete')} className=" w-full h-[6vh] my-[4px] hover:ring-[6px] ring-lime-500 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg">
        Törlés
      </button>
    </div>
    </div>
  );
}
