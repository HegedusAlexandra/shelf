import React, { memo, useState, useEffect } from "react";
import TextInput from "./TextInput";
import { useQuery } from "@apollo/client";
import { GET_INGREDIENTS, GET_RECIPE_BY_ID } from "../utils/graphql/queries"; // Add GET_RECIPE_BY_ID query
import plus from "../assets/icons/plus.png";
import IngredientDrop from "./AmountDropDown";
import Drop from '../components/Drop'

const Recipe = () => {
  const cakeId = "1";
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [phases, setPhases] = useState([""]);
  const [tags, setTags] = useState([""]);
  const { data: allIngredient } = useQuery(GET_INGREDIENTS);
  const { data: recipeData } = useQuery(GET_RECIPE_BY_ID, {
    variables: { id: cakeId },
    skip: !cakeId
  });

  useEffect(() => {
    if (recipeData?.getRecipeById) {
      const recipe = recipeData.getRecipeById;
      setRecipeName(recipe.name || "");
      setSteps(recipe.steps || [""]);
      setIngredients(recipe.ingredients.map((ing) => ing.id) || [""]);
      setPhases(recipe.phases || [""]);
      setTags(recipe.tags || [""]);
    }
  }, [recipeData]);

  const addField = (stateSetter) => stateSetter((prev) => [...prev, ""]);
  const removeField = (stateSetter, index) =>
    stateSetter((prev) => prev.filter((_, i) => i !== index));
  const updateField = (stateSetter, index, value) =>
    stateSetter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

  return (
    <div className="flex flex-col p-[2vw] bg-[#fff] backdrop-blur-lg h-[92vh] m-[4vh] rounded-lg">
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
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
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
                  options={allIngredient?.getIngredients || []}
                  value={ingredient}
                  onChange={(value) =>
                    updateField(setIngredients, index, value)
                  }
                />
                <button
                  className="w-[22px] h-full flex justify-center items-center mx-3 mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                  onClick={() => addField(setIngredients)}
                >
                  <img src={plus} alt="plus" />
                </button>
                <button
                  className="w-[22px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                  onClick={() => removeField(setIngredients, index)}
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
                onChange={(e) => updateField(setSteps, index, e.target.value)}
              />
              <button
                className="w-[22px] h-[22px] flex justify-center items-center mx-3 mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                onClick={() => addField(setSteps)}
              >
                <img src={plus} alt="plus" />
              </button>
              <button
                className="w-[22px] rotate-45 h-[22px] flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                onClick={() => removeField(setSteps, index)}
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
              {phases.map((phase, index) => (
                <div
                  key={index}
                  className="flex flex-row items-end gap-[2px] w-[100%]"
                >
                  <IngredientDrop
                    options={[]}
                    value={phase}
                    onChange={(e) => updateField(setPhases, index, e.target.value)}
                  />
                  <button
                    className="w-[22px] h-full flex justify-center items-center mx-3 mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => addField(setPhases)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                  <button
                    className="w-[22px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => removeField(setPhases, index)}
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
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex flex-row items-end gap-[2px] w-[100%]"
                >
                  <Drop
                    options={[]}
                    value={tag}
                    onChange={(e) => updateField(setTags, index, e.target.value)}
                  />
                  <button
                    className="w-[22px] h-full flex justify-center items-center mx-3 mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => addField(setTags)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                  <button
                    className="w-[22px] rotate-45 h-full flex justify-center items-center mb-1 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => removeField(setTags, index)}
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
