// App.jsx
import React, { useState, useEffect } from "react";
import Calendar from "./components/CalendarView";
import AvailabilitySelector from "./components/AvailabilitySelector";
import { generateHomeworkTasks } from "./utils/scheduler";
import { fixedHomeworkSchedule } from "./data/fixedHomeworkSchedule";

const App = () => {
  const [availability, setAvailability] = useState({});
  const [startDate, setStartDate] = useState("2025-04-07");
  const [endDate, setEndDate] = useState("2025-04-13");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const generated = generateHomeworkTasks(fixedHomeworkSchedule, availability, startDate, endDate);
    setTasks(generated);
  }, [availability, startDate, endDate]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Homework Planner</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 space-y-4">
          <label className="block">
            <span className="text-gray-700">Start Date</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">End Date</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
            />
          </label>
          <AvailabilitySelector availability={availability} setAvailability={setAvailability} />
        </div>
        <div className="md:col-span-2">
          <Calendar tasks={tasks} startDate={startDate} endDate={endDate} />
        </div>
      </div>
    </div>
  );
};

export default App;