import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import API from '../../utils/axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => {
        const post = res.data;
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags.join(', '));
        setImageUrl(post.imageUrl || '');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch post:', err);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await API.put(`/posts/${id}`, {
        title,
        content,
        tags: tags.split(',').map((tag) => tag.trim()).filter(tag => tag),
        imageUrl,
      });
      navigate(`/post/${id}`);
    } catch (err) {
      alert(err.response?.data?.msg || 'Update failed');
      setIsSubmitting(false);
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <Typography variant="h1" className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span>Edit Post</span>
        </Typography>
        <Typography variant="body2" className="text-text-secondary">
          Update your story
        </Typography>
      </div>

      <Card className="edit-post-form">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <Typography variant="body1" className="font-medium force-black-text mb-2">
              Post Title
            </Typography>
            <Input
              type="text"
              placeholder="Enter an engaging title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="text-lg"
            />
          </div>

          <div>
            <Typography variant="body1" className="font-medium force-black-text mb-2">
              Featured Image URL (Optional)
            </Typography>
            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div>
            <Typography variant="body1" className="font-medium force-black-text mb-2">
              Content
            </Typography>
            <textarea
              placeholder="Write your story here..."
              rows="12"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-textarea w-full resize-none"
            />
          </div>

          <div>
            <Typography variant="body1" className="font-medium force-black-text mb-2">
              Tags (Optional)
            </Typography>
            <Input
              type="text"
              placeholder="technology, design, programming (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <Typography variant="caption" className="force-black-text mt-2 block">
              Separate tags with commas
            </Typography>
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-border-color">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/post/${id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="post-submit-btn"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <LoadingSpinner size="small" />
                  <span>Updating...</span>
                </div>
              ) : (
                'Update Post'
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default EditPost;