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

  return (
    <div className="flex flex-col w-[100%] gap-2">
      <div
        className={`w-[100%] ml-[2vw] text-black/60 font-bold text-md uppercase teal-50 md:flex flex-row justify-center items-center rounded-l-lg`}
      >
        <button
          onClick={() => setshowLeftSidebarDays(!showLeftSidebarDays)}
          className="w-[2vw] h-[20vh] flex items-center justify-center bg-yellow-300 rounded-l-md font-playwrite py-4 px-auto hover:bg-green-600"
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
          className={`w-[90%] bg-stone-50 text-black/60 font-bold text-sm uppercase teal-50 md:flex flex-col justify-start items-center rounded-l-lg py-[4vh] pr-[0vh]`}
        >
          {todays?.getRecipesForToday.map((el) => (
            <button
            key={el.name + 'today' + el.portions}
              onClick={() => {
                createNewRecipe();
                setCakeId(el.recipe_id);
                setCurrentView("read");
              }}
              className="w-full  h-[6vh] my-[4px] hover:bg-green-50 flex justify-start items-center uppercase px-[2vw] drop-shadow-lg rounded-l-lg"
            >
              {el.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
