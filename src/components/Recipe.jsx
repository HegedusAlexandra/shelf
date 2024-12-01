/* same ingredient multiply times, minus ingredient, error handling*/

import React, { memo, useState, useEffect, useRef } from "react";
import TextInput from "./TextInput";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_INGREDIENTS,
  GET_RECIPE_BY_ID,
  GET_ALL_RECIPE
} from "../utils/graphql/queries"; // Add GET_RECIPE_BY_ID query
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

const Recipe = () => {
  const cakeId = "1";
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [phases, setPhases] = useState([""]);
  const [tags, setTags] = useState([""]);
  const [modal, setModal] = useState("");
  const [errors, setErrors] = useState({});
  const [addRecipe] = useMutation(ADD_RECIPE);
  const user = useUser();
  const { data: allIngredient } = useQuery(GET_INGREDIENTS);
  const { data: recipeData } = useQuery(GET_RECIPE_BY_ID, {
    variables: { id: cakeId },
    skip: !cakeId
  });
  const { data: recipes } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });

  useEffect(() => {
    if (recipeData?.getRecipeById) {
      const recipe = recipeData.getRecipeById;
      setRecipeName(recipe.name || "");
      setSteps(recipe.steps || [""]);
      setIngredients([""]);
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

  const modalRef = useRef();

  const openSuccessModal = () => {
    setModal("success");
    modalRef.current.open();
  };
  const openFailModal = () => {
    setModal("failed");
    modalRef.current.open();
  };
  const closeModal = () => modalRef.current.close();

  const submitRecipe = async () => {
    const recipeData = {
      userId: user.id,
      recipeName,
      steps,
      ingredients,
      phases,
      tags
    };

    try {
      // Validate the recipe data
      await RecipeValidationSchema.validate(recipeData, { abortEarly: false });
      console.log("Validation successful:", recipeData);

      // Add the recipe
      const response = await addRecipe({
        variables: recipeData
      });
      console.log("Recipe added successfully:", response.data.addRecipe);
      openSuccessModal();

      // Reset all fields including the first field
      setRecipeName(""); // Clear the recipe name
      setSteps([""]); // Reset steps to a single empty field
      setIngredients([""]); // Reset ingredients to a single empty field
      setPhases([""]); // Reset phases to a single empty field
      setTags([""]); // Reset tags to a single empty field
      setErrors({}); // Clear any existing validation errors
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

  return (
    <div className="w-[100%] flex fle-row justify-center items-center">
      <div className="flex flex-col w-[90%] md:w-[70%] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
        <div className="h-[20vh] w-full flex flex-row pb-2">
          <h1 className="text-[8vh] w-1/3 flex justify-center px-[2vw] text-stone-600">
            Receptek
          </h1>
          <div className="flex-1 bg-gray-100 mx-[1vw] rounded-md ring-[2px] ring-orange-400 flex justify-center items-center">
            kép feltöltése
          </div>
        </div>
        <div className="w-full flex flex-col">
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
                  key={index}
                  className="flex flex-row items-end gap-[2px] w-[100%] "
                >
                  <DropIngredient
                    options={allIngredient?.getIngredients || []}
                    value={ingredient}
                    onChange={(value) =>
                      updateField(setIngredients, index, value)
                    }
                  />
                  <button
                    className="w-[22px] h-full flex justify-center items-center mx-3 mb-1.5 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => addField(setIngredients)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
                  <button
                    className="w-[22px] rotate-45 h-full flex justify-center items-center mb-1.5 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                    onClick={() => removeField(setIngredients, index)}
                  >
                    <img src={plus} alt="plus" />
                  </button>
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
              <div key={index} className="flex flex-row items-end w-full">
                <TextInput
                  label={index < 1 && `Lépések`}
                  index={index}
                  value={step}
                  onChange={(value) => updateField(setSteps, index, value)}
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
                    <div className="w-full">
                      <DropAmount
                        options={Object.values(preparation_method)}
                        value={phase}
                        onChange={(value) =>
                          updateField(setPhases, index, value)
                        }
                      />
                    </div>
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
                    <DropTag
                      options={Object.keys(TagType)}
                      value={tag}
                      onChange={(value) => updateField(setTags, index, value)}
                    />
                    <button
                      className="w-[22px] h-full flex justify-center items-center mx-3 mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                      onClick={() => addField(setTags)}
                    >
                      <img src={plus} alt="plus" />
                    </button>
                    <button
                      className="w-[22px] rotate-45 h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
                      onClick={() => removeField(setTags, index)}
                    >
                      <img src={plus} alt="plus" />
                    </button>
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
      <div className="md:w-[18%] hidden h-dvh md:flex flex-col justify-center items-center">
        {recipes?.getRecipes.map((recipe, index) => (
          <p>
            {index + 1} {recipe.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default memo(Recipe);

/* mutation {
  addRecipe(
    name: "Opera Cake",
    userId: "874c30b6-5d95-4c1f-84a7-a8acabc2a463",
    steps: [
      { order: 1, description: "Preheat the oven to 180°C (350°F) and prepare two baking trays with parchment paper." },
      { order: 2, description: "Make the Joconde sponge: In a large bowl, whisk 200g almond flour, 200g powdered sugar, and 50g all-purpose flour. Gradually fold in 6 whole eggs until smooth." },
      { order: 3, description: "In a separate bowl, whisk 6 egg whites to soft peaks, adding 40g sugar gradually. Gently fold into the almond mixture." },
      { order: 4, description: "Spread the batter evenly across the prepared baking trays and bake for 8-10 minutes until golden." },
      { order: 5, description: "Prepare the coffee syrup: Dissolve 100g sugar into 150ml hot brewed coffee and set aside to cool." },
      { order: 6, description: "Make the coffee buttercream: In a heatproof bowl, beat 6 egg yolks. Heat 200g sugar and 100ml water until it reaches 118°C (soft ball stage), then slowly pour into the yolks while whisking. Add 300g softened butter and 2 tbsp coffee extract until smooth." },
      { order: 7, description: "Prepare the chocolate ganache: Heat 200ml heavy cream in a saucepan, then pour over 200g chopped dark chocolate. Stir until smooth and glossy, then let cool slightly." },
      { order: 8, description: "Assemble the cake: Place the first layer of Joconde sponge on a board, brush with coffee syrup, and spread a layer of coffee buttercream. Repeat with the second and third sponge layers." },
      { order: 9, description: "Spread a thin layer of ganache between the top layers. Finish with a chocolate glaze: Melt 100g dark chocolate with 50ml cream, and pour over the top for a smooth finish." },
      { order: 10, description: "Chill the cake for at least 2 hours. Trim the edges for a clean presentation and cut into 10 equal portions to serve." }
    ],
    ingredients: [
      { id: 91, amount: 200 },
      { id: 92, amount: 200 },
      { id: 93, amount: 50 },
      { id: 94, amount: 6 },
      { id: 95, amount: 6 },
      { id: 96, amount: 40 },
      { id: 97, amount: 150 },
      { id: 98, amount: 100 },
      { id: 99, amount: 300 },
      { id: 100, amount: 200 },
      { id: 101, amount: 2 },
      { id: 102, amount: 200 },
      { id: 103, amount: 200 },
      { id: 104, amount: 100 },
      { id: 105, amount: 50 }
    ],
     phases: [
       {
        preparation_method: SHAPING, # Use exact enum values (case-sensitive, unquoted)
        time: 10,
        temperature: 0
      },
      {
        preparation_method: BAKING,
        time: 10,
        temperature: 180
      },
      {
        preparation_method: DECORATION,
        time: 10,
        temperature: 0
      }
    ],
    tags: [
      { name: "dessert" },
    ]
  ) {
    id
    name
  }
}
 */
