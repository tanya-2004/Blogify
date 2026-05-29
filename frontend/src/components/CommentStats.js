import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

const CommentStatsContent = ({ stats }) => {
  const theme = useTheme() || {
    spacing: { md: '16px' },
    borderRadius: { md: '8px' },
    colors: { background: '#fff', text: '#222', textLight: '#666' },
    shadows: { card: '0 2px 8px rgba(0,0,0,0.1)' }
  };

  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: theme.spacing.md
    }}>
      {Object.entries(stats).map(([key, value]) => (
        <div
          key={key}
          style={{
            backgroundColor: theme.colors.background,
            padding: theme.spacing.md,
            borderRadius: theme.borderRadius.md,
            boxShadow: theme.shadows.card,
            textAlign: 'center',
            transition: 'box-shadow 0.3s ease'
          }}
        >
          <p style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.text }}>
            {value}
          </p>
          <p style={{ fontSize: '14px', color: theme.colors.textLight, textTransform: 'capitalize' }}>
            {key}
          </p>
        </div>
      ))}
    </section>
  );
};

export const CommentStats = (props) => (
  <ErrorBoundary>
    <CommentStatsContent {...props} />
  </ErrorBoundary>
);

CommentStats.propTypes = {
  stats: PropTypes.object.isRequired
};