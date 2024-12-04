import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECIPE } from "../../utils/graphql/queries";
import Searchfield from "./Searchfield";
import print from "../../assets/icons/print.png";
import event from "../../assets/icons/event.png";
import trash from "../../assets/icons/delete.png";
import edit from "../../assets/icons/edit.png";
export default function SearchRecipe({ recipeName, user, setCakeId }) {
  const [filter, setFilter] = useState("");
  const {
    data: recipes,
    loading: loadingRecipes,
    error: errorRecipes
  } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });

  const filteredRecipes =
    recipes?.getRecipes?.filter((recipe) =>
      recipe?.name?.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  const addToCalendar = () => {};
  const deleteRecipe = () => {};

  return (
    <div className=" text-sm flex flex-col w-[90%] md:w-[60%] min-h-screen  p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
      <div className="h-[40vh] w-full flex flex-col justify-start mt-[2vh] pt-[1vh]">
        <div className="-translate-y-[3vh] flex-1 bg-ab3 bg-cover bg-no-repeat text-white/70 uppercase rounded-md flex justify-center items-center" />
        <h1 className="text-[6vh] w-full flex justify-start py-[2vw] text-stone-600">
          {recipeName}
        </h1>
      </div>

      <div className="w-full translate-x-4">
        <Searchfield
          placeholder="Search recipes..."
          value={filter}
          onChange={setFilter}
        />
      </div>
      {loadingRecipes ? (
        <p>Loading recipes...</p>
      ) : errorRecipes ? (
        <p>Error loading recipes: {errorRecipes.message}</p>
      ) : filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe, index) => (
          <div
            key={recipe.name + "_list_name"}
            className="flex-1 flex flex-row justify-center items-between translate-x-2"
          >
            
            <button
              className=" text-black/70 hover:text-orange-800 text-md flex justify-center uppercase items-start truncate focus:ring-transparent"
            >
              {recipe.name}
            </button>
            <hr className="flex-1 h-[1px] bg-black/20 m-3 ml-8" />
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={addToCalendar}
            >
              <img src={print} alt="plus" />
            </button>
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={deleteRecipe}
            >
              <img src={event} alt="plus" />
            </button>
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={() => setCakeId(recipe.id)}
            >
              <img src={edit} alt="plus" />
            </button>
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={deleteRecipe}
            >
              <img src={trash} alt="plus" />
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No recipes found.</p>
      )}
    </div>
  );
}
