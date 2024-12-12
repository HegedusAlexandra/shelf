import React, { useState } from "react";
import Button from "../Button";
import DropRecipes from "./DropRecipes";
import DropFilter from "../Recipe/DropFilter";
import plus from "../../assets/icons/plus.png";

function SidebarRight({
  handleSaveTodo,
  setNewTodo,
  newTodo = {},
  options,
  setshowRightSidebars,
  showRightSidebars,
  handleDeleteTodo,
  emptyTodoForm
}) {
  const [filterValue, setFilterValue] = useState("");

  const handleInputChange = (field, value) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      [field]: value
    }));
  };

  return (
    <div className="w-[100%] h-[84vh] my-[8vh]  bg-white rounded-r-md p-[1vw] text-black/70 flex flex-col justify-start gap-[4vh]">
      <div>
        <div className="flex flex-row justify-between">
          <h2 className="font-bold text-xl mb-[4vh]">Add Todo</h2>
          {showRightSidebars ? (
            <button
              className="w-[22px] rotate-45 h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
              onClick={() => setshowRightSidebars(false)}
            >
              <img src={plus} alt="plus" />
            </button>
          ) : (
            <button
              className="w-[22px] h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
              onClick={() => setshowRightSidebars(true)}
            >
              <img src={plus} alt="plus" />
            </button>
          )}
        </div>
        <h2 className="text-sm">from: {newTodo?.start}</h2>
        <h2 className="text-sm">to: {newTodo?.end_time}</h2>
        <p className="text-xs">
          Add a title or use the recipe's name automatically
        </p>
      </div>
      <div className="flex flex-col flex-1 gap-4 ">
        <div>
          <div className="w-[100%] flex flex-row justify-start">
            <input
              type="text"
              placeholder="Cím"
              className="px-4 w-full"
              value={newTodo.title || ""}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <div>
          <div className="w-[100%] flex flex-row justify-end items-end">
            <textarea
              className="px-4 w-full h-[3vh] focus:h-[20vh]"
              placeholder="Leírás"
              value={newTodo.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
          <hr className="w-[100%] mx-auto h-[1px] bg-stone-300" />
        </div>
        <DropFilter
          placeholder="Válassz kategóriát"
          onChange={setFilterValue}
          value={filterValue}
        />
        <DropRecipes
          placeholder="Válassz egy sütit"
          options={options.filter((el) =>
            filterValue
              ? el.tags.some((tag) => tag.tag_type === filterValue)
              : true
          )}
          value={newTodo}
          onChangeDropdown={(value) => handleInputChange("recipeId", value)}
          onChangeInput={(value) =>
            handleInputChange("portions", parseInt(value))
          }
        />
        <div>
          <div className="w-[100%] flex flex-row justify-between">
            <input
              type="number"
              className=" px-4 w-full"
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
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <Button
            variant="yellowFull"
            size="sm"
            label="Mégse"
            onClick={() => emptyTodoForm()}
          />
          <Button
            variant="yellow"
            size="sm"
            label="Hozzáadás"
            onClick={() => handleSaveTodo()}
          />
        </div>{" "}
        <Button
          variant="red"
          size="sm"
          label="Törlés"
          onClick={() => handleDeleteTodo()}
        />
      </div>
    </div>
  );
}

export default SidebarRight;
