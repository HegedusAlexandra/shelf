import React, { memo, useState, useEffect } from "react";
import TextInput from "./TextInput";
import { useQuery } from "@apollo/client";
import { GET_INGREDIENTS, GET_RECIPE_BY_ID } from "../utils/graphql/queries"; // Add GET_RECIPE_BY_ID query
import plus from "../assets/icons/plus.png";
import IngredientDrop from "./IngredientDrop";

const Recipe = () => {
  const cakeId = "1";
  const { loading, error, data } = useQuery(GET_INGREDIENTS);
  const { data: recipeData, loading: recipeLoading } = useQuery(
    GET_RECIPE_BY_ID,
    {
      variables: { id: cakeId },
      skip: !cakeId, // Skip query if no ID is provided
    }
  );

  const [steps, setSteps] = useState([""]); // Holds steps text inputs
  const [ingredients, setIngredients] = useState([""]); // Holds ingredients dropdowns

  // Pre-fill data when cake ID is provided
  useEffect(() => {
    if (recipeData?.getRecipeById) {
      setSteps(recipeData.getRecipeById.steps || [""]);
      setIngredients(
        recipeData.getRecipeById.ingredients.map((ing) => ing.id) || [""]
      );
    }
  }, [recipeData]);

  const addStep = () => setSteps([...steps, ""]);
  const addIngredient = () => setIngredients([...ingredients, ""]);

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const deleteStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };

  const handleIngredientChange = (index, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };

  return (
    <div className="flex flex-col p-[2vw]">
      {/* Name Input */}
      <div className="w-full flex flex-row items-end">
        <TextInput
          label="Név"
          defaultValue={recipeData?.getRecipeById?.name || ""}
        />
      </div>

      {/* Ingredients Dropdowns */}
      <div className="w-full flex flex-col items-start">
        <label
          htmlFor="input-field"
          className="text-xs font-medium text-gray-700 mb-2"
        >
          Hozzávalók
        </label>
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex flex-row items-end gap-[2px] w-full">
            <IngredientDrop
              label={index < 1 && `Hozzávalók`}
              options={data?.getIngredients || []}
              value={ingredient}
              onChange={(value) => handleIngredientChange(index, value)}
            />
            <button
              className="w-[30px] h-full flex justify-center items-center mx-3 mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
              onClick={addIngredient}
            >
              <img src={plus} alt="plus" />
            </button>
            <button
              className="w-[31px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
              onClick={() => deleteIngredient(index)}
            >
              <img src={plus} alt="plus" />
            </button>
          </div>
        ))}
      </div>

      {/* Steps Inputs */}
      <div className="w-full flex flex-col items-start mt-4">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-row items-end w-full">
            <TextInput
              label={index < 1 && `Lépések`}
              defaultValue={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
            />
            <button
              className="w-[30px] h-full flex justify-center items-center m-3 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
              onClick={addStep}
            >
              <img src={plus} alt="plus" />
            </button>
            <button
              className="w-[31px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
              onClick={() => deleteStep(index)}
            >
              <img src={plus} alt="plus" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Recipe);
