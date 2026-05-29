import React from 'react';
import Typography from '../../components/ui/Typography';
import { useComments } from '../../hooks/useComments';
import { CommentStats } from '../../components/CommentStats';
import { CommentFilter } from '../../components/CommentFilter';
import { CommentList } from '../../components/CommentList';

export default function Comments() {
  const {
    comments,
    filter,
    setFilter,
    loading,
    stats,
    handleApprove,
    handleReject,
    handleDelete,
    handleReply,
    refreshAllComments 
  } = useComments();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10 bg-neutral-50 text-neutral-900">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3 text-3xl font-bold">
            <svg className="w-8 h-8 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8m-8 4h4m-6 4l-2 2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H8z" />
            </svg>
            Comments Manager
          </div>
          <p className="text-sm text-neutral-600 mt-1">
            Moderate and manage comments from your blog
          </p>
        </div>
        <button
          onClick={refreshAllComments}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Refresh Comments
        </button>
      </div>

      {/* Filters */}
      <CommentFilter filter={filter} setFilter={setFilter} />

      {/* Stats */}
      <CommentStats stats={stats} />

      {/* Comment List */}
      {loading ? (
        <div className="text-center py-12">
          <Typography variant="body1" className="text-neutral-500">
            Loading comments...
          </Typography>
        </div>
      ) : (
        <CommentList
          comments={comments}
          handlers={{ handleApprove, handleReject, handleDelete, handleReply }}
        />
      )}
    </div>
  );
}