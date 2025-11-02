interface StatsCardProps {
  label: string;
  value: string | number;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function StatsCard({ label, value, variant = 'primary', className = '' }: StatsCardProps) {
  const valueColor = variant === 'primary' ? 'text-primary-600' : 'text-secondary-600';
  
  return (
    <div className={`card ${className}`}>
      <h3 className="text-sm font-medium text-secondary-500">{label}</h3>
      <p className={`mt-2 text-3xl font-bold ${valueColor}`}>
        {value}
      </p>
    </div>
  );
}

