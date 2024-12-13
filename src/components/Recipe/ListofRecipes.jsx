import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECIPE, GET_RECIPE_BY_ID } from "../../utils/graphql/queries";
import Searchfield from "./Searchfield";
import Button from "../Button";

export default function ListofRecipes({
  setIngredients,
  setPhases,
  setRecipeName,
  setSteps,
  setTags,
  user,
  cakeId,
  setCakeId,
  showRightSidebars,
  setshowRightSidebars,
  createNewRecipe,
  setCurrentView
}) {
  const [filter, setFilter] = useState("");

  const {
    data: recipes,
    loading: loadingRecipes,
    error: errorRecipes
  } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });
  const { data: oneRecipe } = useQuery(GET_RECIPE_BY_ID, {
    variables: { userId: user?.id, cakeId: Number(cakeId) },
    skip: !cakeId,
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    const recipe = oneRecipe?.getRecipeById;
    const groupedIngredients = [];

    recipe?.ingredients.forEach((el) => {
      const index = groupedIngredients.findIndex(
        (group) => group[0]?.type === el.type
      );

      if (index !== -1) {
        groupedIngredients[index].push(el);
      } else {
        groupedIngredients.push([el]);
      }
    });

    setIngredients(Object.values(groupedIngredients));
  }, [oneRecipe, setIngredients]);

  useEffect(() => {
    if (oneRecipe?.getRecipeById) {
      const recipe = oneRecipe.getRecipeById;

      const filteredSteps = recipe.steps.map((el) => ({
        order: el.order,
        description: el.description
      }));

      const filteredTags = recipe.tags.map((el) => ({
        tag_type: el.tag_type
      }));

      setRecipeName(recipe.name || "");
      setSteps(filteredSteps || [""]);
      setPhases(recipe.phases || [""]);
      setTags(filteredTags || [""]);
    }
  }, [oneRecipe, setPhases, setRecipeName, setSteps, setTags]);

  const filteredRecipes =
    recipes?.getRecipes?.filter((recipe) =>
      recipe?.name?.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  return (
    <div
      className={`xl:h-[86vh] h-[92vh] w-[100%] flex xl:flex-row flex-row-reverse justify-start items-start mt-[8vh] `}
    >
      <div
        className="xl:w-[92%] h-[84vh] text-sm bg-stone-50 p-[2vh] xl:rounded-r-xl xl:rounded-l-none rounded-l-xl rounded-r-none overflow-y-scroll hide-scrollbar"
        style={{
          boxShadow: "-1px 4px 16px rgba(0, 0, 0, 0.8)"
        }}
      >
        <Searchfield
          placeholder="Search recipes..."
          value={filter}
          onChange={setFilter}
        />

        {loadingRecipes ? (
          <p>Loading recipes...</p>
        ) : errorRecipes ? (
          <p>Error loading recipes: {errorRecipes.message}</p>
        ) : filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <Button
              label={recipe.name}
              key={recipe.id}
              variant="plain"
              size="sm"
              onClick={() => {
                createNewRecipe();
                setCurrentView("read");
                setCakeId(recipe.id);
              }}
            />
          ))
        ) : (
          <p className="text-gray-500 mt-4">No recipes found.</p>
        )}
      </div>
      <button
        onClick={() => setshowRightSidebars(!showRightSidebars)}
        className="xl:w-[2vw] md:w-[4vw] w-[10vw] flex items-center justify-center bg-green-400 xl:rounded-r-md xl:rounded-l-none rounded-l-md rounded-r-none mt-[10vh] font-playwrite xl:py-[30px] py-[10px] px-auto hover:bg-green-600"
      >
        <div
          className="text-center text-sm"
          style={{
            writingMode: "vertical-rl",
            whiteSpace: "nowrap"
          }}
        >
          list of recipes
        </div>
      </button>
    </div>
  );
}
