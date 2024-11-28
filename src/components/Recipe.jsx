import React, { memo, useState, useEffect } from "react";
import TextInput from "./TextInput";
import { useQuery } from "@apollo/client";
import { GET_INGREDIENTS, GET_RECIPE_BY_ID } from "../utils/graphql/queries"; // Add GET_RECIPE_BY_ID query
import plus from "../assets/icons/plus.png";
import IngredientDrop from "./IngredientDrop";

const Recipe = () => {
  const cakeId = "1";
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState([""]); // Holds steps text inputs
  const [ingredients, setIngredients] = useState([""]); // Holds ingredients dropdowns
  const { loading, error, data } = useQuery(GET_INGREDIENTS);
  const { data: recipeData, loading: recipeLoading } = useQuery(
    GET_RECIPE_BY_ID,
    {
      variables: { id: cakeId },
      skip: !cakeId // Skip query if no ID is provided
    }
  );

  // Pre-fill data when cake ID is provided
  useEffect(() => {
    if (recipeData?.getRecipeById) {
      setRecipeName(recipeData.getRecipeById.name || "");
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

  const handleChangeName = (value) => {
    setRecipeName(value);
  };

  return (
    <div className="flex flex-col p-[2vw] bg-slate-300 h-[100vh]">
      <div className="h-[20vh] w-full flex flex-row">
        <h1 className="text-[8vh] w-1/3 flex justify-center px-[2vw] text-stone-600">
          Receptek
        </h1>
        <div className="flex-1 bg-gray-100 mx-[1vw] rounded-md ring-[2px] ring-orange-400 flex justify-center items-center">
          kép feltöltése
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="w-1/3 p-[1vw]">
          <div className="w-[100%] flex flex-col items-start">
            <label
              htmlFor="input-field"
              className="text-xs font-medium text-gray-700 mb-2"
            >
              Név
            </label>
            <TextInput
              onChange={(e) => handleChangeName(e.target.value)}
              value={recipeData?.getRecipeById?.name || recipeName}
            />
          </div>
          <div className="w-'1/3' flex flex-col items-start">
            <label
              htmlFor="input-field"
              className="text-xs font-medium text-gray-700 mb-2"
            >
              Hozzávalók
            </label>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex flex-row items-end gap-[2px] w-[100%]"
              >
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
                  className="w-[30px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                  onClick={() => deleteIngredient(index)}
                >
                  <img src={plus} alt="plus" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 flex flex-col items-start p-[1vw]">
          <label
            htmlFor="input-field"
            className="text-xs font-medium text-gray-700 mb-2"
          >
            Lépések
          </label>
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row items-end w-full">
              <TextInput
                label={index < 1 && `Lépések`}
                defaultValue={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
              />
              <button
                className="w-[30px] h-[30px] flex justify-center items-center mx-3 mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                onClick={addStep}
              >
                <img src={plus} alt="plus" />
              </button>
              <button
                className="w-[30px] rotate-45 h-[30px] flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                onClick={() => deleteStep(index)}
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
          ))}
          <div className="w-full py-[1vw]">
            <div className=" flex flex-col items-start">
              <label
                htmlFor="input-field"
                className="text-xs font-medium text-gray-700 mb-2"
              >
                Fázisok
              </label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex flex-row items-end gap-[2px] w-[100%]"
                >
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
                    className="w-[30px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => deleteIngredient(index)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                </div>
              ))}
            </div>
            <div className=" flex flex-col items-start mt-4">
              <label
                htmlFor="input-field"
                className="text-xs font-medium text-gray-700 mb-2"
              >
                Tagek
              </label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex flex-row items-end gap-[2px] w-[100%]"
                >
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
                    className="w-[30px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => deleteIngredient(index)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Recipe);
