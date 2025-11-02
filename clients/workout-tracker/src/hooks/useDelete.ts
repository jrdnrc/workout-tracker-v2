import { useState } from 'react';
import { toast } from 'react-hot-toast';

export function useDelete(
  mutation: (id: string) => Promise<void>,
  onSuccess?: () => void
) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string, name: string, confirmationMessage: string) => {
    if (!window.confirm(confirmationMessage)) return;
    
    setIsDeleting(true);
    try {
      await mutation(id);
      toast.success(`Successfully deleted ${name}`);
      onSuccess?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete';
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}

