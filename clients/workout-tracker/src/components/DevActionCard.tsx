import React from 'react';

interface DevActionCardProps {
  title: string;
  description?: string;
  count?: number;
  countLabel?: string;
  buttonLabel: string;
  loadingLabel?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'danger' | 'primary';
}

export default function DevActionCard({
  title,
  description,
  count,
  countLabel,
  buttonLabel,
  loadingLabel,
  onClick,
  disabled = false,
  loading = false,
  variant = 'danger',
}: DevActionCardProps) {
  const buttonClass = variant === 'danger' ? 'btn-secondary' : 'btn-primary';

  return (
    <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg">
      <div>
        <h3 className="font-medium text-secondary-900">{title}</h3>
        {description && (
          <p className="text-sm text-secondary-600">{description}</p>
        )}
        {count !== undefined && (
          <p className="text-sm text-secondary-600">
            {count} {countLabel || 'items'}
          </p>
        )}
      </div>
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={buttonClass}
      >
        {loading ? (loadingLabel || 'Loading...') : buttonLabel}
      </button>
    </div>
  );
}

