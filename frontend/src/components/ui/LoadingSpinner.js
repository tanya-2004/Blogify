import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../contexts/ThemeContext';

export default function LoadingSpinner({ size = 'medium', message = 'Loading...' }) {
  const { primaryColor, fontSize, selectedTheme } = useContext(ThemeContext);

  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const ringSize = sizeClasses[size] || sizeClasses['medium'];

  const containerClasses = [
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'py-8',
    selectedTheme.bg,
    selectedTheme.text
  ].filter(Boolean).join(' ');

  const safePrimary = primaryColor || 'var(--color-primary-default)';

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label={message}
      data-testid="loading-spinner"
      style={{ fontSize: `var(--font-size-${fontSize})` }}
    >
      <div className="relative">
        <div
          className={`${ringSize} border-4 border-opacity-30 rounded-full animate-spin`}
          style={{ borderColor: safePrimary }}
        >
          <div
            className="absolute inset-0 border-4 border-transparent rounded-full animate-spin"
            style={{ borderTopColor: safePrimary }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        </div>

        <div className="absolute -top-2 -right-2 w-1 h-1 bg-pink-400 rounded-full animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-0 -left-3 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {message && (
        <p
          className="mt-4 text-center animate-pulse"
          style={{ color: safePrimary }}
          data-testid="loading-message"
        >
          {message}
        </p>
      )}
    </div>
  );
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  message: PropTypes.string
};