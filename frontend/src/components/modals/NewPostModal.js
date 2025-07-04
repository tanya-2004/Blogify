import { useState } from 'react';
import API from '../../utils/axios';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Typography from '../ui/Typography';

/**
 * NewPostModal Component
 * 
 * Premium modal for creating new blog posts
 * Features glassmorphic design, form validation, and loading states
 */
export default function NewPostModal({ open, onClose, onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await API.post('/posts', {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        imageUrl,
      });
      setTitle(''); setContent(''); setTags(''); setImageUrl('');
      onPostCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <Card 
        variant="glass" 
        className="w-full max-w-2xl mx-auto bg-white/98 backdrop-blur-xl border border-white/30 shadow-2xl animate-scaleIn max-h-[90vh] flex flex-col"
      >
        <Card.Header className="flex items-center justify-between flex-shrink-0">
          <Typography 
            id="modal-title"
            variant="title" 
            weight="bold" 
            className="force-black-text"
          >
            ✨ Create New Post
          </Typography>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </Card.Header>

        <Card.Body className="flex-1 overflow-y-auto">
          {error && (
            <div 
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography variant="body1" className="force-black-text font-medium mb-2">
                Post Title *
              </Typography>
              <Input
                placeholder="Enter an engaging title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>

            <div>
              <Typography variant="body1" className="force-black-text font-medium mb-2">
                Featured Image URL (Optional)
              </Typography>
              <Input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              />
            </div>

            <div>
              <Typography variant="body1" className="force-black-text font-medium mb-2">
                Content *
              </Typography>
              <div className="relative">
                <textarea
                  placeholder="Write your story here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </div>
            </div>

            <div>
              <Typography variant="body1" className="force-black-text font-medium mb-2">
                Tags (Optional)
              </Typography>
              <Input
                placeholder="technology, design, programming (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                leftIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                }
              />
              <Typography variant="caption" className="force-black-text mt-1 block">
                Separate tags with commas
              </Typography>
            </div>
          </form>
        </Card.Body>

        <div className="flex justify-end space-x-4 p-6 border-t border-gray-200/50 flex-shrink-0 bg-white/98 backdrop-blur-sm">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit}
            className="min-w-[140px]"
            rightIcon={
              !loading && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )
            }
          >
            {loading ? 'Publishing...' : 'Publish Post'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
