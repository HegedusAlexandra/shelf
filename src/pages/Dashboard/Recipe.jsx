/* same ingredient multiply times, minus ingredient, error handling*/

import React, { memo, useState, useEffect } from "react";
import ListofRecipes from "../../components/Recipe/ListofRecipes";
import EditRecipe from "../../components/Recipe/EditRecipe";
import ReadRecipe from "../../components/Recipe/ReadRecipe";
import ListofFunctions from "../../components/Recipe/ListofFunctions";
import { useUser } from "../../contexts/UserContext";
import SearchRecipe from "../../components/Recipe/SearchRecipe";

const Recipe = () => {
  const [currentView, setCurrentView] = useState("read");
  const [recipeName, setRecipeName] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", measurement: "", type: "" }
  ]);
  const [phases, setPhases] = useState([""]);
  const [tags, setTags] = useState([""]);
  const user = useUser();
  const [cakeId, setCakeId] = useState("");
  const [showLeftSidebars, setshowLeftSidebars] = useState(false);
  const [showRightSidebars, setshowRightSidebars] = useState(false);

  useEffect(() => setCurrentView('search'),[])

  const createNewRecipe = () => {
    setRecipeName("");
    setSteps([""]);
    setIngredients([""]);
    setPhases([""]);
    setTags([""]);
  };


  return (
    <div className="w-[100%] flex flex-row justify-center items-start">
      <div className="w-[18%]">
        <div
          className={`transition-transform duration-300 ${
            showLeftSidebars ? "translate-x-0 w-full" : "translate-x-[78%]"
          } overflow-hidden`}
        >
          <ListofFunctions
            showLeftSidebars={showLeftSidebars}
            setshowLeftSidebars={setshowLeftSidebars}
            createNewRecipe={createNewRecipe}
            setCurrentView={setCurrentView}
            cakeId={cakeId}
            setCakeId={setCakeId}
          />
        </div>
      </div>
      {(currentView === "read" || currentView === 'print') && cakeId && (
        <ReadRecipe
          ingredients={ingredients}
          phases={phases}
          recipeName={recipeName}
          steps={steps}
          tags={tags}
          user={user}
          setCakeId={setCakeId}
          setCurrentView={setCurrentView}
        />
      )}
      {currentView === "search"  && !cakeId && (
        <SearchRecipe
          ingredients={ingredients}
          phases={phases}
          recipeName={recipeName}
          steps={steps}
          tags={tags}
          user={user}
          setCakeId={setCakeId}
          setCurrentView={setCurrentView}
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
      <div className="w-[18%] ">
        <div
          className={`transition-transform duration-300 ${
            showRightSidebars ? "translate-x-0 w-full" : "-translate-x-[90%]"
          } overflow-hidden`}
        >
          <ListofRecipes
            setIngredients={setIngredients}
            setPhases={setPhases}
            setRecipeName={setRecipeName}
            setSteps={setSteps}
            setTags={setTags}
            user={user}
            cakeId={cakeId}
            setCakeId={setCakeId}
            setshowRightSidebars={setshowRightSidebars}
            showRightSidebars={showRightSidebars}
            createNewRecipe={createNewRecipe}
            setCurrentView={setCurrentView}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Recipe);
