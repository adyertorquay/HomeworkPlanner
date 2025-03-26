// icsExport.js
import { createEvents } from "ics";

export function generateICS(tasks, callback) {
  const events = tasks
    .filter((task) => task.scheduledDate && task.scheduledTime)
    .map((task) => {
      const [hour, minute] = task.scheduledTime.split(":").map(Number);
      const [year, month, day] = task.scheduledDate.split("-").map(Number);

      return {
        start: [year, month, day, hour, minute],
        duration: { hours: 1 },
        title: task.title,
        description: `Due: ${task.dueDate}`,
      };
    });

  createEvents(events, (error, value) => {
    if (error) {
      console.error("ICS generation error:", error);
      return;
    }
    callback(value);
  });
}
