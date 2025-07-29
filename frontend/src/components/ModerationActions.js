import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from './ui';

const ModerationActions = ({
  status,
  commentId,
  onApprove,
  onReject,
  onDelete,
  onReply,
  onChange
}) => {
  const [showReply, setShowReply] = useState(false);
  const [content, setContent] = useState('');

  const wrap = async (fn) => {
    if (fn) {
      await fn();
      if (onChange) onChange();
    }
  };

  const handleSubmitReply = async () => {
    if (!content.trim()) return;
    await wrap(() => onReply?.(commentId, content.trim()));
    setContent('');
    setShowReply(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {status === 'pending' && (
          <>
            <Button size="small" variant="primary" onClick={() => wrap(onApprove)}>Approve</Button>
            <Button size="small" variant="secondary" onClick={() => wrap(onReject)}>Reject</Button>
          </>
        )}
        <Button size="small" variant="secondary" onClick={() => setShowReply((prev) => !prev)}>Reply</Button>
        <Button size="small" variant="danger" onClick={() => wrap(onDelete)}>Delete</Button>
      </div>

      {showReply && (
        <div className="flex flex-col gap-2 border rounded p-3 bg-muted/30">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="text-sm border rounded px-2 py-1 w-full resize-none"
            rows={3}
            placeholder="Write your reply..."
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button size="small" variant="ghost" onClick={() => setShowReply(false)}>Cancel</Button>
            <Button size="small" variant="primary" onClick={handleSubmitReply}>Post Reply</Button>
          </div>
        </div>
      )}
    </div>
  );
};

ModerationActions.propTypes = {
  status: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  onApprove: PropTypes.func,
  onReject: PropTypes.func,
  onDelete: PropTypes.func,
  onReply: PropTypes.func,
  onChange: PropTypes.func
};

export default ModerationActions;