// CalendarView.jsx
import React from "react";
import { format, parseISO } from "date-fns";
import { generateICS } from "../utils/scheduler";

const Calendar = ({ tasks }) => {
  const allDates = tasks
    .map((task) => task.scheduledDate)
    .filter(Boolean);

  const uniqueDates = [...new Set(allDates)].sort();

  const handleExportICS = () => {
    generateICS(tasks, (icsContent) => {
      const blob = new Blob([icsContent], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "homework-planner.ics";
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleExportICS}
          className="bg-green-500 text-white px-4 py-2 rounded shadow"
        >
          Export to Calendar (.ics)
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueDates.map((dateStr) => {
          const day = parseISO(dateStr);
          const dayTasks = tasks.filter((task) => task.scheduledDate === dateStr);

          return (
            <div key={dateStr} className="border rounded-lg p-2 shadow bg-white">
              <h2 className="font-semibold text-lg mb-2">{format(day, "EEEE, MMM d")}</h2>
              {dayTasks.length === 0 ? (
                <p className="text-sm text-gray-500">No tasks</p>
              ) : (
                <ul className="space-y-1">
                  {dayTasks.map((task, idx) => (
                    <li key={idx} className="text-sm">
                      <span className="font-medium">{task.title}</span>
                      <br />
                      <span className="text-gray-600">Time: {task.scheduledTime}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
