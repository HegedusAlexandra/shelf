import React, {memo} from "react";
function SidebarLeft({}) {
    /* update todo ,delete todo*/
  
    return (
      <div className={`w-[100%] h-[84vh] my-[8vh] bg-white transition-transform duration-300 p-[1vw] rounded-l-md`}>
        <div>
          <h2>Instructions</h2>
          <ul>
            <li>Select dates to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
        <div>
          <h2>Add Todos</h2>
          <ul>
            <li>Select dates to create a new event</li>
            <li>Drag, drop, and resize events</li>
            <li>Click an event to delete it</li>
          </ul>
        </div>
      </div>
    );
  }

  export default memo(SidebarLeft)