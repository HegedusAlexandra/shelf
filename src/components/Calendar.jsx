import React, { useState } from "react";
import moment from "moment";
import Button from "./Button";
import i18next from "i18next";
import TextInput from './TextInput'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [viewMode, setViewMode] = useState("month");
  const [tasks, setTasks] = useState({}); //  { "YYYY-MM-DD": ["Task 1", "Task 2"] }
  const [newTask, setNewTask] = useState(""); // Move useState out of RenderDayView
  const language = i18next.language.toLowerCase();

  const startOfWeek = currentDate.clone().startOf("week");
  const endOfWeek = currentDate.clone().endOf("week");

  const handlePrevious = () => {
    const unit = viewMode === "month" ? "month" : "week";
    setCurrentDate(currentDate.clone().subtract(1, unit));
  };

  const handleNext = () => {
    const unit = viewMode === "month" ? "month" : "week";
    setCurrentDate(currentDate.clone().add(1, unit));
  };

  const handleAddTask = (date, task) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      if (!updatedTasks[date]) updatedTasks[date] = [];
      updatedTasks[date].push(task);
      return updatedTasks;
    });
  };

  const handleDeleteTask = (date, index) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[date].splice(index, 1);
      if (updatedTasks[date].length === 0) delete updatedTasks[date];
      return updatedTasks;
    });
  };

  const RenderMonthView = () => {
    const startOfMonth = currentDate.clone().startOf("month").startOf("week");
    const endOfMonth = currentDate.clone().endOf("month").endOf("week");
    const days = [];
    let day = startOfMonth.clone();

    while (day.isBefore(endOfMonth, "day")) {
      days.push(
        <div
          key={day.format(language === 'hu' ? "YYYY. MMM D., dddd" : "YYYY-MM-DD" )}
          className={`p-[12px] ${day.isSame(moment(), "day") ? "bg-[#67e8f9]" : "bg-[#ffffff]"}`}
          onClick={() => {
            setViewMode("day");
            setCurrentDate(day.clone());
          }}
        >
          <strong>{day.format("D")}</strong>
          <ul>
            {(tasks[day.format("YYYY-MM-DD")] || []).map((task, index) => (
              <li key={index}>
                {task}
              </li>
            ))}
          </ul>
        </div>
      );
      day.add(1, "day");
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "5px"
        }}
      >
        {days}
      </div>
    );
  };

  const RenderWeekView = () => {
    const days = [];
    let day = startOfWeek.clone();

    while (day.isSameOrBefore(endOfWeek, "day")) {
      days.push(
        <div
          key={day.format("YYYY-MM-DD")}
          className={`p-[8px] my-[2px] ${day.isSame(moment(), "day") ? "bg-white" : "bg-white/40"} rounded-md`}
          onClick={() => {
            setViewMode("day");
            setCurrentDate(day.clone());
          }}
        >
          <p className="text-sm ">{day.format("dddd")}</p>
          <strong>{day.format("MMM D")}</strong>
          <ul>
            {(tasks[day.format("YYYY-MM-DD")] || []).map((task, index) => (
              <li key={index} >
                {task}
              </li>
            ))}
          </ul>
        </div>
      );
      day.add(1, "day");
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7)",
          gap: "2px"
        }}
      >
        {days}
      </div>
    );
  };

  const RenderDayView = () => {
    const date = currentDate.format("YYYY-MM-DD");
    const tasksForDay = tasks[date] || [];

    return (
      <div>
        <h3>{currentDate.format(language === 'hu' ? "YYYY. MMM D., dddd" : "dddd, MMMM D, YYYY")}</h3>
        <ul>
          {tasksForDay.map((task, index) => (
            <li key={index} style={{ marginBottom: "5px" }}>
              {task}{" "}
              <button
                style={{ color: "red", marginLeft: "10px", cursor: "pointer" }}
                onClick={() => handleDeleteTask(date, index)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
        <TextInput
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          style={{ padding: "5px", marginRight: "5px" }}
        />
        <button
          onClick={() => {
            if (newTask.trim()) {
              handleAddTask(date, newTask);
              setNewTask("");
            }
          }}
          style={{ padding: "5px 10px" }}
        >
          Add Task
        </button>
      </div>
    );
  };

  const renderView = () => {
    if (viewMode === "month") return <RenderMonthView />;
    if (viewMode === "week") return <RenderWeekView />;
    if (viewMode === "day") return <RenderDayView />;
  };

  return (
    <div className="w-[60vw] my-[10vh]">
      <div className="flex-1 flex flex-row justify-between items-center">
        <button onClick={handlePrevious}>◀</button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button onClick={handleNext}>▶</button>
      </div>
      <div className="flex flex-row gap-[2px]">
        <Button label="day" onClick={() => setViewMode("day")}>
          Day
        </Button>
        <Button label="week" onClick={() => setViewMode("week")}>
          Week
        </Button>
        <Button label="month" onClick={() => setViewMode("month")}>
          Month
        </Button>
      </div>
      {renderView()}
    </div>
  );
};

export default Calendar;
