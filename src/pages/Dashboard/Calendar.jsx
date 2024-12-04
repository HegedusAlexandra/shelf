import React, { useState } from "react";
import moment from "moment";
import Button from "../../components/Recipe/Button";
import i18next from "i18next";
import RenderDayView from "../../components/Calendar/RenderDayView";
import RenderWeekView from "../../components/Calendar/RenderWeekView";
import RenderMonthView from "../../components/Calendar/RenderMonthView";

// Set locale globally if needed
moment.updateLocale("en", {
  week: {
    dow: 1, // Monday is the first day of the week
    doy: 4, // The week that contains Jan 4th is the first week of the year
  },
});

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [viewMode, setViewMode] = useState("month");
  const [tasks, setTasks] = useState({});
  const language = i18next.language.toLowerCase();

  // Calculate start and end of the week based on ISO week
  const startOfWeek = currentDate.clone().startOf("isoWeek");
  const endOfWeek = currentDate.clone().endOf("isoWeek");

  const handlePrevious = () => {
    const unit = viewMode === "month" ? "month" : "week";
    setCurrentDate(currentDate.clone().subtract(1, unit));
  };

  const handleNext = () => {
    const unit = viewMode === "month" ? "month" : "week";
    setCurrentDate(currentDate.clone().add(1, unit));
  };

  return (
    <div className="flex flex-col justify-between items-stretch text-opensans text-[3vh] w-[90%] h-[92vh] md:w-[60%] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
      <div className="flex-1 flex flex-row justify-between items-center bg-ab2 bg-no-repeat bg-cover rounded-md">
        <button onClick={handlePrevious}>◀</button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={handleNext}>▶</button>
      </div>
      <div className="flex flex-row gap-[2px]">
        <Button variant="plain" label="day" onClick={() => setViewMode("day")}>
          Day
        </Button>
        <Button
          variant="plain"
          label="week"
          onClick={() => setViewMode("week")}
        >
          Week
        </Button>
        <Button
          variant="plain"
          label="month"
          onClick={() => setViewMode("month")}
        >
          Month
        </Button>
      </div>
      <hr className="w-full h-[3px] bg-black" />
      {viewMode === "month" && (
        <RenderMonthView
          tasks={tasks}
          setCurrentDate={setCurrentDate}
          setViewMode={setViewMode}
          language={language}
          currentDate={currentDate}
        />
      )}
      {viewMode === "week" && (
        <RenderWeekView
          tasks={tasks}
          setCurrentDate={setCurrentDate}
          setViewMode={setViewMode}
          startOfWeek={startOfWeek}
          endOfWeek={endOfWeek}
        />
      )}
      {viewMode === "day" && (
        <RenderDayView
          tasks={tasks}
          setCurrentDate={setCurrentDate}
          setViewMode={setViewMode}
          language={language}
          currentDate={currentDate}
          setTasks={setTasks}
        />
      )}
    </div>
  );
};

export default Calendar;
