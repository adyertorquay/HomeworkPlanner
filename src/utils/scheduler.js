// scheduler.js
import { parseISO, addDays, format, isBefore, isEqual, isAfter, eachDayOfInterval } from "date-fns";

const dayToIndex = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

export function generateHomeworkTasks(schedule, availability, startDateStr, endDateStr) {
  const startDate = parseISO(startDateStr);
  const endDate = parseISO(endDateStr);
  const allDays = eachDayOfInterval({ start: startDate, end: endDate });
  const tasks = [];

  schedule.forEach(({ subject, dueDay }) => {
    const dueIndex = dayToIndex[dueDay];
    const dueDate = allDays.find(date => date.getDay() === dueIndex);
    if (!dueDate) return;

    const availableSlots = [];
    for (let i = 0; i < allDays.length; i++) {
      const date = allDays[i];
      const dateStr = format(date, "yyyy-MM-dd");
      if (!availability[dateStr]) continue;

      const slots = availability[dateStr].map(time => ({ date: dateStr, time }));
      availableSlots.push(...slots);
    }

    const validSlots = availableSlots.filter(slot => {
      const slotDate = parseISO(slot.date);
      return isBefore(slotDate, dueDate) || isEqual(slotDate, dueDate);
    });

    if (validSlots.length > 0) {
      const chosenSlot = validSlots[0];
      tasks.push({
        title: `${subject} Homework`,
        subject,
        dueDate: format(dueDate, "yyyy-MM-dd"),
        scheduledDate: chosenSlot.date,
        scheduledTime: chosenSlot.time,
      });
    } else {
      tasks.push({
        title: `${subject} Homework`,
        subject,
        dueDate: format(dueDate, "yyyy-MM-dd"),
        scheduledDate: null,
        scheduledTime: null,
        warning: "No available time before due date",
      });
    }
  });

  return tasks;
}