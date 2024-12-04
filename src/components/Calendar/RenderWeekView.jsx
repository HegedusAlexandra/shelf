import moment from "moment";

const RenderWeekView = ({tasks,setViewMode,setCurrentDate,startOfWeek,endOfWeek}) => {
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

  export default RenderWeekView