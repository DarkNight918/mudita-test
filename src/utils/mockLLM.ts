export interface TimeBlock {
  time: string;
  task: string;
}

export interface ScheduleResult {
  timeBlocks: TimeBlock[];
  explanation: string;
  visualization: string;
}

/**
 * Generates an optimized schedule based on the provided tasks.
 * Tasks are classified into work, outdoor, family, and other categories.
 * The schedule is arranged using these rules:
 * - Work tasks are scheduled in the late morning (starting at 11AM).
 * - Outdoor tasks are grouped in the early afternoon (starting at 1PM).
 * - Other miscellaneous tasks are slotted in the mid-afternoon (starting at 3PM).
 * - Family tasks are reserved for later in the day (starting at 4PM),
 *   assuming a typical school day where family members may not be available until then.
 *
 * The function returns a schedule along with a detailed explanation and
 * a fun, text-based visualization.
 */
export function generateOptimizedSchedule(tasks: string[]): ScheduleResult {
  // Define keyword lists for classification
  const workKeywords = ["work", "meeting", "prepare"];
  const outdoorKeywords = ["run", "walk", "mow", "outside"];
  const familyKeywords = ["daughter", "son", "kid", "family"];

  // Classify tasks based on keywords
  const workTasks = tasks.filter((task) =>
    workKeywords.some((keyword) => task.toLowerCase().includes(keyword))
  );

  const outdoorTasks = tasks.filter((task) =>
    outdoorKeywords.some((keyword) => task.toLowerCase().includes(keyword))
  );

  const familyTasks = tasks.filter((task) =>
    familyKeywords.some((keyword) => task.toLowerCase().includes(keyword))
  );

  // Other tasks are those not in any of the above categories
  const categorizedTasks = new Set([
    ...workTasks,
    ...outdoorTasks,
    ...familyTasks,
  ]);
  const otherTasks = tasks.filter((task) => !categorizedTasks.has(task));

  // Build the schedule using a "currentTime" pointer (in 24h hours)
  // We enforce minimum start times for each category:
  //   - Work: 11AM, Outdoor: 1PM, Other: 3PM, Family: 4PM
  const schedule: TimeBlock[] = [];
  let currentTime = 11; // Starting at 11AM for work tasks

  // Schedule work tasks (late morning)
  if (workTasks.length > 0) {
    currentTime = Math.max(currentTime, 11);
    workTasks.forEach((task) => {
      schedule.push({ time: formatTime(currentTime), task });
      currentTime++;
    });
  }

  // Schedule outdoor tasks (early afternoon)
  if (outdoorTasks.length > 0) {
    currentTime = Math.max(currentTime, 13); // Ensure at least 1PM
    outdoorTasks.forEach((task) => {
      schedule.push({ time: formatTime(currentTime), task });
      currentTime++;
    });
  }

  // Schedule other tasks (mid-afternoon)
  if (otherTasks.length > 0) {
    currentTime = Math.max(currentTime, 15); // Ensure at least 3PM
    otherTasks.forEach((task) => {
      schedule.push({ time: formatTime(currentTime), task });
      currentTime++;
    });
  }

  // Schedule family tasks (later afternoon/evening)
  if (familyTasks.length > 0) {
    currentTime = Math.max(currentTime, 16); // Ensure at least 4PM
    familyTasks.forEach((task) => {
      schedule.push({ time: formatTime(currentTime), task });
      currentTime++;
    });
  }

  // Generate an explanation with reasoning
  let explanation =
    "We've analyzed your tasks and created an optimized schedule for your day. ";
  if (workTasks.length > 0) {
    explanation +=
      "We think tasks like " +
      workTasks.join(" and ") +
      " are critical, so they’re scheduled in the late morning when your focus is highest. ";
  }
  if (outdoorTasks.length > 0) {
    explanation +=
      "Outdoor activities (" +
      outdoorTasks.join(" and ") +
      ") are grouped in the early afternoon to take advantage of natural light and boost your energy. ";
  }
  if (familyTasks.length > 0) {
    explanation +=
      "Family-related tasks (" +
      familyTasks.join(" and ") +
      ") are placed later in the day, assuming that on a school day they’re best handled when everyone’s available. ";
  }
  if (otherTasks.length > 0) {
    explanation +=
      "Other activities (" +
      otherTasks.join(" and ") +
      ") are interleaved to keep your day balanced. ";
  }
  explanation +=
    "This plan minimizes context switching and maximizes your energy levels throughout the day.";

  // Create a fun, simple visualization of the schedule
  let visualization = "Your Day at a Glance:\n";
  schedule.forEach((block) => {
    visualization += `${block.time}: ${block.task}\n`;
  });

  return { timeBlocks: schedule, explanation, visualization };
}

// Helper function: formats a 24h hour into a 12h AM/PM format string.
function formatTime(hour: number): string {
  if (hour === 0) return "12AM";
  if (hour < 12) return hour + "AM";
  if (hour === 12) return "12PM";
  return hour - 12 + "PM";
}
