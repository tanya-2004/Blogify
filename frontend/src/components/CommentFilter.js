import React from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui';
import { useTheme } from '../contexts/ThemeContext';
import ErrorBoundary from './ErrorBoundary';

const CommentFilterContent = ({ filter, setFilter }) => {
  const theme = useTheme() || {
    spacing: {
      sm: '8px',
      md: '16px'
    },
    borderRadius: {
      sm: '6px'
    }
  };

  const filters = ['all', 'pending', 'approved', 'spam'];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: theme.spacing.md }}>
      {filters.map(status => (
        <Button
          key={status}
          variant={filter === status ? 'primary' : 'secondary'}
          onClick={() => setFilter(status)}
          style={{
            fontSize: '14px',
            padding: `${theme.spacing.sm} ${theme.spacing.md}`,
            borderRadius: theme.borderRadius.sm
          }}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      ))}
    </div>
  );
};

export const CommentFilter = (props) => (
  <ErrorBoundary>
    <CommentFilterContent {...props} />
  </ErrorBoundary>
);

CommentFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
};