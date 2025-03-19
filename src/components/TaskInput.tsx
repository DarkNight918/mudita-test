"use client";

import { useState } from "react";

interface TaskInputProps {
  onSubmit: (tasks: string[]) => void;
}

export default function TaskInput({ onSubmit }: TaskInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTaskList([...taskList, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleRemoveTask = (index: number) => {
    setTaskList(taskList.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (taskList.length > 0) {
      onSubmit(taskList);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          What are your top priorities today?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Enter the tasks you want to accomplish and we'll help you organize them optimally.
        </p>
        
        <div className="flex space-y-2 sm:space-y-0 sm:space-x-2 flex-col sm:flex-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            placeholder="E.g., Go for a 20 minute run"
          />
          <button
            onClick={handleAddTask}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {taskList.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
            Your task list:
          </h3>
          <ul className="space-y-2 mb-4">
            {taskList.map((task, index) => (
              <li 
                key={index} 
                className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-md"
              >
                <span className="text-gray-800 dark:text-gray-200">{task}</span>
                <button 
                  onClick={() => handleRemoveTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Plan My Day
          </button>
        </div>
      )}
    </div>
  );
} 