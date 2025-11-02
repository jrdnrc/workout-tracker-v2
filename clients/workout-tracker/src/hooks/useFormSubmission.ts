import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function useFormSubmission<T>(
  onSubmit: (data: T) => Promise<void>,
  onSuccess?: () => void
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: T) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await onSubmit(data);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, error };
}

