import { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { NewPostModal, Button, Typography } from '../../components';

function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = () => {
    API.get('/posts/mine')
      .then((res) => setMyPosts(res.data))
      .catch(() => setMyPosts([]));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeletingId(id);
    try {
      await API.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      alert('Failed to delete post');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <>
      {/* Main Dashboard Container */}
      <div className="dashboard-container">
        
        {/* Dashboard Header Section */}
        <header className="dashboard-header">
          <Typography 
            variant="h1" 
            weight="light" 
            className="dashboard-heading-text dashboard-title-wrapper"
          >
            <div className="dashboard-icon-wrapper">
              <svg className="dashboard-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="dashboard-title-text">Content Hub</span>
          </Typography>
          <Typography variant="body2" className="dashboard-subtitle-text">
            Craft, manage, and track your stories with our premium blogging platform
          </Typography>
        </header>
        
        {/* Empty State - No Posts */}
        {myPosts.length === 0 ? (
          <div className="blog-card-glassmorphic dashboard-empty-state">
            <div className="dashboard-empty-state-content">
              
              {/* Empty State Icon */}
              <div className="dashboard-empty-state-icon-container">
                <div className="dashboard-empty-state-icon-wrapper">
                  <svg className="dashboard-empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                {/* Decorative floating elements */}
                <div className="dashboard-empty-state-decoration dashboard-empty-state-decoration-1"></div>
                <div className="dashboard-empty-state-decoration dashboard-empty-state-decoration-2"></div>
              </div>
              
              {/* Empty State Text */}
              <Typography variant="h2" weight="bold" className="dashboard-heading-text dashboard-empty-state-title">
                Your Creative Journey Begins
              </Typography>
              <Typography variant="body1" className="dashboard-subtitle-text dashboard-empty-state-description">
                Transform your ideas into captivating stories. Start crafting your first masterpiece today.
              </Typography>
              
              {/* Create First Post Button */}
              <Button
                variant="primary"
                size="large"
                onClick={() => setShowModal(true)}
                className="blog-button-primary-action blog-button-large-cta dashboard-create-first-post-btn"
              >
                Create Your First Story
              </Button>
            </div>
          </div>
        ) : (
          <div className="dashboard-content-section">
            
            {/* Dashboard Statistics Overview */}
            <section className="dashboard-stats-section">
              
              {/* Posts Count Card */}
              <div className="blog-card-glassmorphic dashboard-stats-card dashboard-stats-posts">
                <div className="dashboard-stats-card-content">
                  <div className="dashboard-stats-icon-wrapper dashboard-stats-posts-icon">
                    <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="dashboard-stats-text-wrapper">
                    <Typography variant="h3" weight="bold" className="dashboard-stats-number text-always-dark">
                      {myPosts.length}
                    </Typography>
                    <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                      Published Stories
                    </Typography>
                  </div>
                </div>
              </div>
              
              {/* Views Count Card */}
              <div className="blog-card-glassmorphic dashboard-stats-card dashboard-stats-views">
                <div className="dashboard-stats-card-content">
                  <div className="dashboard-stats-icon-wrapper dashboard-stats-views-icon">
                    <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="dashboard-stats-text-wrapper">
                    <Typography variant="title" weight="bold" className="dashboard-stats-number text-always-dark">
                      {Math.floor(Math.random() * 500) + 100}
                    </Typography>
                    <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                      Total Views
                    </Typography>
                  </div>
                </div>
              </div>
              
              {/* Likes Count Card */}
              <div className="blog-card-glassmorphic dashboard-stats-card dashboard-stats-likes">
                <div className="dashboard-stats-card-content">
                  <div className="dashboard-stats-icon-wrapper dashboard-stats-likes-icon">
                    <svg className="dashboard-stats-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="dashboard-stats-text-wrapper">
                    <Typography variant="title" weight="bold" className="dashboard-stats-number text-always-dark">
                      {Math.floor(Math.random() * 50) + 20}
                    </Typography>
                    <Typography variant="caption" className="dashboard-stats-label text-always-dark">
                      Total Likes
                    </Typography>
                  </div>
                </div>
              </div>
            </section>            
            {/* Blog Posts Grid Section */}
            <section className="dashboard-posts-section">
              {myPosts.map((post, index) => (
                <article
                  key={post._id}
                  className="blog-card-glassmorphic dashboard-post-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="blog-card-content dashboard-post-card-content">
                    
                    {/* Post Content Area */}
                    <div className="dashboard-post-content-area">
                      
                      {/* Post Title */}
                      <Typography
                        variant="title"
                        weight="bold"
                        className="dashboard-heading-text dashboard-post-title blog-content-readable-text"
                      >
                        {post.title}
                      </Typography>
                      
                      {/* Post Metadata */}
                      <div className="dashboard-post-metadata">
                        <div className="dashboard-post-meta-item">
                          <svg className="dashboard-post-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="dashboard-post-meta-text">{new Date(post.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="dashboard-post-meta-item">
                          <svg className="dashboard-post-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="dashboard-post-meta-text">{Math.ceil(post.content.length / 250)} min read</span>
                        </div>
                      </div>
                      
                      {/* Post Excerpt */}
                      <Typography variant="body" className="dashboard-post-excerpt text-always-dark">
                        {post.content.slice(0, 200)}...
                      </Typography>
                      
                      {/* Post Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="dashboard-post-tags-section">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span 
                              key={i} 
                              className="dashboard-post-tag"
                            >
                              #{tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="dashboard-post-tag-overflow">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {/* Post Action Buttons */}
                    <div className="dashboard-post-actions">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleEdit(post._id)}
                        className="blog-button-primary-action dashboard-edit-btn"
                        leftIcon={
                          <svg className="dashboard-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        }
                      >
                        Edit
                      </Button>
                      
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleDelete(post._id)}
                        disabled={deletingId === post._id}
                        className="blog-button-delete-action dashboard-delete-btn"
                        leftIcon={
                          deletingId === post._id ? (
                            <svg className="dashboard-action-icon dashboard-loading-icon" fill="none" viewBox="0 0 24 24">
                              <circle className="dashboard-loading-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="dashboard-loading-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="dashboard-action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )
                        }
                      >
                        {deletingId === post._id ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            
            {/* Create New Post Call-to-Action */}
            <section className="dashboard-cta-section">
              <div className="blog-card-glassmorphic dashboard-cta-card">
                <div className="blog-card-content dashboard-cta-content">
                  <Typography variant="heading" weight="semibold" className="dashboard-heading-text dashboard-cta-title">
                    Ready to create more amazing content?
                  </Typography>
                  <Button
                    variant="primary"
                    size="large"
                    onClick={() => setShowModal(true)}
                    className="blog-button-primary-action blog-button-large-cta dashboard-create-new-btn"
                    rightIcon={
                      <svg className="dashboard-button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    }
                  >
                    Create New Story
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
      
      {/* New Post Modal */}
      <NewPostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={fetchPosts}
      />
    </>
  );
}

export default Dashboard;