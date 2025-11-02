interface EmptyStateProps {
  message: string;
  action?: React.ReactNode;
  description?: string;
  className?: string;
}

export default function EmptyState({ message, action, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`text-center py-8 ${className}`}>
      <p className="text-secondary-500 mb-4">{message}</p>
      {description && (
        <p className="text-sm text-secondary-600 mb-4">{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

