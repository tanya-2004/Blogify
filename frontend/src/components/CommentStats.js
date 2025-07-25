import React from 'react';

export const CommentStats = ({ stats }) => (
  <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {Object.entries(stats).map(([key, value]) => (
      <div key={key} className="bg-white p-4 rounded-lg shadow-sm text-center">
        <p className="text-lg font-semibold">{value}</p>
        <p className="text-sm text-neutral-500 capitalize">{key}</p>
      </div>
    ))}
  </section>
);