// AvailabilitySelector.jsx
import React from "react";

const timeBlocks = ["16:00", "17:00", "18:00", "19:00", "20:00"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AvailabilitySelector = ({ availability, setAvailability }) => {
  const toggleBlock = (day, time) => {
    const today = new Date();
    const nextDate = new Date();
    const dayIndex = days.indexOf(day);
    const diff = (dayIndex - today.getDay() + 7) % 7;
    nextDate.setDate(today.getDate() + diff);
    const dateStr = nextDate.toISOString().split("T")[0];

    const current = availability[dateStr] || [];
    const updated = current.includes(time)
      ? current.filter((t) => t !== time)
      : [...current, time];

    setAvailability({
      ...availability,
      [dateStr]: updated,
    });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Weekly Availability</h2>
      <div className="space-y-4">
        {days.map((day) => (
          <div key={day}>
            <h3 className="font-medium mb-1">{day}</h3>
            <div className="flex flex-wrap gap-2">
              {timeBlocks.map((time) => (
                <button
                  key={time}
                  onClick={() => toggleBlock(day, time)}
                  className={`px-3 py-1 rounded border ${
                    Object.entries(availability).some(
                      ([date, slots]) =>
                        new Date(date).getDay() === days.indexOf(day) && slots.includes(time)
                    )
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilitySelector;