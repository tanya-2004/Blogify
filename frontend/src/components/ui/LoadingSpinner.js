export default function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        {/* Outer ring */}
        <div className={`${sizeClasses[size]} border-4 border-purple-200 rounded-full animate-spin`}>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner stars */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Floating stars around spinner */}
        <div className="absolute -top-2 -right-2 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-0 -left-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {message && (
        <p className="mt-4 text-purple-200 text-center animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
