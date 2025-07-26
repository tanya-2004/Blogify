import React from 'react';
import CommentCard from './CommentCard';

export const CommentList = ({ comments, handlers }) => {
  return (
    <section className="space-y-6">
      {comments.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg bg-white">
          <p className="text-lg font-semibold text-neutral-500">No comments</p>
          <p className="text-sm text-neutral-400">Try a different filter or wait for new comments</p>
        </div>
      ) : (
        comments.map(c => (
          <CommentCard key={c.id} comment={c} {...handlers} />
        ))
      )}
    </section>
  );
};