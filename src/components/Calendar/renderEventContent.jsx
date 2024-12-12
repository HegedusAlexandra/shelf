import React from "react";

const RenderEventContent = (eventInfo) => {
    return (<div className="flex flex-col justify-start items-start">
      <p className="w-full flex flex-row gap-1 overflow-hidden">
        <b>{eventInfo.event?.extendedProps?.portions}</b> adag <br/><i>{eventInfo.event.title}</i>
      </p>
      <p className="w-full flex flex-row gap-1 overflow-hidden">
        <b>{eventInfo.event?.extendedProps?.description}</b>
      </p></div>
    );
  }

  export default RenderEventContent