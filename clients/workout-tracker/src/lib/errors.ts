import toast from 'react-hot-toast';

export const handleError = (error: unknown, defaultMessage: string) => {
  const message = error instanceof Error ? error.message : defaultMessage;
  toast.error(message);
  console.error(defaultMessage, error);
};

export const handleSuccess = (message: string) => {
  toast.success(message);
};

export const handleInfo = (message: string) => {
  toast(message, {
    icon: 'ℹ️',
  });
};

