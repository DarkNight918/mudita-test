interface ScheduleDisplayProps {
  schedule: Array<{ time: string; task: string }>;
  explanation: string;
  onReset: () => void;
}

export default function ScheduleDisplay({ 
  schedule,
  explanation,
  onReset
}: ScheduleDisplayProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Your Optimized Schedule
        </h2>
        
        <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg mb-6">
          <p className="text-gray-700 dark:text-gray-300 italic">
            {explanation}
          </p>
        </div>
        
        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div 
              key={index}
              className="flex border-l-4 border-indigo-500 bg-white dark:bg-gray-700 rounded-r-md shadow-sm overflow-hidden"
            >
              <div className="bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 font-semibold px-4 py-3 flex items-center justify-center min-w-[100px]">
                {item.time}
              </div>
              <div className="px-4 py-3 flex-1">
                <p className="text-gray-800 dark:text-gray-200">
                  {item.task}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
      >
        Plan Another Day
      </button>
    </div>
  );
} 