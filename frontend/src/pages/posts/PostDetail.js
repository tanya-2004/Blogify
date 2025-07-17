import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, LoadingSpinner } from '../../components';
import API from '../../utils/axios';
import { isAuthenticated } from '../../utils/auth';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Post fetch failed:', err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    
    try {
      await API.delete(`/posts/${post._id}`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.msg || 'Delete failed');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="flex justify-center items-center py-32">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="dashboard-container">
        <div className="text-center py-32">
          <div className="w-48 h-48 mx-auto mb-12 bg-surface-secondary rounded-3xl flex items-center justify-center">
            <svg className="w-24 h-24 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <Typography variant="h2" className="mb-6">Post Not Found</Typography>
          <Typography variant="body1" className="text-text-secondary mb-12 max-w-lg mx-auto">
            The post you're looking for doesn't exist or has been removed.
          </Typography>
          <Button 
            variant="primary"
            onClick={() => navigate('/')}
          >
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Card className="post-detail-card overflow-hidden">
        {/* Hero Section with Featured Image */}
        <div className="relative h-80 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/20 to-accent-primary/10 overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-accent-secondary/20 to-accent-primary/10"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <Typography variant="h1" className="text-white mb-6 leading-tight">
              {post.title}
            </Typography>
            
            <div className="flex flex-wrap items-center gap-6 text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {post.author?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <Typography variant="body2" className="font-medium text-white">
                  {post.author?.username || 'Unknown Author'}
                </Typography>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <Typography variant="caption" className="text-white">
                  {new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </Typography>
              </div>
              
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Typography variant="caption" className="text-white">
                  {Math.floor(post.content.length / 200)} min read
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            <Typography variant="body1" className="text-text-primary leading-relaxed whitespace-pre-wrap">
              {post.content}
            </Typography>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border-color">
              <Typography variant="h3" className="mb-4">Tags</Typography>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, i) => (
                  <span 
                    key={i} 
                    className="bg-surface-secondary border border-border-color text-accent-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-accent-primary/10 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons for Authenticated Users */}
          {isAuthenticated() && (
            <div className="mt-12 pt-8 border-t border-border-color">
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/edit/${post._id}`)}
                  className="flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Post</span>
                </Button>
                
                <Button
                  variant="danger"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span>{deleting ? 'Deleting...' : 'Delete Post'}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default PostDetail;