import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_RECIPE } from "../../utils/graphql/queries";
import { DELETE_RECIPE } from "../../utils/graphql/mutations";
import Searchfield from "./Searchfield";
import printIcon from "../../assets/icons/print.png";
import eventIcon from "../../assets/icons/event.png";
import trashIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";
import plusIcon from "../../assets/icons/plus.png";
import DropFilter from "./DropFilter";
import { useNavigate } from "react-router-dom";

export default function SearchRecipe({
  recipeName,
  user,
  setCakeId,
  setCurrentView
}) {
  const [filter, setFilter] = useState("");
  const [filterByTag, setFilterByTag] = useState("");
  const [activeRecipe, setActiveRecipe] = useState(null); // For toggling buttons
  const navigate = useNavigate();

  const {
    data: recipes,
    loading: loadingRecipes,
    error: errorRecipes
  } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });

  const [deleteRecipeMutation] = useMutation(DELETE_RECIPE);

  const filteredRecipes =
    recipes?.getRecipes?.filter((recipe) => {
      const matchesFilter = recipe?.name
        ?.toLowerCase()
        .includes(filter.toLowerCase());
      const matchesTag =
        !filterByTag ||
        recipe?.tags?.some((tag) =>
          tag.tag_type.toLowerCase().includes(filterByTag.toLowerCase())
        );
      return matchesFilter && matchesTag;
    }) || [];

  const handleButtonClick = (recipeId) => {
    setActiveRecipe((prev) => (prev === recipeId ? null : recipeId)); // Toggle visibility
  };

  const printRecipe = (value) => {
    setCakeId(value);
    setCurrentView("print");
  };

  const handleEdit = (value) => {
    setCakeId(value);
    setCurrentView("edit");
  };

  const addToCalendar = (value) => {
    navigate("/dashboard/calendar");
    setCakeId(value);
  };

  const deleteRecipe = (value) => {
    deleteRecipeMutation({
      variables: { recipeId: value, userId: user?.id },
      refetchQueries: [
        { query: GET_ALL_RECIPE, variables: { userId: user?.id } }
      ],
      awaitRefetchQueries: true
    }).catch((error) => {
      console.error("Error deleting recipe:", error);
    });
  };

  return (
    <div className="z-10 text-sm flex flex-col justify-start w-[84%] xl:w-[60%] h-[92vh] xl:p-[1vw] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
      <div className="h-[30vh] w-full flex flex-col justify-start mt-[2vh] pt-[1vh]">
        <div className="-translate-y-[3vh] h-[20vh] bg-ab3 bg-cover bg-no-repeat bg-center text-white/70 uppercase rounded-md flex justify-center items-center">
          KÉP FELTÖLTÉSE
        </div>
        <div className="w-full flex xl:flex-row flex-col xl:items-center mt-[1vw] pb-[2vw]">
          <h1 className="xl:text-[6vh] text-[4vh] flex-1 flex justify-start text-stone-600 px-2">
            Receptek
          </h1>
          <DropFilter onChange={setFilterByTag} value={filterByTag} />
        </div>
      </div>
      <div className="w-full xl:translate-x-4 pl-2 mb-4">
        <Searchfield
          placeholder="Search recipes..."
          value={filter}
          onChange={setFilter}
        />
      </div>
      <div className="overflow-y-scroll overflow-x-hidden">
        {loadingRecipes ? (
          <p>Loading recipes...</p>
        ) : errorRecipes ? (
          <p>Error loading recipes. Please try again later.</p>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`relative flex flex-row translate-x-2 px-2 rounded-md ${
                activeRecipe === recipe.id ? "bg-green-400" : "bg-white"
              } transition-colors duration-300`}
            >
              <div
                className={`flex flex-row w-[140vw] xl:w-[56vw] justify-between items-center transition-transform duration-300 ${
                  activeRecipe === recipe.id ? "-translate-x-full" : "translate-x-0"
                }`}
              >
                <p
                  className={`xl:text-md text-sm md:w-[74vw] w-[66vw] font-medium ${
                    activeRecipe === recipe.id ? "text-white" : "text-gray-800"
                  }`}
                >
                  {recipe.name}
                </p>
                <button
                  className={`w-6 flex justify-center items-center ${activeRecipe === recipe.id && 'hidden'}`}
                  onClick={() => handleButtonClick(recipe.id)}
                >
                  <img src={plusIcon} alt="Toggle" />
                </button>
              </div>
              <div
                className={`flex flex-row justify-between gap-4 transition-transform duration-300 ${
                  activeRecipe === recipe.id ? "-translate-x-full" : "translate-x-full"
                }`}
              >
                <button
                  className="w-6 flex justify-center items-center"
                  onClick={() => handleButtonClick(recipe.id)}
                >
                  <img src={plusIcon} alt="Toggle" />
                </button>
                <button
                  className="w-[24px] mx-2 h-full flex justify-center items-center mb-2 rounded-full "
                  onClick={() => printRecipe(recipe.id)}
                >
                  <img src={printIcon} alt="print" />
                </button>
                <button
                  className="w-[24px] mx-2 h-full flex justify-center items-center mb-2 rounded-full"
                  onClick={() => addToCalendar(recipe.id)}
                >
                  <img src={eventIcon} alt="event" />
                </button>
                <button
                  className="w-[24px] mx-2 h-full flex justify-center items-center mb-2 rounded-full"
                  onClick={() => handleEdit(recipe.id)}
                >
                  <img src={editIcon} alt="edit" />
                </button>
                <button
                  className="w-[24px] mx-2 h-full flex justify-center items-center mb-2 rounded-full "
                  onClick={() => deleteRecipe(recipe.id)}                
                >
                  <img src={trashIcon} alt="delete" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">
            No recipes found. Try adjusting your search or filters.
          </p>
        )}
      </div>
    </div>
  );
}
