import React, { memo } from "react";
import plus from "../../assets/icons/plus.png";

function SidebarLeft({ setshowLeftSidebars, showLeftSidebars }) {


  return (
    <div
      className={`w-[100%] h-[84vh] my-[8vh] text-black/70 bg-white transition-transform duration-300 p-[1vw] rounded-l-md`}
    >
      <div className="flex flex-row justify-start gap-[1vw]">
        {showLeftSidebars ? (
          <button
            className="w-[22px] rotate-45 h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
            onClick={() => setshowLeftSidebars(false)}
          >
            <img src={plus} alt="plus" />
          </button>
        ) : (
          <button
            className="w-[22px] h-full flex justify-center items-center mb-2 ring-[1px] ring-gray-500 rounded-full hover:bg-white/50"
            onClick={() => setshowLeftSidebars(true)}
          >
            <img src={plus} alt="plus" />
          </button>
        )}
        <h2 className="text-xl mb-[4vh]">Add Todo</h2>
      </div>
      <div>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
    </div>
  );
}

export default memo(SidebarLeft);
