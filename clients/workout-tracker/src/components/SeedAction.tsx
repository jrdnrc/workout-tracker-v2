import DevActionCard from './DevActionCard';
import { handleSuccess, handleError } from '../lib/errors';

interface SeedActionProps {
  title: string;
  description: string;
  confirmationMessage: string;
  successMessage: string;
  errorMessage: string;
  onSeed: () => Promise<any>;
  onRefetch: () => Promise<any>;
  isSeeding: boolean;
  setIsSeeding: (value: boolean) => void;
}

export default function SeedAction({
  title,
  description,
  confirmationMessage,
  successMessage,
  errorMessage,
  onSeed,
  onRefetch,
  isSeeding,
  setIsSeeding,
}: SeedActionProps) {
  const handleSeed = async () => {
    if (!confirm(confirmationMessage)) {
      return;
    }

    setIsSeeding(true);
    try {
      await onSeed();
      await onRefetch();
      handleSuccess(successMessage);
    } catch (error) {
      handleError(error, errorMessage);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <DevActionCard
      title={title}
      description={description}
      buttonLabel={`Seed ${title}`}
      loadingLabel="Seeding..."
      onClick={handleSeed}
      loading={isSeeding}
      variant="primary"
    />
  );
}

