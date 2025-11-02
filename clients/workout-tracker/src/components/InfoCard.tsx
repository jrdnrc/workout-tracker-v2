interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success';
  className?: string;
}

export default function InfoCard({ title, children, variant = 'info', className = '' }: InfoCardProps) {
  const variantClasses = {
    info: 'bg-primary-50 border-primary-200',
    warning: 'bg-warning-50 border-warning-200',
    success: 'bg-success-50 border-success-200',
  };

  const titleClasses = {
    info: 'text-primary-900',
    warning: 'text-warning-900',
    success: 'text-success-900',
  };

  const textClasses = {
    info: 'text-primary-800',
    warning: 'text-warning-800',
    success: 'text-success-800',
  };

  return (
    <div className={`card ${variantClasses[variant]} border-2 ${className}`}>
      <h2 className={`text-lg font-bold ${titleClasses[variant]} mb-2`}>{title}</h2>
      <p className={`text-sm ${textClasses[variant]}`}>
        {children}
      </p>
    </div>
  );
}

