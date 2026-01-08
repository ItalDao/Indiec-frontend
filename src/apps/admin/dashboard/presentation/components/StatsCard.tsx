interface StatsCardProps {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

export const StatsCard = ({ 
  label, 
  value, 
  icon, 
  change,
  variant = 'default' 
}: StatsCardProps) => {
  const variantColors = {
    default: { bg: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' },
    success: { bg: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' },
    warning: { bg: 'rgba(234, 179, 8, 0.15)', color: '#facc15' },
    danger: { bg: 'rgba(239, 68, 68, 0.15)', color: '#f87171' },
  };

  const colors = variantColors[variant];

  return (
    <div style={{
      background: 'var(--background-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      padding: '1.5rem',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
        {change && (
          <span style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            padding: '0.25rem 0.75rem',
            borderRadius: '999px',
            background: colors.bg,
            color: colors.color,
          }}>
            {change}
          </span>
        )}
      </div>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        marginBottom: '0.5rem',
      }}>
        {label}
      </p>
      <p style={{
        fontSize: '2rem',
        fontWeight: 'bold',
      }}>
        {value}
      </p>
    </div>
  );
};