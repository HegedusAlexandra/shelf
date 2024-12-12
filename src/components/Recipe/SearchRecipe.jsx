import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECIPE } from "../../utils/graphql/queries";
import Searchfield from "./Searchfield";
import print from "../../assets/icons/print.png";
import event from "../../assets/icons/event.png";
import trash from "../../assets/icons/delete.png";
import edit from "../../assets/icons/edit.png";
import DropFilter from "./DropFilter";
import { useNavigate } from "react-router-dom";

export default function SearchRecipe({ recipeName, user, setCakeId ,setCurrentView}) {
  const [filter, setFilter] = useState("");
  const [filterByTag, setFilterByTag] = useState("");
  const {
    data: recipes,
    loading: loadingRecipes,
    error: errorRecipes
  } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });
const navigate= useNavigate()

  const filteredRecipes =
  recipes?.getRecipes?.filter(
    (recipe) =>
      recipe?.name?.toLowerCase().includes(filter.toLowerCase()) &&
      (!filterByTag || recipe?.tags?.some((tag) => tag.tag_type.toLowerCase().includes(filterByTag.toLowerCase())))
  ) || [];

  const printRecipe = (value) => {setCakeId(value); setCurrentView('print');}
  const handleEdit = (value) => {setCurrentView('edit');setCakeId(() =>   value)}
  const addToCalendar = (value) => {navigate('/dashboard/calendar');setCakeId(value)};
  const deleteRecipe = (value) => {/* here comes the recipe delete logic */ setCakeId(value)};

  return (
    <div className="z-10 text-sm flex flex-col justify-start w-[90%] md:w-[60%] min-h-screen  p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
      <div className="h-[40vh] w-full flex flex-col justify-start mt-[2vh] pt-[1vh]">
        <div className="-translate-y-[3vh] flex-1 bg-ab3 bg-cover bg-no-repeat text-white/70 uppercase rounded-md flex justify-center items-center" />
        <div className="w-full flex flex-row items-center mt-[1vw] pb-[2vw]">
          <h1 className="text-[6vh] flex-1 flex justify-start text-stone-600">
            Receptek
          </h1>
        <DropFilter onChange={setFilterByTag}/>
        </div>
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
        filteredRecipes.map((recipe) => (
          <div
            key={recipe.name + "_list_name"}
            className="flex flex-row translate-x-2"
          >
            <button onClick={() => {setCakeId(recipe.id);setCurrentView('read')}} className=" text-black/70 hover:text-orange-800 text-md flex justify-center uppercase items-start truncate focus:ring-transparent">
              {recipe.name}
            </button>
            <hr className="flex-1 h-[1px] bg-black/20 m-3 ml-8" />
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={() => printRecipe(recipe.id)}
            >
              <img src={print} alt="print" />
            </button>
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={() => addToCalendar(recipe.id)}
            >
              <img src={event} alt="event" />
            </button>
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={() => handleEdit(recipe.id)}
            >
              <img src={edit} alt="plus" />
            </button>
            <button
              className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full hover:bg-white/50"
              onClick={() => deleteRecipe(recipe.id)}
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
