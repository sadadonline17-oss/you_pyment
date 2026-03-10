import { Loader2 } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

const PageLoader = ({ message = 'جاري التحميل...' }: PageLoaderProps) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
      dir="rtl"
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Loader2 
              className="w-16 h-16 animate-spin"
              style={{ color: '#667eea' }}
            />
            <div 
              className="absolute inset-0 w-16 h-16 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #667eea20, #764ba220)',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }}
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {message}
        </h2>
        
        <p className="text-gray-600 text-sm">
          الرجاء الانتظار قليلاً...
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              background: '#667eea',
              animationDelay: '0ms'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              background: '#667eea',
              animationDelay: '150ms'
            }}
          />
          <div 
            className="w-2 h-2 rounded-full animate-bounce"
            style={{ 
              background: '#667eea',
              animationDelay: '300ms'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
