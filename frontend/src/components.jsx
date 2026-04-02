import React from 'react';
import { useTheme } from './ThemeProvider';
import { transitions, borderRadius, shadows } from './theme';

export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  children, 
  onClick,
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  const variants = {
    primary: {
      background: theme.primary,
      color: '#fff',
      hover: theme.primaryDark,
      border: 'none',
    },
    secondary: {
      background: theme.background.tertiary,
      color: theme.text.primary,
      hover: theme.background.elevated,
      border: `1px solid ${theme.border.medium}`,
    },
    ghost: {
      background: 'transparent',
      color: theme.text.primary,
      hover: theme.background.secondary,
      border: 'none',
    },
    danger: {
      background: theme.error,
      color: '#fff',
      hover: '#991b1b',
      border: 'none',
    },
    success: {
      background: theme.success,
      color: '#fff',
      hover: '#065f46',
      border: 'none',
    },
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '12px' },
    md: { padding: '10px 16px', fontSize: '14px' },
    lg: { padding: '12px 20px', fontSize: '16px' },
    xl: { padding: '14px 24px', fontSize: '16px' },
  };

  const variant_style = variants[variant];
  const size_style = sizes[size];

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={className}
      style={{
        background: variant_style.background,
        color: variant_style.color,
        border: variant_style.border,
        padding: size_style.padding,
        fontSize: size_style.fontSize,
        fontWeight: 500,
        borderRadius: borderRadius.base,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: transitions.fast,
        opacity: disabled ? 0.6 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: shadows.sm,
        ...props.style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.target.style.background = variant_style.hover;
          e.target.style.boxShadow = shadows.md;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.target.style.background = variant_style.background;
          e.target.style.boxShadow = shadows.sm;
        }
      }}
    >
      {loading && (
        <span style={{
          display: 'inline-block',
          width: '14px',
          height: '14px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTop: '2px solid #fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      )}
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', elevated = false, ...props }) => {
  const { theme } = useTheme();

  return (
    <div
      className={className}
      style={{
        background: theme.background.secondary,
        border: `1px solid ${theme.border.light}`,
        borderRadius: borderRadius.lg,
        padding: '20px',
        boxShadow: elevated ? shadows.lg : shadows.base,
        transition: transitions.fast,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export const Input = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  disabled = false,
  error = false,
  errorMessage = '',
  label = '',
  className = '',
  ...props 
}) => {
  const { theme } = useTheme();

  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          color: theme.text.primary,
          fontSize: '14px',
          fontWeight: 500,
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={className}
        style={{
          width: '100%',
          padding: '10px 12px',
          fontSize: '14px',
          background: theme.background.elevated,
          color: theme.text.primary,
          border: `1px solid ${error ? theme.error : theme.border.medium}`,
          borderRadius: borderRadius.base,
          transition: transitions.fast,
          boxSizing: 'border-box',
          opacity: disabled ? 0.6 : 1,
          ...props.style,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = theme.primary;
          e.target.style.boxShadow = `0 0 0 3px ${theme.primary}33`;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = error ? theme.error : theme.border.medium;
          e.target.style.boxShadow = 'none';
        }}
      />
      {error && errorMessage && (
        <p style={{ color: theme.error, fontSize: '12px', marginTop: '4px', margin: '4px 0 0 0' }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const { theme } = useTheme();

  const variants = {
    default: { bg: theme.background.tertiary, color: theme.text.primary },
    primary: { bg: `${theme.primary}20`, color: theme.primary },
    success: { bg: `${theme.success}20`, color: theme.success },
    warning: { bg: `${theme.warning}20`, color: theme.warning },
    error: { bg: `${theme.error}20`, color: theme.error },
  };

  const style = variants[variant] || variants.default;

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: borderRadius.full,
        background: style.bg,
        color: style.color,
        fontSize: '12px',
        fontWeight: 500,
        ...props.style,
      }}
    >
      {children}
    </span>
  );
};

export const Alert = ({ type = 'info', title, message, onClose, className = '', ...props }) => {
  const { theme } = useTheme();

  const types = {
    info: { bg: `${theme.info}20`, border: theme.info, icon: 'ℹ️' },
    success: { bg: `${theme.success}20`, border: theme.success, icon: '✓' },
    warning: { bg: `${theme.warning}20`, border: theme.warning, icon: '⚠️' },
    error: { bg: `${theme.error}20`, border: theme.error, icon: '✕' },
  };

  const style = types[type];

  return (
    <div
      className={className}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: borderRadius.lg,
        padding: '12px 16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        ...props.style,
      }}
    >
      <span style={{ fontSize: '18px', marginTop: '2px' }}>{style.icon}</span>
      <div style={{ flex: 1 }}>
        {title && <strong style={{ color: theme.text.primary, display: 'block', marginBottom: '4px' }}>{title}</strong>}
        <p style={{ color: theme.text.primary, margin: 0, fontSize: '14px' }}>{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: theme.text.secondary,
            cursor: 'pointer',
            fontSize: '18px',
            padding: 0,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export const Spinner = ({ size = 'md', className = '' }) => {
  const { theme } = useTheme();

  const sizes = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  return (
    <div
      className={className}
      style={{
        width: sizes[size],
        height: sizes[size],
        border: `3px solid ${theme.border.light}`,
        borderTop: `3px solid ${theme.primary}`,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
};

export const Modal = ({ isOpen, title, children, onClose, actions = null, className = '' }) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: theme.overlay,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050,
          animation: 'fadeIn 200ms ease-in-out',
        }}
      />
      <div
        className={className}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: theme.background.secondary,
          border: `1px solid ${theme.border.medium}`,
          borderRadius: borderRadius.xl,
          boxShadow: shadows.xl,
          maxWidth: '500px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto',
          zIndex: 1051,
          animation: 'slideIn 300ms ease-out',
        }}
      >
        <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border.light}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: theme.text.primary, fontSize: '20px', fontWeight: 600 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: theme.text.secondary,
              cursor: 'pointer',
              fontSize: '24px',
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>
        <div style={{ padding: '20px' }}>
          {children}
        </div>
        {actions && (
          <div style={{ padding: '16px 20px', borderTop: `1px solid ${theme.border.light}`, display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {actions}
          </div>
        )}
      </div>
    </>
  );
};

export const Table = ({ columns, data, className = '' }) => {
  const { theme } = useTheme();

  return (
    <div style={{ overflowX: 'auto' }}>
      <table
        className={className}
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
        }}
      >
        <thead>
          <tr style={{ borderBottom: `1px solid ${theme.border.medium}`, background: theme.background.tertiary }}>
            {columns.map(col => (
              <th
                key={col.key}
                style={{
                  padding: '12px 16px',
                  textAlign: 'left',
                  color: theme.text.secondary,
                  fontWeight: 600,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              style={{
                borderBottom: `1px solid ${theme.border.light}`,
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => e.target.parentElement.style.background = theme.background.tertiary}
              onMouseLeave={(e) => e.target.parentElement.style.background = 'transparent'}
            >
              {columns.map(col => (
                <td
                  key={col.key}
                  style={{
                    padding: '12px 16px',
                    color: theme.text.primary,
                  }}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Add keyframe animations to document
const styles = document.createElement('style');
styles.innerHTML = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;
document.head.appendChild(styles);
