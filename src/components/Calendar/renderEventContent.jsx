import React from "react";

const RenderEventContent = (eventInfo) => {
    return (
      <p className="w-full flex flex-row gap-1">
        <b>{eventInfo.timeText}</b><br/><i>{eventInfo.event.title}</i>
      </p>
    );
  }

  export default RenderEventContent