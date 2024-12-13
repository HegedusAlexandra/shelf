import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TODOS, GET_ALL_RECIPE } from "../../utils/graphql/queries";
import { ADD_TODO, DELETE_TODO } from "../../utils/graphql/mutations";
import { useUser } from "../../contexts/UserContext";
import SidebarRight from "../../components/Calendar/SidebarRight";
import SidebarLeft from "../../components/Calendar/SidebarLeft";
import RenderEventContent from "../../components/Calendar/RenderEventContent";

const Calendar = () => {
  const user = useUser();
  const [events, setEvents] = useState([]);
  const [showLeftSidebars, setshowLeftSidebars] = useState(false);
  const [showRightSidebars, setshowRightSidebars] = useState(false);
  const [changeTodo, setchangeTodo] = useState("");
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    duration: 60,
    recipeId: "",
    portions: 0,
    start: null
  });
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: GET_TODOS, variables: { userId: user?.id } }],
    awaitRefetchQueries: true
  });
  const {
    data: recipes,
    loading: recipesLoading,
    error: RecipesError
  } = useQuery(GET_ALL_RECIPE, {
    variables: { userId: user?.id }
  });
  const {
    data: todos,
    refetch: refetchTodos,
    loading,
    error
  } = useQuery(GET_TODOS, {
    skip: !user?.id,
    variables: { userId: user?.id }
  });
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [GET_TODOS]
  });

  useEffect(() => {
    console.log(todos?.getTodos);

    if (todos?.getTodos) {
      const updatedEvents = todos.getTodos.map((todo) => ({
        title: todo.title,
        start: todo.start,
        end: todo.end_time,
        extendedProps: {
          todoId: todo.id,
          recipeId: String(todo.recipe_id),
          description: todo.description,
          duration: todo.duration,
          portions: todo.portions
        }
      }));
      setEvents(updatedEvents);
    }
  }, [todos]);

  const emptyTodoForm = () => {
    setNewTodo({
      title: "",
      description: "",
      duration: 60,
      recipeId: "",
      portions: 0,
      start: null,
      end_time: null
    });
  };

  const handleDateSelect = (selectInfo) => {
    emptyTodoForm();
    setshowRightSidebars(true);

    const calculatedDuration =
      (selectInfo.end - selectInfo.start) / (1000 * 60);
    const noendAdded = selectInfo.start + 60;

    setNewTodo(() => ({
      title: "",
      description: "",
      recipeId: "",
      portions: 0,
      start: selectInfo.start.toISOString(),
      end_time: selectInfo.end.toISOString() || noendAdded,
      duration: calculatedDuration
    }));
  };

  const handleEventClick = (clickInfo) => {
    /* when exactly clicking on the already existing event */

    emptyTodoForm();
    const event = clickInfo.event;
    console.log(event.extendedProps);

    setNewTodo({
      title: event.title || "",
      description: event.extendedProps.description || "",
      duration: event.extendedProps.duration || 60,
      recipeId: event.extendedProps.recipeId || "",
      portions: event.extendedProps.portions || 0,
      start: event.start?.toISOString() || null,
      end_time: event.end?.toISOString() || null
    });
    setchangeTodo(() => event.extendedProps.todoId);
    setshowRightSidebars(true);
  };

  const handleEvents = () => {
    /* when change to day tab  */
    /*  console.log("handleEvents", events); */
  };

  const handleDateClick = () => {
    /* when clicking on an empty part in the day view */
    /* console.log("handleDateClick", events); */
  };

  const handleSaveTodo = () => {
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
      recipeId: Number(newTodo.recipeId) || "",
      portions: newTodo.portions || 0
    };

    addTodo({ variables })
      .then(() => {
        alert("Todo added successfully!");
        emptyTodoForm();
        refetchTodos();
      })
      .catch((err) => {
        console.error("Error adding todo:", err);
        alert("Failed to add todo!");
      });
  };

  const handleDeleteTodo = () => {
    const variables = {
      userId: user?.id,
      todoId: changeTodo
    };
    deleteTodo({ variables })
      .then(() => {
        alert("Todo deleted successfully!");
        emptyTodoForm();
        refetchTodos();
      })
      .catch((err) => {
        console.error("Error deleting todo:", err);
        alert("Failed to delete todo!");
      });
  };

  const headerToolbarConfig = {
    left: "prev,next today",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  };

  if (loading || recipesLoading) return <p>Loading...</p>;
  if (error || RecipesError)
    return <p>Error: {error.message || RecipesError.message}</p>;

  console.log(showLeftSidebars, showRightSidebars);

  return (
    <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-start overflow-hidden relative">
      {/* Left Sidebar */}
      <div className="xl:static absolute left-0 xl:w-[18%] w-[90%] h-full">
        <div
          className={`relative flex xl:flex-row flex-row-reverse justify-center items-center transition-transform duration-300 ${
            showLeftSidebars
              ? "xl:translate-x-0 translate-x-0 xl:z-0 z-20"
              : "xl:translate-x-[90%] translate-x-[-92%] z-0"
          }`}
        >
          <button
            onClick={() => setshowLeftSidebars(!showLeftSidebars)}
            className="xl:w-[2vw] md:w-[4vw] w-[6vw] h-[20vh] flex items-center justify-center font-bold bg-green-400 xl:rounded-l-md rounded-r-md xl:rounded-r-none rounded-l-none font-playwrite xl:py-[30px] py-[10px] hover:bg-green-600"
          >
            <div
              className="text-center text-sm rotate-180"
              style={{
                writingMode: "vertical-rl",
                whiteSpace: "nowrap"
              }}
            >
              empty
            </div>
          </button>
          <SidebarLeft />
        </div>
      </div>

      {/* Calendar Center */}
      <div className="z-10 text-sm flex flex-col w-[84%] xl:w-[60%] h-[92vh] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg shadow-lg overflow-hidden">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={headerToolbarConfig}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          events={events}
          select={handleDateSelect}
          eventContent={RenderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          dateClick={handleDateClick}
          height={"90vh"}
        />
      </div>

      {/* Right Sidebar */}
      <div className="xl:static absolute right-0 xl:w-[18%] w-[90%] h-full">
        <div
          className={`relative flex xl:flex-row flex-row-reverse justify-center items-center transition-transform duration-300 ${
            showRightSidebars
              ? "xl:-translate-x-0 xl:z-0 z-50"
              : "xl:-translate-x-[90%] translate-x-[92%] z-0"
          } overflow-hidden`}
        >
          <SidebarRight
            handleSaveTodo={handleSaveTodo}
            setNewTodo={setNewTodo}
            newTodo={newTodo}
            options={recipes?.getRecipes}
            handleDeleteTodo={handleDeleteTodo}
            emptyTodoForm={emptyTodoForm}
          />
          <button
            onClick={() => setshowRightSidebars(!showRightSidebars)}
            className="xl:w-[2vw] md:w-[4vw] w-[6vw] h-[20vh] flex items-center justify-center font-bold bg-yellow-400 xl:rounded-r-md rounded-l-md xl:rounded-l-none rounded-r-none font-playwrite xl:py-[30px] py-[10px] hover:bg-yellow-600"
          >
            <div
              className="text-center text-sm"
              style={{
                writingMode: "vertical-rl",
                whiteSpace: "nowrap"
              }}
            >
              add todo
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
