import DevActionCard from './DevActionCard';
import { handleSuccess, handleError } from '../lib/errors';

interface DeleteAllActionProps {
  title: string;
  count: number;
  countLabel: string;
  confirmationMessage: string;
  successMessage: string;
  errorMessage: string;
  onDelete: () => Promise<void>;
  onRefetch: () => Promise<any>;
  isDeleting: boolean;
  setIsDeleting: (value: boolean) => void;
}

export default function DeleteAllAction({
  title,
  count,
  countLabel,
  confirmationMessage,
  successMessage,
  errorMessage,
  onDelete,
  onRefetch,
  isDeleting,
  setIsDeleting,
}: DeleteAllActionProps) {
  const handleDelete = async () => {
    if (!confirm(confirmationMessage)) {
      return;
    }

    if (count === 0) return;

    setIsDeleting(true);
    try {
      await onDelete();
      await onRefetch();
      handleSuccess(successMessage);
    } catch (error) {
      handleError(error, errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DevActionCard
      title={title}
      count={count}
      countLabel={countLabel}
      buttonLabel="Delete All"
      loadingLabel="Deleting..."
      onClick={handleDelete}
      disabled={count === 0}
      loading={isDeleting}
      variant="danger"
    />
  );
}

