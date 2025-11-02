interface LoadingStateProps {
  message?: string;
  className?: string;
}

export default function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <p className={`text-secondary-500 ${className}`}>{message}</p>
  );
}

