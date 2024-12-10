import React from "react";
import Button from "../Button";
import DropRecipes from "./DropRecipes";

function SidebarRight({
  handleSaveTodo,
  setNewTodo,
  newTodo = {},
  options
}) {
  const handleDropRecipesChange = (value) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      ...value,
      title:
        options?.find((option) => option.id === value.recipeId)?.name ||
        prevTodo?.title ||
        ""
    }));
  };

  const handleInputChange = (field, value) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [field]: value
    }));
  };

  return (
    <div className="w-[100%] h-[84vh] my-[8vh] bg-white rounded-r-md p-[1vw] text-black/70 flex flex-col justify-start gap-[4vh]">
      <div>
        <h2 className="font-bold text-xl mb-[4vh]">Add Todo</h2>
        <h2 className="text-sm">from: {newTodo?.start}</h2>
        <h2 className="text-sm">to: {newTodo?.end}</h2>
        <p className="text-xs">Add a title or use the recipe's name automatically</p>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div>
          <div className="w-[100%] flex flex-row justify-start">
            <input
              type="text"
              placeholder="Title"
              className="px-3 w-full"
              value={newTodo.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <div>
          <div className="w-[100%] flex flex-row justify-end items-end">
            <textarea
              className="px-3 w-full h-[3vh] focus:h-[20vh]"
              placeholder="Description"
              value={newTodo.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <DropRecipes
          options={options}
          value={newTodo}
          onChange={handleDropRecipesChange}
        />
        <div>
          <div className="w-[100%] flex flex-row justify-between">
            <input
              type="number"
              className=" px-3 w-full"
              placeholder="Duration (in minutes)"
              value={newTodo.duration || ""} // Fallback to an empty string if duration is undefined
              onChange={(e) =>
                handleInputChange("duration", parseInt(e.target.value) || 0)
              }
            />
            <p>perc</p>
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
      </div>
      <Button
        variant="yellow"
        size="sm"
        label="Hozzáadás"
        onClick={() => handleSaveTodo()}
      />
    </div>
  );
}

export default React.memo(SidebarRight);
