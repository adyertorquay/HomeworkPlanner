// CalendarView.jsx
import React from "react";
import { format, parseISO } from "date-fns";

const Calendar = ({ tasks, startDate, endDate }) => {
  const days = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {days.map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
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
  );
};

export default Calendar;