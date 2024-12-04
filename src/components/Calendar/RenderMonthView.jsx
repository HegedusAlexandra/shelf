import moment from "moment";

const RenderMonthView = ({tasks,setCurrentDate,setViewMode,language,currentDate}) => {
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

 export default RenderMonthView