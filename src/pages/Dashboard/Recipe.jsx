/* same ingredient multiply times, minus ingredient, error handling*/

import React, { memo, useState } from "react";
import ListofRecipes from "../../components/Recipe/ListofRecipes";
import EditRecipe from "../../components/Recipe/EditRecipe";
import ReadRecipe from "../../components/Recipe/ReadRecipe";
import ListofFunctions from "../../components/Recipe/ListofFunctions";
import { useUser } from "../../contexts/UserProvider";

const Recipe = () => {
  const [currentView, setCurrentView] = useState("read");
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
  const [phases, setPhases] = useState([""]);
  const [tags, setTags] = useState([""]);
  const user = useUser();

  const createNewRecipe = () => {
    setRecipeName("");
    setSteps([""]);
    setIngredients([""]);
    setPhases([""]);
    setTags([""]);
  };

  return (
    <div className="w-[100%] flex flex-row justify-center items-start">
      <ListofFunctions createNewRecipe={createNewRecipe} setCurrentView={setCurrentView} />
      {(currentView === "read") && (
        <ReadRecipe
          ingredients={ingredients}
          phases={phases}
          recipeName={recipeName}
          steps={steps}
          tags={tags}
          user={user}
        />
      )}
      {(currentView === "edit" || currentView === "add") && (
        <EditRecipe
          setIngredients={setIngredients}
          setPhases={setPhases}
          setRecipeName={setRecipeName}
          setSteps={setSteps}
          setTags={setTags}
          ingredients={ingredients}
          phases={phases}
          recipeName={recipeName}
          steps={steps}
          tags={tags}
          user={user}
          currentView={currentView}
          createNewRecipe={createNewRecipe}
        />
      )}
      <ListofRecipes
        setIngredients={setIngredients}
        setPhases={setPhases}
        setRecipeName={setRecipeName}
        setSteps={setSteps}
        setTags={setTags}
        user={user}
      />
    </div>
  );
};

export default memo(Recipe);
