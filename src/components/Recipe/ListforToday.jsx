import { useQuery } from "@apollo/client";
import React from "react";
import { GET_TODAY_RECIPES } from "../../utils/graphql/queries";

export default function ListforToday({
  setshowLeftSidebarDays,
  showLeftSidebarDays,
  createNewRecipe,
  setCurrentView,
  setCakeId
}) {
  const { data: todays } = useQuery(GET_TODAY_RECIPES);

  console.log(showLeftSidebarDays);
  

  return (
    <div className="flex flex-col w-[100%] gap-2">
      <div
        className={`w-[100%] xl:ml-[2vw] text-black/60 text-md uppercase teal-100 flex xl:flex-row flex-row-reverse justify-center items-center xl:rounded-l-lg xl:rounded-r-none rounded-r-xl rounded-l-none`}
      >
        <button
          onClick={() => setshowLeftSidebarDays(!showLeftSidebarDays)}
          className="xl:w-[2vw] md:w-[4vw] w-[6vw] xl:py-[30px] py-[10px] font-bold flex items-center justify-center bg-yellow-300 xl:rounded-l-md rounded-r-md xl:rounded-r-none rounded-l-none font-playwrite px-auto hover:bg-green-600"
        >
          <div
            className="text-center text-sm rotate-180"
            style={{
              writingMode: "vertical-rl",
              whiteSpace: "nowrap"
            }}
          >
            today
          </div>
        </button>
        <div
          className={`w-[90%] my-4 bg-stone-50 text-black/60 text-sm uppercase teal-50 flex flex-col justify-start items-center xl:rounded-l-lg xl:rounded-r-none rounded-r-lg rounded-l-none py-[2vh] pr-[0vh]`}
          style={{
            boxShadow: "1px 4px 16px rgba(0, 0, 0, 0.8)"
          }}
        >
          {todays?.getRecipesForToday.map((el) => (
            <button
            key={el.name + 'today' + el.portions}
              onClick={() => {
                createNewRecipe();
                setCakeId(el.recipe_id);
                setCurrentView("read");
              }}
              className="w-full h-[4vh] m-[4px] hover:ring-amber-200 hover:ring-1 focus:bg-amber-200 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
