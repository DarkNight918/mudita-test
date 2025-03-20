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
 * Generates an optimized schedule based on provided tasks.
 * Each task is assigned to only one category, following the priority:
 * work > outdoor > family > other.
 *
 * Categories and their start times:
 * - Work tasks: starting at 11AM
 * - Outdoor tasks: starting at 1PM
 * - Other tasks: starting at 3PM
 * - Family tasks: starting at 4PM
 *
 * The function returns a schedule, an explanation of the reasoning,
 * and a fun text-based visualization.
 */
export function generateOptimizedSchedule(tasks: string[]): ScheduleResult {
  // Define keyword lists for classification
  const workKeywords = ["work", "meeting", "prepare"];
  const outdoorKeywords = ["run", "walk", "mow", "outside"];
  const familyKeywords = ["daughter", "son", "kid", "family"];

  // Helper functions to check if a task matches a category
  const matchesWork = (task: string) =>
    workKeywords.some((keyword) => task.toLowerCase().includes(keyword));
  const matchesOutdoor = (task: string) =>
    outdoorKeywords.some((keyword) => task.toLowerCase().includes(keyword));
  const matchesFamily = (task: string) =>
    familyKeywords.some((keyword) => task.toLowerCase().includes(keyword));

  // Categorize each task only once based on priority: work > outdoor > family > other
  const categorizedTasks = {
    work: [] as string[],
    outdoor: [] as string[],
    family: [] as string[],
    other: [] as string[],
  };

  tasks.forEach((task) => {
    if (matchesWork(task)) {
      categorizedTasks.work.push(task);
    } else if (matchesOutdoor(task)) {
      categorizedTasks.outdoor.push(task);
    } else if (matchesFamily(task)) {
      categorizedTasks.family.push(task);
    } else {
      categorizedTasks.other.push(task);
    }
  });

  // Build the schedule with specific time blocks for each category.
  const schedule: TimeBlock[] = [];
  let currentTime: number;

  // Work tasks starting at 11AM
  currentTime = 11;
  categorizedTasks.work.forEach((task) => {
    schedule.push({ time: formatTime(currentTime), task });
    currentTime++;
  });

  // Outdoor tasks starting at 1PM
  currentTime = Math.max(currentTime, 13);
  categorizedTasks.outdoor.forEach((task) => {
    schedule.push({ time: formatTime(currentTime), task });
    currentTime++;
  });

  // Other tasks starting at 3PM
  currentTime = Math.max(currentTime, 15);
  categorizedTasks.other.forEach((task) => {
    schedule.push({ time: formatTime(currentTime), task });
    currentTime++;
  });

  // Family tasks starting at 4PM
  currentTime = Math.max(currentTime, 16);
  categorizedTasks.family.forEach((task) => {
    schedule.push({ time: formatTime(currentTime), task });
    currentTime++;
  });

  // Generate an explanation for the schedule
  let explanation =
    "We've analyzed your tasks and created an optimized schedule for your day. ";
  if (categorizedTasks.work.length > 0) {
    explanation += `We think tasks like ${categorizedTasks.work.join(
      " and "
    )} are critical, so they’re scheduled in the late morning when your focus is highest. `;
  }
  if (categorizedTasks.outdoor.length > 0) {
    explanation += `Outdoor activities (${categorizedTasks.outdoor.join(
      " and "
    )}) are grouped in the early afternoon to take advantage of natural light and boost your energy. `;
  }
  if (categorizedTasks.family.length > 0) {
    explanation += `Family-related tasks (${categorizedTasks.family.join(
      " and "
    )}) are placed later in the day, assuming that on a school day they’re best handled when everyone’s available. `;
  }
  if (categorizedTasks.other.length > 0) {
    explanation += `Other activities (${categorizedTasks.other.join(
      " and "
    )}) are interleaved to keep your day balanced. `;
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

// Helper function: converts a 24-hour format hour into a 12-hour AM/PM format.
function formatTime(hour: number): string {
  if (hour === 0) return "12AM";
  if (hour < 12) return hour + "AM";
  if (hour === 12) return "12PM";
  return hour - 12 + "PM";
}
