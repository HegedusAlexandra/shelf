/* same ingredient multiply times, minus ingredient, error handling*/

import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import TextInput from "./TextInput";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INGREDIENTS } from "../utils/graphql/queries"; // Add GET_RECIPE_BY_ID query
import { ADD_RECIPE } from "../utils/graphql/mutations";
import plus from "../assets/icons/plus.png";
import DropIngredient from "./DropIngredient";
import DropAmount from "./DropAmount";
import DropTag from "./DropTag";
import { useUser } from "../contexts/UserProvider";
import Button from "./Button";
import RecipeValidationSchema from "../utils/recipeValidationSchema";
import { preparation_method, TagType } from "../utils/Enum";
import NameInput from "./NameInput";
import Modal from "../components/Modal";
import ListofRecipes from "./ListofRecipes";
import { useMeasure } from "@uidotdev/usehooks";

const Recipe = () => {
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [phases, setPhases] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [modal, setModal] = useState("");
  const [errors, setErrors] = useState({});
  const [addRecipe] = useMutation(ADD_RECIPE);
  const user = useUser();
  const modalRef = useRef();
  const { data: allIngredient } = useQuery(GET_INGREDIENTS);
  const addField = (stateSetter) => stateSetter((prev) => [...prev, ""]);
  const removeField = (stateSetter, index) =>
    stateSetter((prev) => prev.filter((_, i) => i !== index));
  const updateField = (stateSetter, index, value) =>
    stateSetter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });

  const openSuccessModal = () => {
    setModal("success");
    modalRef.current.open();
  };
  const openFailModal = () => {
    setModal("failed");
    modalRef.current.open();
  };
  const closeModal = () => modalRef.current.close();

  const prepareIngredients = (ingredients) => {
    return ingredients.map((ingredient) => ({
      id: ingredient.id,
      amount: ingredient.amount
    }));
  };
  console.log(phases);
  const submitRecipe = async () => {
    const recipeData = {
      userId: user.id,
      recipeName,
      steps,
      ingredients: prepareIngredients(ingredients),
      phases,
      tags
    };

    try {
      await RecipeValidationSchema.validate(recipeData, { abortEarly: false });
      console.log("Validation successful:", recipeData);

      const response = await addRecipe({
        variables: recipeData
      });
      console.log("Recipe added successfully:", response.data.addRecipe);
      openSuccessModal();

      setRecipeName("");
      setSteps([""]);
      setIngredients([""]);
      setPhases([""]);
      setTags([""]);
      setErrors({});
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
        console.error("Validation errors:", validationErrors);
        openFailModal();
      } else {
        console.error("Error submitting recipe:", err);
        openFailModal();
      }
    }
  };

  const createNewRecipe = () => {
    setRecipeName("");
    setSteps([""]);
    setIngredients([""]);
    setPhases([""]);
    setTags([""]);
    setErrors({});
  };

console.log('====================================');
console.log(steps);
console.log('====================================');

  const plus_abort_button = useCallback(
    (func1, func2, isPlus) => (
      <>
        {isPlus ? (
          <button
            className="w-[22px] h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
            onClick={func1}
          >
            <img src={plus} alt="plus" />
          </button>
        ) : (
          <button
            className="w-[22px] rotate-45 h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
            onClick={func2}
          >
            <img src={plus} alt="plus" />
          </button>
        )}
      </>
    ),
    []
  );

  return (
    <div className="w-[100%] flex fle-row justify-center items-start">
      <div
        className="flex flex-col w-[90%] md:w-[70%] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow"
      >
        <div className="h-[20vh] w-full flex flex-row pb-2">
          <h1 className="text-[8vh] w-1/3 flex justify-center px-[2vw] text-stone-600">
            Receptek
          </h1>
          <div className="flex-1 bg-gray-100 mx-[1vw] rounded-md ring-[2px] ring-orange-400 flex justify-center items-center">
            kép feltöltése
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-[100%] flex justify-end pr-[1vw]">
            <div className="w-[20%]">
              <Button
                onClick={createNewRecipe}
                variant="yellow"
                size="sm"
                label="Új receptet írok"
              />
            </div>
          </div>
          <div className="w-full p-[1vw]">
            <div className="w-[100%] flex flex-col items-start">
              <label
                htmlFor="input-field"
                className="text-xs font-medium text-gray-700 mb-2"
              >
                Név
              </label>
              <div className="w-full pb-3">
                <NameInput
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                />
              </div>
            </div>
            <div className="w-[1/3] flex flex-col items-start ">
              <label
                htmlFor="input-field"
                className="text-xs font-medium text-gray-700 mb-2"
              >
                Hozzávalók
              </label>
              {ingredients.map((ingredient, index) => (
                <div
                  key={index + "_ingredient"}
                  className="flex flex-row items-end gap-[2px] w-[100%] "
                >
                  <DropIngredient
                    options={allIngredient?.getIngredients || []}
                    value={ingredient}
                    onChange={(value) =>
                      updateField(setIngredients, index, value)
                    }
                  />
                  {plus_abort_button(
                    () => addField(setIngredients),
                    () => removeField(setIngredients, index),
                    index === ingredients.length - 1
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col items-start p-[1vw]">
            <label
              htmlFor="input-field"
              className="text-xs font-medium text-gray-700 mb-2"
            >
              Lépések
            </label>
            {steps.map((step, index) => (
              <div
                key={index + "_steps"}
                className="flex flex-row items-end w-full"
              >
                <TextInput
                  index={index}
                  value={step}
                  onChange={(value) => updateField(setSteps, index, value)}
                />
                {plus_abort_button(
                  () => addField(setSteps),
                  () => removeField(setSteps, index),
                  index === steps.length - 1
                )}
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
                    key={index + "_phase"}
                    className="flex flex-row items-end gap-[2px] w-[100%]"
                  >
                    <div className="w-full">
                      <DropAmount
                        options={Object.values(preparation_method)}
                        value={phase}
                        onChange={(value) =>
                          updateField(setPhases, index, value)
                        }
                      />
                    </div>
                    {plus_abort_button(
                      () => addField(setPhases),
                      () => removeField(setPhases, index),
                      index === phases.length - 1
                    )}
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
                    key={index + "_tags"}
                    className="flex flex-row items-end gap-[2px] w-[100%]"
                  >
                    <DropTag
                      options={Object.keys(TagType)}
                      value={tag}
                      onChange={(value) => updateField(setTags, index, value)}
                    />
                    {plus_abort_button(
                      () => addField(setTags),
                      () => removeField(setTags, index),
                      index === tags.length - 1
                    )}
                  </div>
                ))}
                <div className="w-[100%] flex justify-end mt-[10vh]">
                  <div className="w-[20%]">
                    <Button
                      onClick={submitRecipe}
                      variant="yellow"
                      size="sm"
                      label="Mentsük el"
                      disabled={
                        !recipeName || !steps.length || !ingredients.length
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          ref={modalRef}
          title={modal === "success" ? "Elmentve" : "Nem sikerült"}
          message={
            modal === "success"
              ? "Sikeresen a polcra raktad a receptet! Ne felejtsd el néha elővenni"
              : "Nem sikerült kérlek próbáld meg később"
          }
          buttons={[
            { label: "Okay", onClick: closeModal, color: "bg-orange-500" }
          ]}
        />
      </div>
        <ListofRecipes
          setIngredients={setIngredients}
          setPhases={setPhases}
          setRecipeName={setRecipeName}
          setSteps={setSteps}
          setTags={setTags}
        />
      </div>
  );
};

export default memo(Recipe);
