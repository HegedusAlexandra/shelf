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
          portions:todo.portions
        }
      }));
      setEvents(updatedEvents);
    }
  }, [todos]);

  const emptyTodoForm = () =>
    {setNewTodo({
      title: "",
      description: "",
      duration: 60,
      recipeId: "",
      portions: 0,
      start: null,
      end_time: null
    });}

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
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay"
  };

  if (loading || recipesLoading) return <p>Loading...</p>;
  if (error || RecipesError)
    return <p>Error: {error.message || RecipesError.message}</p>;

  return (
    <div className="w-[100%] flex flex-row justify-center items-start">
      <div className="w-[18%]">
        <div
          className={`transition-transform duration-300 ${
            showLeftSidebars ? "translate-x-0" : "translate-x-[78%] opacity-40"
          } overflow-hidden`}
        >
          <SidebarLeft
            showLeftSidebars={showLeftSidebars}
            setshowLeftSidebars={setshowLeftSidebars}
          />
        </div>
      </div>
      <div className="z-10 text-sm flex flex-col  w-[84%] md:w-[60%] h-[92vh] p-[2vw] bg-[#fff] backdrop-blur-lg my-[4vh] rounded-lg box-shadow">
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
      <div className="w-[18%]">
        <div
          className={`transition-transform duration-300 ${
            showRightSidebars
              ? "translate-x-0"
              : "-translate-x-[78%] opacity-40"
          } overflow-hidden`}
        >
          <SidebarRight
            setshowRightSidebars={setshowRightSidebars}
            showRightSidebars={showRightSidebars}
            handleSaveTodo={handleSaveTodo}
            setNewTodo={setNewTodo}
            newTodo={newTodo}
            options={recipes?.getRecipes}
            handleDeleteTodo={handleDeleteTodo}
            emptyTodoForm={emptyTodoForm}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
