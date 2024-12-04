import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_RECIPE, GET_RECIPE_BY_ID } from "../../utils/graphql/queries";
import Searchfield from "./Searchfield";
import Button from "./Button";

export default function ListofRecipes({
  setIngredients,
  setPhases,
  setRecipeName,
  setSteps,
  setTags,
  user,
  cakeId,
  setCakeId
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
    skip: !cakeId
  });

  useEffect(() => {
    if (oneRecipe?.getRecipeById) {
      const recipe = oneRecipe.getRecipeById;

      const groupedIngredients = recipe.ingredients.reduce((acc, ingredient) => {
        if (!acc[ingredient.type]) {
          acc[ingredient.type] = []; // Initialize the array for the category
        }
        acc[ingredient.type].push({
          id:ingredient.id || "",
          name: ingredient.name || "",
          measurement: ingredient.measurement || "",
          amount: ingredient.amount || "",
          type: ingredient.type || ""
        });
        return acc;
      }, {});

      const filteredSteps = recipe.steps.map((el) => ({
        order: el.order,
        description: el.description,
      }));
      
      const filteredTags = recipe.tags.map((el) => ({
        tag_type: el.tag_type,
      }));
  
      setIngredients(Object.values(groupedIngredients));
      setRecipeName(recipe.name || "");
      setSteps(filteredSteps || [""]);
      setPhases(recipe.phases || [""]);
      setTags(filteredTags || [""]);
    }
  }, [oneRecipe, setIngredients, setPhases, setRecipeName, setSteps, setTags]);


  const filteredRecipes =
    recipes?.getRecipes?.filter((recipe) =>
      recipe?.name?.toLowerCase().includes(filter.toLowerCase())
    ) || [];

  return (
    <div
      className={`h-[90vh] w-[20%] bg-stone-50 md:flex flex-col justify-start items-start rounded-r-sm mt-[10vh] p-[4vh] overflow-y-scroll hide-scrollbar`}
    >
      <div className="w-full">
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
          <Button
            label={recipe.name}
            key={recipe.id}
            variant='plain'
            size="sm"
            onClick={() => setCakeId(recipe.id)}
          />
        ))
      ) : (
        <p className="text-gray-500 mt-4">No recipes found.</p>
      )}
    </div>
  );
}
