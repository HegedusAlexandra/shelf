import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_RECIPE } from "../../utils/graphql/queries";
import { DELETE_RECIPE } from "../../utils/graphql/mutations";
import Searchfield from "./Searchfield";
import printIcon from "../../assets/icons/print.png";
import eventIcon from "../../assets/icons/event.png";
import trashIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";
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
      ], // Refetch the recipes query
      awaitRefetchQueries: true // Ensure UI waits for the query refetch
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
          <DropFilter onChange={setFilterByTag} />
        </div>
      </div>
      <div className="w-full xl:translate-x-4 pl-2">
        <Searchfield
          placeholder="Search recipes..."
          value={filter}
          onChange={setFilter}
        />
      </div>
      <div className="pb-[10vw] overflow-y-scroll overflow-x-hidden">
        {loadingRecipes ? (
          <p>Loading recipes...</p>
        ) : errorRecipes ? (
          <p>Error loading recipes. Please try again later.</p>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="flex flex-row translate-x-2">
              <button
                onClick={() => {
                  setCakeId(recipe.id);
                  setCurrentView("read");
                }}
                className="text-black/70 hover:text-orange-800 xl:text-md flex justify-center uppercase items-start truncate focus:ring-transparent"
              >
                <p> {recipe.name}</p>
              </button>
              <hr className="flex-1 h-[1px] bg-black/20 m-3 ml-8 xl:block hidden" />
              <div className="flex flex-row hidden translate-x-[100vh]">
                <button
                  className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full "
                  onClick={() => printRecipe(recipe.id)}
                >
                  <img src={printIcon} alt="print" />
                </button>
                <button
                  className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full"
                  onClick={() => addToCalendar(recipe.id)}
                >
                  <img src={eventIcon} alt="event" />
                </button>
                <button
                  className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full"
                  onClick={() => handleEdit(recipe.id)}
                >
                  <img src={editIcon} alt="edit" />
                </button>
                <button
                  className="w-[24px] mx-4 h-full flex justify-center items-center mb-2 rounded-full "
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
