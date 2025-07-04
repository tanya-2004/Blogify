import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import NewPostModal from '../../components/modals/NewPostModal';

export default function Comments() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, approved, spam

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      author: 'CosmicReader123',
      content: 'This is an amazing post! Really enjoyed the celestial theme and the way you explained the concepts.',
      post: 'Getting Started with React Hooks',
      date: '2024-01-15',
      status: 'approved',
      likes: 5
    },
    {
      id: 2,
      author: 'StarGazer_42',
      content: 'Could you elaborate more on the useEffect hook? I\'m still a bit confused about the dependency array.',
      post: 'Advanced React Patterns',
      date: '2024-01-14',
      status: 'pending',
      likes: 2
    },
    {
      id: 3,
      author: 'DevMaster99',
      content: 'Spam comment with lots of promotional content that should be filtered out automatically.',
      post: 'CSS Grid vs Flexbox',
      date: '2024-01-13',
      status: 'spam',
      likes: 0
    },
    {
      id: 4,
      author: 'QuantumCoder',
      content: 'Thank you for this tutorial! The examples were super clear and easy to follow.',
      post: 'Building Modern UIs',
      date: '2024-01-12',
      status: 'approved',
      likes: 8
    }
  ];

  const filteredComments = mockComments.filter(comment => 
    filter === 'all' || comment.status === filter
  );

  const CommentCard = ({ comment }) => (
    <Card className="comment-card hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="avatar avatar--gradient-purple">
            {comment.author[0].toUpperCase()}
          </div>
          <div>
            <Typography variant="body1" className="font-medium text-text-primary">
              {comment.author}
            </Typography>
            <Typography variant="caption" className="text-text-tertiary">
              {new Date(comment.date).toLocaleDateString()}
            </Typography>
          </div>
        </div>
        <span className={`status-badge status-badge--${comment.status}`}>
          {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
        </span>
      </div>

      <div className="mb-4">
        <Typography variant="body2" className="text-text-secondary mb-2">
          {comment.content}
        </Typography>
        <Typography variant="caption" className="text-text-tertiary">
          <span className="text-lg mr-1">📝</span> On: <strong>{comment.post}</strong>
        </Typography>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-text-tertiary">
          <span className="text-lg">❤️</span>
          <Typography variant="caption">{comment.likes} likes</Typography>
        </div>
        
        <div className="flex space-x-2">
          {comment.status === 'pending' && (
            <>
              <Button variant="success" size="small">
                ✅ Approve
              </Button>
              <Button variant="error" size="small">
                🚫 Reject
              </Button>
            </>
          )}
          <Button variant="outline" size="small">
            💬 Reply
          </Button>
          <Button variant="error" size="small">
            🗑️ Delete
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <Typography variant="h1" className="flex items-center space-x-3">
            <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Comments Manager</span>
          </Typography>
          <Typography variant="body2" className="text-text-secondary">
            Moderate and manage comments from your community
          </Typography>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="stat-card stat-card--primary">
            <div className="text-2xl mb-2">💬</div>
            <Typography variant="h2" className="text-white">
              {mockComments.length}
            </Typography>
            <Typography variant="caption" className="text-white/80">
              Total Comments
            </Typography>
          </Card>
          <Card className="stat-card stat-card--success">
            <div className="text-2xl mb-2">✅</div>
            <Typography variant="h2" className="text-white">
              {mockComments.filter(c => c.status === 'approved').length}
            </Typography>
            <Typography variant="caption" className="text-white/80">
              Approved
            </Typography>
          </Card>
          <Card className="stat-card stat-card--warning">
            <div className="text-2xl mb-2">⏳</div>
            <Typography variant="h2" className="text-white">
              {mockComments.filter(c => c.status === 'pending').length}
            </Typography>
            <Typography variant="caption" className="text-white/80">
              Pending
            </Typography>
          </Card>
          <Card className="stat-card stat-card--error">
            <div className="text-2xl mb-2">🚫</div>
            <Typography variant="h2" className="text-white">
              {mockComments.filter(c => c.status === 'spam').length}
            </Typography>
            <Typography variant="caption" className="text-white/80">
              Spam
            </Typography>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="filter-tabs">
            {[
              { key: 'all', label: 'All Comments', icon: '📋' },
              { key: 'pending', label: 'Pending', icon: '⏳' },
              { key: 'approved', label: 'Approved', icon: '✅' },
              { key: 'spam', label: 'Spam', icon: '🚫' }
            ].map(tab => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "primary" : "ghost"}
                onClick={() => setFilter(tab.key)}
                className="flex items-center space-x-2"
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {filteredComments.length === 0 ? (
            <Card className="text-center py-16">
              <div className="text-6xl mb-4">💭</div>
              <Typography variant="h3" className="mb-2">
                No comments in this category
              </Typography>
              <Typography variant="body2" className="text-text-secondary">
                Comments will appear here as your audience engages with your content.
              </Typography>
            </Card>
          ) : (
            filteredComments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          )}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <Typography variant="h3" className="mb-4 flex items-center space-x-2">
            <span>⚡</span>
            <span>Quick Actions</span>
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="success" className="quick-action-btn">
              <div className="text-2xl mb-2">✅</div>
              <div className="font-medium">Approve All Pending</div>
            </Button>
            <Button variant="error" className="quick-action-btn">
              <div className="text-2xl mb-2">🗑️</div>
              <div className="font-medium">Delete All Spam</div>
            </Button>
            <Button variant="outline" className="quick-action-btn">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-medium">Comment Settings</div>
            </Button>
          </div>
        </Card>
      </div>

      {showModal && <NewPostModal onClose={() => setShowModal(false)} />}
    </>
  );
}
