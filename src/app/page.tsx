"use client";

import { useState } from "react";
import Image from "next/image";
import TaskInput from "@/components/TaskInput";
import LoadingSpinner from "@/components/LoadingSpinner";
import ScheduleDisplay from "@/components/ScheduleDisplay";
import { generateOptimizedSchedule } from "@/utils/mockLLM";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [schedule, setSchedule] = useState<null | {
    timeBlocks: { time: string; task: string }[];
    explanation: string;
  }>(null);

  const handleSubmitTasks = async (taskList: string[]) => {
    setTasks(taskList);
    setIsProcessing(true);
    
    // Simulate API call to LLM
    setTimeout(() => {
      const optimizedSchedule = generateOptimizedSchedule(taskList);
      setSchedule(optimizedSchedule);
      setIsProcessing(false);
    }, 3000); // 3 second mock processing time
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-indigo-800 dark:text-indigo-300 mb-2">
            Daily Planner
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Let's organize your day for maximum productivity
          </p>
        </header>

        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {!isProcessing && !schedule && (
            <TaskInput onSubmit={handleSubmitTasks} />
          )}
          
          {isProcessing && (
            <LoadingSpinner message="Our AI is crafting your perfect schedule..." />
          )}
          
          {!isProcessing && schedule && (
            <ScheduleDisplay 
              schedule={schedule.timeBlocks} 
              explanation={schedule.explanation}
              onReset={() => {
                setSchedule(null);
                setTasks([]);
              }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
