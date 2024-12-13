import React, { memo } from "react";

function SidebarLeft({ }) {

  return (
    <div
      className={`w-[100%] h-[84vh] my-[8vh] text-black/70 bg-white transition-transform duration-300 p-[1vw] xl:rounded-l-md rounded-r-md`}
      style={{
        boxShadow: "1px 2px 16px rgba(0, 0, 0, 0.8)"
      }}
    >
      <div className="flex flex-row justify-start gap-[1vw]">
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
