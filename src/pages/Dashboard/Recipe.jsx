/* same ingredient multiply times, minus ingredient, error handling*/

import React, { memo, useState, useEffect } from "react";
import ListofRecipes from "../../components/Recipe/ListofRecipes";
import EditRecipe from "../../components/Recipe/EditRecipe";
import ReadRecipe from "../../components/Recipe/ReadRecipe";
import ListofFunctions from "../../components/Recipe/ListofFunctions";
import { useUser } from "../../contexts/UserContext";
import SearchRecipe from "../../components/Recipe/SearchRecipe";
import ListforToday from "../../components/Recipe/ListforToday";

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
  const [showLeftSidebarDays, setshowLeftSidebarDays] = useState(false);

  useEffect(() => setCurrentView("search"), []);

  const createNewRecipe = () => {
    setRecipeName("");
    setSteps([""]);
    setIngredients([""]);
    setPhases([""]);
    setTags([""]);
  };
  console.log(currentView, cakeId);

  return (
    <div className="w-[100vw] h-screen flex flex-row justify-center items-start overflow-hidden">
      <div className="xl:w-[18%] w-[50%] left-0 xl:static flex flex-col absolute overflow-hidden">
        <div
          className={`transition-transform duration-300 ${
            showLeftSidebars
              ? "xl:translate-x-0  -translate-x-[2%] xl:z-0 z-20"
              : "xl:translate-x-[78%] md:-translate-x-[92%] -translate-x-[88%] z-0 "
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
        <div
          className={`transition-transform duration-300 ${
            showLeftSidebarDays
              ? "xl:translate-x-0 -translate-x-[2%] xl:z-0 z-20"
              : "xl:translate-x-[78%] md:-translate-x-[92%] -translate-x-[88%] z-0"
          } overflow-hidden`}
        >
          <ListforToday
            showLeftSidebarDays={showLeftSidebarDays}
            setshowLeftSidebarDays={setshowLeftSidebarDays}
            createNewRecipe={createNewRecipe}
            setCurrentView={setCurrentView}
            setCakeId={setCakeId}
          />
        </div>
      </div>
      {(currentView === "read" || currentView === "print") && cakeId && (
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
      {currentView === "search" && !cakeId && (
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
      <div className="xl:w-[18%] w-[50%] xl:static absolute right-0 flex flex-col overflow-hidden">
        <div
          className={`transition-transform duration-300 ${
            showRightSidebars
              ? "xl:translate-x-0 translate-x-0 xl:z-0 z-20"
              : "xl:-translate-x-[90%] lg:translate-x-[54%] md:translate-x-[70%] translate-x-[88%] z-0"
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
