import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TODOS, GET_ALL_RECIPE } from "../../utils/graphql/queries";
import { ADD_TODO } from "../../utils/graphql/mutations";
import { useUser } from "../../contexts/UserProvider";
import SidebarRight from "../../components/Calendar/SidebarRight";
import SidebarLeft from "../../components/Calendar/SidebarLeft";
import RenderEventContent from "../../components/Calendar/RenderEventContent";

const Calendar = () => {
  const user = useUser();
  const [currentEvents, setCurrentEvents] = useState([]);
  const [showLeftSidebars, setshowLeftSidebars] = useState(true);
  const [showRightSidebars, setshowRightSidebars] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    duration: 60,
    recipeId: "",
    portions: 0,
    start: null
  });

  const [addTodo] = useMutation(ADD_TODO);
  const { data: recipes } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });
  const {
    data: todos,
    loading,
    error
  } = useQuery(GET_TODOS, {
    skip: !user?.id,
    variables: { userId: user?.id }
  });

  const handleDateSelect = (selectInfo) => {
    setshowRightSidebars(true);
    console.log("Selected Date:", typeof selectInfo.start);
    const calculatedDuration =
      (selectInfo.end - selectInfo.start) / (1000 * 60);
    const noendAdded = selectInfo.start + 60;

    setNewTodo((prevTodo) => ({
      ...prevTodo,
      start: selectInfo.start.toISOString(),
      end_time: selectInfo.end.toISOString() || noendAdded,
      duration: calculatedDuration
    }));
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'?`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const handleDateClick = (events) => {
    console.log("====================================");
    console.log(events);
    console.log("====================================");
  };

  const handleSaveTodo = () => {
    console.log("====================================");
    console.log(newTodo);
    console.log("====================================");

    const variables = {
      userId: user?.id,
      title:
        newTodo.title ||
        (newTodo.recipeId &&
          recipes?.getRecipes?.find((r) => r.id === newTodo.recipeId)?.name) ||
        "Untitled",
      iscompleted: newTodo.iscompleted || false,
      start: newTodo.start,
      end_time: newTodo.end_time,
      duration: newTodo.duration || 60,
      description: newTodo.description || "",
      recipeId: Number(newTodo.recipeId) || ""
    };

    addTodo({ variables })
      .then(() => {
        alert("Todo added successfully!");
        setNewTodo({
          title: "",
          description: "",
          duration: 60,
          recipeId: "",
          portions: 0,
          start: null,
          end_time: null
        }); // Reset newTodo
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
        alert("Failed to add todo!");
      });
  };

  const handleDropRecipesChange = (value) => {
    setNewTodo((prevTodo) => ({
      ...prevTodo,
      recipeId: value.recipeId,
      portions: value.portions,
      title:
        prevTodo.title ||
        recipes?.getRecipes?.find((r) => r.id === value.recipeId)?.name ||
        ""
    }));
  };

  const headerToolbarConfig = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-[100%] flex flex-row justify-center items-start">
      <div className="w-[18%]">
        <div
          className={`transition-transform duration-300 ${
            showLeftSidebars ? "translate-x-0" : "translate-x-[78%]"
          } overflow-hidden`}
        >
          <SidebarLeft />
        </div>
      </div>
      <div className="z-10 text-sm flex flex-col  w-[90%] md:w-[60%] h-[92vh] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={headerToolbarConfig}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialEvents={todos?.getTodos.map((todo) => ({
            title: todo.title,
            start: todo.start, // Ensure start is set
            end: todo.end_time, // Use end_time from your data
          })) || []}
          select={handleDateSelect}
          eventContent={RenderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          dateClick={handleDateClick}
          height={"90vh"}
        />
      </div>
      <div className="w-[18%]">
        <div
          className={`transition-transform duration-300 ${
            showRightSidebars ? "translate-x-0" : "-translate-x-[78%]"
          } overflow-hidden`}
        >
          <SidebarRight
          setshowRightSidebars={setshowRightSidebars}
          showRightSidebars={showRightSidebars}
            currentEvents={currentEvents}
            handleSaveTodo={handleSaveTodo}
            setNewTodo={setNewTodo}
            newTodo={newTodo}
            options={recipes?.getRecipes}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
