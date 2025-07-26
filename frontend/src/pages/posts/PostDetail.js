import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  Typography,
  LoadingSpinner
} from '../../components';
import API from '../../utils/axios';
import { isAuthenticated } from '../../utils/auth';
import CommentForm from '../../components/CommentForm';

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
          <Typography variant="h2" className="mb-6">Post Not Found</Typography>
          <Typography variant="body1" className="text-text-secondary mb-12 max-w-lg mx-auto">
            The post you're looking for doesn't exist or has been removed.
          </Typography>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Back Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Card className="post-detail-card overflow-hidden">
        {/* Post Header Section */}
        <div className="relative h-80 overflow-hidden">
          {post.imageUrl ? (
            <img
              src={post.imageUrl}
              alt={post.title || 'Featured image'}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = '/fallback.jpg'; }}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-200" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <Typography variant="h1" className="text-white mb-4 leading-tight">
              {post.title}
            </Typography>
            <div className="flex items-center gap-6 text-white/80 text-sm">
              <span>{post.author?.username || 'Unknown Author'}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>{Math.floor(post.content.length / 200)} min read</span>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none mb-8">
            <Typography
              variant="body1"
              className="text-text-primary leading-relaxed whitespace-pre-wrap"
              aria-label="Post content"
            >
              {post.content}
            </Typography>
          </div>

          {/* Tags */}
          {post.tags?.filter(Boolean).length > 0 && (
            <div className="mb-12 pt-8 border-t border-border-color">
              <Typography variant="h3" className="mb-4">Tags</Typography>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, i) => (
                  <span key={i} className="bg-surface-secondary border border-border-color text-accent-primary px-4 py-2 rounded-full text-sm font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 💬 Comment Form */}
          {isAuthenticated() && (
            <div className="mt-12 pt-8 border-t border-border-color">
              <CommentForm postId={post._id} />
            </div>
          )}

          {/* ✏️ Authenticated Actions */}
          {isAuthenticated() && (
            <div className="mt-12 pt-8 border-t border-border-color">
              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => navigate(`/edit/${post._id}`)}>
                  Edit Post
                </Button>
                <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Delete Post'}
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