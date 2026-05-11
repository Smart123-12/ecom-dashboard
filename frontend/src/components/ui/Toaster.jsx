import { useToastStore } from '../../lib/store';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  error:   <AlertCircle size={18} className="text-red-500" />,
  info:    <Info size={18} className="text-blue-500" />,
};

export const Toaster = () => {
  const { toasts, removeToast } = useToastStore();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 px-4 py-3 rounded-xl shadow-lg min-w-[280px] animate-slide-in"
        >
          {icons[toast.type] || icons.info}
          <span className="flex-1 text-sm font-medium">{toast.message}</span>
          <button onClick={() => removeToast(toast.id)} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
