import { FaTimes } from 'react-icons/fa';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage = ({ message, onClose }: ErrorMessageProps) => {
  return (
    <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded shadow-lg flex items-center gap-3 max-w-md z-50">
      <span className="flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-red-700 hover:text-red-900"
        aria-label="Close error message"
      >
        <FaTimes />
      </button>
    </div>
  );
};
