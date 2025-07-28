import React from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';

export const CommentList = ({ comments = [], handlers = {} }) => {
  const {
    handleApprove,
    handleReject,
    handleDelete,
    handleReply,
    refreshComments 
  } = handlers;

  return (
    <section className="space-y-6">
      {comments.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg bg-white">
          <p className="text-lg font-semibold text-neutral-500">No comments</p>
          <p className="text-sm text-neutral-400">Try a different filter or wait for new comments</p>
        </div>
      ) : (
        comments.map(c => (
          <CommentCard
            key={c._id}
            comment={c}
            handleApprove={handleApprove}
            handleReject={handleReject}
            handleDelete={handleDelete}
            handleReply={handleReply}               
            onChange={refreshComments}              
          />
        ))
      )}
    </section>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  handlers: PropTypes.shape({
    handleApprove: PropTypes.func,
    handleReject: PropTypes.func,
    handleDelete: PropTypes.func,
    handleReply: PropTypes.func,
    refreshComments: PropTypes.func
  })
};