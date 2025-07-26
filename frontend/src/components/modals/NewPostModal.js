import { useState, useRef, useEffect } from 'react';
import API from '../../utils/axios';
import Button from '../ui/Button';
import Typography from '../ui/Typography';
import { isAuthenticated, debugAuthStatus } from '../../utils/auth';

export default function NewPostModal({ open, onClose, onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fieldContext, setFieldContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (open && titleInputRef.current) {
      setTimeout(() => titleInputRef.current.focus(), 100);
    }
    if (open) {
      debugAuthStatus();
    }
  }, [open]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      setError('You must be logged in to create a post. Please log in and try again.');
      return;
    }

    if (imageUrl && imageUrl.trim()) {
      try {
        new URL(imageUrl.trim());
      } catch {
        setError('Please enter a valid image URL (e.g., https://example.com/image.jpg)');
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const postData = {
        title,
        content,
        tags: [...new Set(tags.split(',').map(t => t.trim()).filter(Boolean))]
      };

      if (imageUrl.trim()) postData.imageUrl = imageUrl.trim();
      if (fieldContext.trim()) postData.fieldContext = fieldContext.trim();

      await API.post('/posts', postData);

      setTitle('');
      setContent('');
      setTags('');
      setImageUrl('');
      setFieldContext('');
      onPostCreated();
      onClose();
    } catch (err) {
      const status = err.response?.status;
      if (status === 401) {
        setError('Authentication failed. Please log in again.');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(err.response?.data?.msg || err.response?.data?.error || 'Failed to create post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  // Dynamic styling variables for consistency
  const theme = {
    colors: {
      primary: '#3B82F6',
      primaryLight: '#EFF6FF',
      secondary: '#6B7280',
      border: '#D1D5DB',
      borderLight: '#E5E7EB',
      background: '#F9FAFB',
      white: '#FFFFFF',
      error: '#DC2626',
      success: '#10B981',
      text: '#1F2937',
      textLight: '#6B7280'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px'
    },
    borderRadius: {
      sm: '6px',
      md: '8px',
      lg: '12px'
    },
    shadows: {
      modal: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      light: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
    minWidth: '16px',
    minHeight: '16px',
    flexShrink: 0
  };

  // Dynamic input style based on focus state
  const getInputStyle = (fieldName) => ({
    width: '100%',
    padding: '12px 16px 12px 44px',
    border: `1px solid ${focusedField === fieldName ? theme.colors.primary : theme.colors.border}`,
    borderRadius: theme.borderRadius.md,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    boxShadow: focusedField === fieldName ? `0 0 0 3px ${theme.colors.primary}20` : 'none'
  });

  const getTextareaStyle = (fieldName) => ({
    ...getInputStyle(fieldName),
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: 'inherit',
    lineHeight: '1.5'
  });

  const getSelectStyle = (fieldName) => ({
    ...getInputStyle(fieldName),
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 12px center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '16px',
    paddingRight: '40px'
  });

  return (
    <div
      className="blog-modal-overlay new-post-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="new-post-modal-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(8px)',
        zIndex: 1400,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.lg
      }}
    >
      <div
        className="blog-modal-container new-post-modal-container"
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius.lg,
          padding: '0',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: theme.shadows.modal,
          transform: 'scale(1)',
          transition: 'transform 0.2s ease'
        }}
      >

        <header className="blog-modal-header new-post-modal-header" style={{
          padding: `${theme.spacing.xl} ${theme.spacing.xl} 0 ${theme.spacing.xl}`,
          position: 'relative',
          borderBottom: `1px solid ${theme.colors.borderLight}`
        }}>
          <div className="blog-modal-title-section new-post-modal-title-section" style={{
            display: 'flex',
            alignItems: 'center',
            gap: theme.spacing.md,
            marginBottom: theme.spacing.lg
          }}>
            <div className="blog-modal-icon-wrapper new-post-modal-icon" style={{
              width: '32px',
              height: '32px',
              borderRadius: theme.borderRadius.sm,
              backgroundColor: theme.colors.primaryLight,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.colors.primary
            }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <Typography
              id="new-post-modal-title"
              variant="title"
              weight="bold"
              className="blog-modal-title new-post-modal-title dashboard-heading-text"
              style={{ color: theme.colors.text }}
            >
              Create New Story
            </Typography>
          </div>
          <button
            onClick={onClose}
            className="blog-modal-close-button new-post-modal-close"
            aria-label="Close create post modal"
            style={{
              position: 'absolute',
              top: theme.spacing.lg,
              right: theme.spacing.lg,
              background: 'none',
              border: 'none',
              padding: theme.spacing.sm,
              cursor: 'pointer',
              borderRadius: theme.borderRadius.sm,
              color: theme.colors.secondary,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s ease, background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = theme.colors.background;
              e.target.style.color = theme.colors.text;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = theme.colors.secondary;
            }}
          >
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="blog-modal-body new-post-modal-body" style={{
          padding: theme.spacing.xl,
          maxHeight: '60vh',
          overflowY: 'auto'
        }}>
          {error && (
            <div className="blog-form-error-message new-post-error-display" role="alert" aria-live="polite">
              <div className="blog-form-error-content" style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                color: theme.colors.error,
                marginBottom: theme.spacing.md,
                padding: theme.spacing.md,
                backgroundColor: `${theme.colors.error}10`,
                borderRadius: theme.borderRadius.md,
                border: `1px solid ${theme.colors.error}30`
              }}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="blog-post-creation-form new-post-form" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0'
          }}>

            {/* Post Title */}
            <div style={{ marginBottom: '20px' }}>
              <Typography
                variant="body1"
                style={{
                  marginBottom: theme.spacing.sm,
                  display: 'block',
                  fontWeight: '500',
                  color: theme.colors.text
                }}
              >
                Post Title *
              </Typography>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: theme.spacing.md,
                  color: focusedField === 'title' ? theme.colors.primary : theme.colors.secondary,
                  transition: 'color 0.2s ease'
                }}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  ref={titleInputRef}
                  type="text"
                  placeholder="Enter an engaging title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={() => setFocusedField('title')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={getInputStyle('title')}
                />
              </div>
            </div>

            {/* Field / Context */}
            <div style={{ marginBottom: '20px' }}>
              <Typography
                variant="body1"
                style={{
                  marginBottom: theme.spacing.sm,
                  display: 'block',
                  fontWeight: '500',
                  color: theme.colors.text
                }}
              >
                Field / Context (Optional)
              </Typography>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: theme.spacing.md,
                  color: focusedField === 'fieldContext' ? theme.colors.primary : theme.colors.secondary,
                  transition: 'color 0.2s ease',
                  zIndex: 1
                }}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <select
                  value={fieldContext}
                  onChange={(e) => setFieldContext(e.target.value)}
                  onFocus={() => setFocusedField('fieldContext')}
                  onBlur={() => setFocusedField(null)}
                  style={getSelectStyle('fieldContext')}
                >
                  <option value="">Select a field or context...</option>
                  <option value="Technology">Technology</option>
                  <option value="Design">Design</option>
                  <option value="Programming">Programming</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Health">Health</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>
            </div>

            {/* Content */}
            <div style={{ marginBottom: '20px' }}>
              <Typography
                variant="body1"
                style={{
                  marginBottom: theme.spacing.sm,
                  display: 'block',
                  fontWeight: '500',
                  color: theme.colors.text
                }}
              >
                Content *
              </Typography>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start' }}>
                <div style={{
                  position: 'absolute',
                  top: theme.spacing.md,
                  left: theme.spacing.md,
                  color: focusedField === 'content' ? theme.colors.primary : theme.colors.secondary,
                  transition: 'color 0.2s ease'
                }}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <textarea
                  aria-label="Post Content"
                  placeholder="Write your story here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setFocusedField('content')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={8}
                  style={getTextareaStyle('content')}
                />
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '20px' }}>
              <Typography
                variant="body1"
                style={{
                  marginBottom: theme.spacing.sm,
                  display: 'block',
                  fontWeight: '500',
                  color: theme.colors.text
                }}
              >
                Tags (Optional)
              </Typography>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: theme.spacing.md,
                  color: focusedField === 'tags' ? theme.colors.primary : theme.colors.secondary,
                  transition: 'color 0.2s ease'
                }}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="technology, design, programming"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  onFocus={() => setFocusedField('tags')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('tags')}
                />
              </div>
              <Typography
                variant="caption"
                style={{
                  marginTop: theme.spacing.xs,
                  fontSize: '12px',
                  color: theme.colors.textLight,
                  display: 'block'
                }}
              >
                Separate tags with commas
              </Typography>
            </div>

            <div style={{ display: 'flex', gap: theme.spacing.xs, flexWrap: 'wrap', marginTop: theme.spacing.sm }}>
              {tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
                .map((tag, i) => (
                  <span key={i} style={{
                    padding: '4px 8px',
                    fontSize: '12px',
                    backgroundColor: theme.colors.primary + '15',
                    color: theme.colors.primary,
                    borderRadius: theme.borderRadius.sm
                  }}>
                    {tag}
                  </span>
                ))}
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: '20px' }}>
              <Typography
                variant="body1"
                style={{
                  marginBottom: theme.spacing.sm,
                  display: 'block',
                  fontWeight: '500',
                  color: theme.colors.text
                }}
              >
                Featured Image URL (Optional)
              </Typography>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <div style={{
                  position: 'absolute',
                  left: theme.spacing.md,
                  color: focusedField === 'imageUrl' ? theme.colors.primary : theme.colors.secondary,
                  transition: 'color 0.2s ease'
                }}>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onFocus={() => setFocusedField('imageUrl')}
                  onBlur={() => setFocusedField(null)}
                  style={getInputStyle('imageUrl')}
                />
              </div>
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Featured preview"
                  style={{
                    marginTop: theme.spacing.sm,
                    maxWidth: '100%',
                    borderRadius: theme.borderRadius.sm,
                    border: `1px solid ${theme.colors.borderLight}`
                  }}
                  onError={() => setImageUrl('')}
                />
              )}
          </div>
        </form>
      </main>

      <footer style={{
        padding: `${theme.spacing.md} ${theme.spacing.xl} ${theme.spacing.lg} ${theme.spacing.xl}`,
        borderTop: `1px solid ${theme.colors.borderLight}`,
        backgroundColor: theme.colors.background
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: theme.spacing.md
        }}>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            style={{
              minWidth: '100px',
              transition: 'all 0.2s ease'
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
            onClick={handleSubmit}
            className="blog-button-primary-action new-post-submit-btn"
            style={{
              minWidth: '140px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: theme.spacing.sm,
              fontSize: '14px',
              borderRadius: theme.borderRadius.md,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              flexWrap: 'nowrap'
            }}
          >
            {loading ? (
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                whiteSpace: 'nowrap'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  flexShrink: 0
                }}></div>
                Publishing...
              </span>
            ) : (
              <span style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm,
                whiteSpace: 'nowrap'
              }}>
                Publish Post
                <svg
                  className="new-post-submit-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{
                    ...iconStyle,
                    flexShrink: 0
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </span>
            )}
          </Button>
        </div>
      </footer>
    </div>
    </div >
  );
}
