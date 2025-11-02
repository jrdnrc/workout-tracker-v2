interface DeleteButtonProps {
  onClick: () => void;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
  disabled?: boolean;
}

export default function DeleteButton({ onClick, label = 'Delete', size = 'sm', className = '', disabled }: DeleteButtonProps) {
  const sizeClasses = size === 'sm' ? 'text-sm' : 'text-base';
  
  return (
    <button
      onClick={onClick}
      className={`text-danger-600 hover:text-danger-700 ${sizeClasses} ${className}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

