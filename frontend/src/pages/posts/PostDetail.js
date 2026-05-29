import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Typography, LoadingSpinner } from '../../components';
import API from '../../utils/axios';
import { isAuthenticated } from '../../utils/auth';
import CommentForm from '../../components/CommentForm';
import { CommentList } from '../../components/CommentList'; // named import
import { useTheme } from '../../contexts/ThemeContext';
import { showSuccess, showError } from '../../utils/toast';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [liking, setLiking] = useState(false);
  const { colors, fontSize, mode } = useTheme();

  const fontSizeTokens = { small: 'text-sm', medium: 'text-base', large: 'text-lg' };
  const themedSize = fontSizeTokens[fontSize] || 'text-base';

  const fetchPost = useCallback(async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data.post);
    } catch (err) {
      console.error('Post fetch failed:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    try {
      await API.delete(`/posts/${post._id}`);
      showSuccess('Post deleted');
      navigate('/dashboard');
    } catch (err) {
      showError(err.response?.data?.message || 'Delete failed');
      setDeleting(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated()) {
      showError('Please login to like posts');
      return;
    }
    setLiking(true);
    try {
      const res = await API.post(`/posts/${post._id}/like`);
      setPost({ ...post, likes: res.data.data?.likes ?? post.likes + 1 });
      showSuccess('Post liked!');
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to like');
    } finally {
      setLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container" style={{ backgroundColor: colors.background }}>
        <div className="flex justify-center items-center py-32">
          <LoadingSpinner size="large" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="dashboard-container" style={{ backgroundColor: colors.background }}>
        <div className="text-center py-32">
          <Typography variant="h2" style={{ color: colors.text }}>Post Not Found</Typography>
          <Button variant="primary" onClick={() => navigate('/')}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ backgroundColor: colors.background }} data-theme={mode}>
      <Card className="post-detail-card overflow-hidden">
        {/* Hero image / header */}
        <div className="relative h-80 overflow-hidden">
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-neutral-200" />
          )}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent">
            <Typography variant="h1" className="text-white mb-4">{post.title}</Typography>
            <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm">
              <span>{post.author?.username || 'Unknown'}</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>{Math.ceil(post.content.length / 1000)} min read</span>
              <span>❤️ {post.likes || 0} likes</span>
              <span>💬 {post.commentsCount || 0} comments</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="prose prose-lg max-w-none mb-8">
            <Typography variant="body1" style={{ color: colors.text }} className={`whitespace-pre-wrap ${themedSize}`}>
              {post.content}
            </Typography>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mb-12 pt-8 border-t" style={{ borderColor: colors.borderLight }}>
              <Typography variant="h3" className="mb-4">Tags</Typography>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Like & Edit/Delete buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="primary" onClick={handleLike} disabled={liking}>
              {liking ? 'Liking...' : '❤️ Like'}
            </Button>
            {isAuthenticated() && (
              <>
                <Button variant="outline" onClick={() => navigate(`/edit/${post._id}`)}>Edit</Button>
                <Button variant="danger" onClick={handleDelete} disabled={deleting}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </Button>
              </>
            )}
          </div>

          {/* Comment form & list */}
          <div className="mt-8 pt-8 border-t">
            <Typography variant="h3" className="mb-4">Comments</Typography>
            <CommentList postId={post._id} />
            {isAuthenticated() && <CommentForm postId={post._id} onCommentAdded={fetchPost} />}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PostDetail;  