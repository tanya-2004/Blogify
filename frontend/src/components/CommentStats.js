import React from 'react';
import PropTypes from 'prop-types';

export const CommentStats = ({ stats }) => (
  <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Object.entries(stats).map(([key, value]) => (
      <div
        key={key}
        className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-all duration-300"
      >
        <p className="text-lg font-semibold text-neutral-900">{value}</p>
        <p className="text-sm text-neutral-500 capitalize">{key}</p>
      </div>
    ))}
  </section>
);

CommentStats.propTypes = {
  stats: PropTypes.object.isRequired
};