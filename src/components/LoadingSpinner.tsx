interface LoadingSpinnerProps {
  message: string;
}

export default function LoadingSpinner({ message }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 mb-6">
        <svg 
          className="animate-spin w-full h-full text-indigo-600" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
          Optimizing your schedule...
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          {message}
        </p>
      </div>
    </div>
  );
} 