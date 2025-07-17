import { useState } from 'react';
import { Button, Typography } from '../../components';

/**
 * Comments Page Component
 * 
 * Dashboard page for managing blog comments with consistent styling
 * Features semantic class names, proper status management, and premium UI
 */
export default function Comments() {
  const [filter, setFilter] = useState('all'); // all, pending, approved, spam

  // Mock comments data with enhanced information
  const mockComments = [
    {
      id: 1,
      author: 'CosmicReader123',
      content: 'This is an amazing post! Really enjoyed the celestial theme and the way you explained the concepts. The examples were super clear and easy to follow.',
      post: 'Getting Started with React Hooks',
      date: '2024-01-15',
      status: 'approved',
      likes: 5,
      email: 'cosmic@example.com',
      replies: 2
    },
    {
      id: 2,
      author: 'StarGazer_42',
      content: 'Could you elaborate more on the useEffect hook? I\'m still a bit confused about the dependency array and when it should be used.',
      post: 'Advanced React Patterns',
      date: '2024-01-14',
      status: 'pending',
      likes: 2,
      email: 'stargazer@example.com',
      replies: 0
    },
    {
      id: 3,
      author: 'DevMaster99',
      content: 'Spam comment with lots of promotional content that should be filtered out automatically. Check out my website for amazing deals!',
      post: 'CSS Grid vs Flexbox',
      date: '2024-01-13',
      status: 'spam',
      likes: 0,
      email: 'spam@example.com',
      replies: 0
    },
    {
      id: 4,
      author: 'QuantumCoder',
      content: 'Thank you for this tutorial! The examples were super clear and easy to follow. Looking forward to more content like this.',
      post: 'Building Modern UIs',
      date: '2024-01-12',
      status: 'approved',
      likes: 8,
      email: 'quantum@example.com',
      replies: 1
    }
  ];

  const filteredComments = mockComments.filter(comment => 
    filter === 'all' || comment.status === filter
  );

  const handleApprove = (commentId) => {
    console.log('Approving comment:', commentId);
    // Add API call here
  };

  const handleReject = (commentId) => {
    console.log('Rejecting comment:', commentId);
    // Add API call here
  };

  const handleDelete = (commentId) => {
    console.log('Deleting comment:', commentId);
    // Add API call here
  };

  const CommentCard = ({ comment }) => (
    <article className="blog-card-glassmorphic comments-comment-card">
      <div className="blog-card-content comments-card-content">
        
        {/* Comment Header */}
        <header className="comments-card-header">
          <div className="comments-author-section">
            <div className="comments-author-avatar">
              <span className="comments-avatar-initial">{comment.author[0].toUpperCase()}</span>
            </div>
            <div className="comments-author-info">
              <Typography variant="body1" className="comments-author-name dashboard-heading-text">
                {comment.author}
              </Typography>
              <Typography variant="caption" className="comments-date-text text-always-dark">
                {new Date(comment.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </Typography>
            </div>
          </div>
          <div className="comments-status-section">
            <span className={`comments-status-badge comments-status-${comment.status}`}>
              {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
            </span>
          </div>
        </header>

        {/* Comment Content */}
        <main className="comments-card-body">
          <Typography variant="body2" className="comments-content-text text-always-dark">
            {comment.content}
          </Typography>
          <div className="comments-post-reference">
            <svg className="comments-post-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <Typography variant="caption" className="comments-post-text text-always-dark">
              On: <strong>{comment.post}</strong>
            </Typography>
          </div>
        </main>

        {/* Comment Footer */}
        <footer className="comments-card-footer">
          <div className="comments-engagement-section">
            <div className="comments-likes-count">
              <svg className="comments-like-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <Typography variant="caption" className="comments-likes-text">{comment.likes} likes</Typography>
            </div>
            {comment.replies > 0 && (
              <div className="comments-replies-count">
                <svg className="comments-reply-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <Typography variant="caption" className="comments-replies-text">{comment.replies} replies</Typography>
              </div>
            )}
          </div>
          
          <div className="comments-actions-section">
            {comment.status === 'pending' && (
              <>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => handleApprove(comment.id)}
                  className="blog-button-primary-action comments-approve-btn"
                  leftIcon={
                    <svg className="comments-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  }
                >
                  Approve
                </Button>
                <Button 
                  variant="secondary" 
                  size="small"
                  onClick={() => handleReject(comment.id)}
                  className="blog-button-secondary-action comments-reject-btn"
                  leftIcon={
                    <svg className="comments-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  }
                >
                  Reject
                </Button>
              </>
            )}
            <Button 
              variant="secondary" 
              size="small"
              className="blog-button-secondary-action comments-reply-btn"
              leftIcon={
                <svg className="comments-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              }
            >
              Reply
            </Button>
            <Button 
              variant="secondary" 
              size="small"
              onClick={() => handleDelete(comment.id)}
              className="blog-button-delete-action comments-delete-btn"
              leftIcon={
                <svg className="comments-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              Delete
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );

  return (
    <div className="dashboard-container">
      
      {/* Comments Page Header */}
      <header className="dashboard-header">
        <Typography variant="h1" className="dashboard-heading-text dashboard-title-wrapper">
          <div className="dashboard-icon-wrapper">
            <svg className="dashboard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="dashboard-title-text">Comments Manager</span>
        </Typography>
        <Typography variant="body2" className="dashboard-subtitle-text">
          Moderate and manage comments from your community
        </Typography>
      </header>

      {/* Comments Statistics Section */}
      <section className="dashboard-stats-section comments-stats-section">
        
        {/* Total Comments Card */}
        <div className="blog-card-glassmorphic dashboard-stats-card comments-stats-total">
          <div className="dashboard-stats-card-content">
            <div className="dashboard-stats-icon-wrapper comments-stats-total-icon">
              <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="dashboard-stats-text-wrapper">
              <Typography variant="h3" className="dashboard-stats-number text-always-dark">
                {mockComments.length}
              </Typography>
              <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                Total Comments
              </Typography>
            </div>
          </div>
        </div>

        {/* Approved Comments Card */}
        <div className="blog-card-glassmorphic dashboard-stats-card comments-stats-approved">
          <div className="dashboard-stats-card-content">
            <div className="dashboard-stats-icon-wrapper comments-stats-approved-icon">
              <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="dashboard-stats-text-wrapper">
              <Typography variant="h3" className="dashboard-stats-number text-always-dark">
                {mockComments.filter(c => c.status === 'approved').length}
              </Typography>
              <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                Approved
              </Typography>
            </div>
          </div>
        </div>

        {/* Pending Comments Card */}
        <div className="blog-card-glassmorphic dashboard-stats-card comments-stats-pending">
          <div className="dashboard-stats-card-content">
            <div className="dashboard-stats-icon-wrapper comments-stats-pending-icon">
              <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="dashboard-stats-text-wrapper">
              <Typography variant="h3" className="dashboard-stats-number text-always-dark">
                {mockComments.filter(c => c.status === 'pending').length}
              </Typography>
              <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                Pending
              </Typography>
            </div>
          </div>
        </div>

        {/* Spam Comments Card */}
        <div className="blog-card-glassmorphic dashboard-stats-card comments-stats-spam">
          <div className="dashboard-stats-card-content">
            <div className="dashboard-stats-icon-wrapper comments-stats-spam-icon">
              <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
              </svg>
            </div>
            <div className="dashboard-stats-text-wrapper">
              <Typography variant="h3" className="dashboard-stats-number text-always-dark">
                {mockComments.filter(c => c.status === 'spam').length}
              </Typography>
              <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                Spam
              </Typography>
            </div>
          </div>
        </div>
      </section>

      {/* Comments Filter Section */}
      <section className="comments-filter-section">
        <div className="comments-filter-tabs">
          {[
            { key: 'all', label: 'All Comments', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
            { key: 'pending', label: 'Pending', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { key: 'approved', label: 'Approved', icon: 'M5 13l4 4L19 7' },
            { key: 'spam', label: 'Spam', icon: 'M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728' }
          ].map(tab => (
            <Button
              key={tab.key}
              variant={filter === tab.key ? "primary" : "secondary"}
              onClick={() => setFilter(tab.key)}
              className={`comments-filter-tab ${filter === tab.key ? 'comments-filter-tab-active' : ''}`}
              leftIcon={
                <svg className="comments-filter-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                </svg>
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Comments List Section */}
      <section className="comments-list-section">
        {filteredComments.length === 0 ? (
          <div className="blog-card-glassmorphic comments-empty-state">
            <div className="comments-empty-content">
              <div className="comments-empty-icon-wrapper">
                <svg className="comments-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <Typography variant="h3" className="comments-empty-title dashboard-heading-text">
                No comments in this category
              </Typography>
              <Typography variant="body2" className="comments-empty-description text-always-dark">
                Comments will appear here as your audience engages with your content.
              </Typography>
            </div>
          </div>
        ) : (
          <div className="comments-list-container">
            {filteredComments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </section>

      {/* Quick Actions Section */}
      <section className="comments-quick-actions-section">
        <div className="blog-card-glassmorphic comments-quick-actions-card">
          <div className="blog-card-content">
            <Typography variant="h3" className="comments-quick-actions-title dashboard-heading-text">
              <svg className="comments-quick-actions-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Actions
            </Typography>
            <div className="comments-quick-actions-grid">
              <Button 
                variant="primary" 
                className="comments-quick-action-btn comments-approve-all-btn"
                leftIcon={
                  <svg className="comments-quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                }
              >
                <div className="comments-quick-action-content">
                  <div className="comments-quick-action-title">Approve All Pending</div>
                  <div className="comments-quick-action-subtitle">Approve all pending comments</div>
                </div>
              </Button>
              <Button 
                variant="secondary" 
                className="comments-quick-action-btn comments-delete-spam-btn"
                leftIcon={
                  <svg className="comments-quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                }
              >
                <div className="comments-quick-action-content">
                  <div className="comments-quick-action-title">Delete All Spam</div>
                  <div className="comments-quick-action-subtitle">Remove all spam comments</div>
                </div>
              </Button>
              <Button 
                variant="secondary" 
                className="comments-quick-action-btn comments-settings-btn"
                leftIcon={
                  <svg className="comments-quick-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
              >
                <div className="comments-quick-action-content">
                  <div className="comments-quick-action-title">Comment Settings</div>
                  <div className="comments-quick-action-subtitle">Manage comment preferences</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
