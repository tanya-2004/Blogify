import React from 'react';
import Button from './ui/Button';

export const CommentFilter = ({ filter, setFilter }) => {
  const filters = ['all', 'pending', 'approved', 'spam'];
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map(status => (
        <Button
          key={status}
          variant={filter === status ? 'primary' : 'secondary'}
          onClick={() => setFilter(status)}
          className="text-sm px-4 py-1.5"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Button>
      ))}
    </div>
  );
};