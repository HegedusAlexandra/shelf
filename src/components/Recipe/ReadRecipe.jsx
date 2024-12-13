import React, { forwardRef } from "react";
import Button from "../Button";

const ReadRecipe = forwardRef(
  (
    { ingredients, phases, recipeName, steps, setCakeId, setCurrentView },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="z-10 text-sm flex flex-col w-[84%] xl:w-[60%] my-[4vh] xl:p-[1vw] p-[2vw] bg-[#fff] backdrop-blur-lg rounded-lg box-shadow"
      >
        <div className="h-[30vh] w-full flex flex-col justify-start mt-[2vh] pt-[1vh]">
          <div className="-translate-y-[3vh] h-[20vh] bg-pink bg-cover bg-no-repeat text-white/70 uppercase rounded-md flex justify-center items-center">
            kép feltöltése
          </div>
          <div className="w-full flex flex-row items-center">
            <h1 className="text-[5vh] flex-1 flex justify-start py-[2vw] text-stone-600">
              {recipeName}
            </h1>
            <div className="w-[30%] flex flex-row items-center">
              <Button
                label="vissza a receptekhez"
                size="sm"
                variant="primary"
                onClick={() => {
                  setCurrentView("search");
                  setCakeId("");
                }}
              >
                search
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1">
            {ingredients?.map((el, index) => (
              <div key={el[0]?.type + "read"} className="flex-1">
                <h2 className="font-medium text-gray-700 mt-4">
                  {index === 0 && "Hozzávalók"}
                  <br />
                  {el[0]?.type.toUpperCase()}
                </h2>
                <hr className="w-[100%] mx-auto h-[3px] bg-black" />
                {Array.isArray(el) ? (
                  el.map((ingredient) => (
                    <p key={ingredient.name} className="text-sm">
                      {ingredient.amount} {ingredient.measurement}{" "}
                      {ingredient.name}
                    </p>
                  ))
                ) : (
                  <p className="text-sm">Invalid ingredient structure</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <h2 className=" font-medium text-gray-700 mt-4">Lépések</h2>
        <hr className="w-[100%] mx-auto h-[3px] bg-black" />
        {steps?.map((el) => (
          <p key={el?.description?.slice(0, 10) + el.order}>
            {el.order + 1}. {el.description}
          </p>
        ))}
        <div className="w-[100%]">
          <h2 className=" font-medium text-gray-700 mt-4">Fázisok</h2>
          <hr className="w-[100%] mx-auto h-[3px] bg-black" />
          {phases?.map((el) => (
            <p>
              {el.preparation_method} {el.time} perc{" "}
              {el.temperature && el.temperature + " °C"}
            </p>
          ))}
        </div>
      </div>
    );
  }
);
export default ReadRecipe;
