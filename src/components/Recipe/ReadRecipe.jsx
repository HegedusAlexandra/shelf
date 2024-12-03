import React from "react";

export default function ReadRecipe({ ingredients, phases, recipeName, steps }) {
  return (
    <div className="flex flex-col w-[90%] md:w-[60%] min-h-screen p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
      <div className="h-[20vh] w-full flex flex-row mt-[2vh] pt-[1vh]">
        <h1 className="text-[5vh] w-1/3 flex justify-center px-[1vw] text-stone-600">
          {recipeName}
        </h1>
        <div className="-translate-y-[3vh] flex-1 mx-[1vw] bg-pink bg-cover bg-no-repeat text-white/70 uppercase rounded-md flex justify-center items-center">
          kép feltöltése
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="w-[60%]">
            <h2
              htmlFor="input-field"
              className="text-xs font-medium text-gray-700 my-2"
            >
              Hozzávalók
            </h2>
            <hr className="w-[100%] mx-auto h-[3px] bg-black" />
            {ingredients.map((el) => (
              <p>
                {el.amount} {el.measurement} {el.name}
              </p>
            ))}
          </div>
          <div className="w-[40%]">
            <h2 className="text-xs font-medium text-gray-700 my-2">Fázisok</h2>
            <hr className="w-[100%] mx-auto h-[3px] bg-black" />
            {phases.map((el) => (
              <p>
                {el.preparation_method} {el.time} perc{" "}
                {el.temperature && el.temperature + " °C"}
              </p>
            ))}
          </div>
        </div>
      </div>
      <h2 className="text-xs font-medium text-gray-700 my-2">Lépések</h2>
      <hr className="w-[100%] mx-auto h-[3px] bg-black" />
      {steps.map((el) => (
        <p>
          {el.order}. {el.description}
        </p>
      ))}
    </div>
  );
}
