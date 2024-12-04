import TextInput from '../../components/Recipe/TextInput'

const RenderDayView = ({currentDate,tasks,language,newTask,setNewTask,setTasks}) => {
    const date = currentDate.format("YYYY-MM-DD");
    const tasksForDay = tasks[date] || [];

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

  export default RenderDayView