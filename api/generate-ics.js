// api/generate-ics.js
import { createEvents } from "ics";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const tasks = req.body.tasks || [];

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
      return res.status(500).json({ error: "Failed to generate ICS" });
    }
    res.setHeader("Content-Type", "text/calendar");
    res.setHeader("Content-Disposition", "attachment; filename=homework.ics");
    return res.status(200).send(value);
  });
}
