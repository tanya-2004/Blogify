import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import API from '../../utils/axios';
import Button from '../ui/Button';
import Typography from '../ui/Typography';
import { isAuthenticated, debugAuthStatus } from '../../utils/auth';
import { getInputStyle, getTextareaStyle, getModalStyles, getIconStyle } from './editPostModalStyles';
import { showError, showSuccess } from '../../utils/toast';

export default function EditPostModal({ open, onClose, onPostUpdated, postId }) {
  const {
    colors = {},
    spacing = {},
    borderRadius = {},
    shadows = {},
    fontSize = {},
    primaryColor = '#6366F1'
  } = useTheme() || {};
  const theme = { colors, spacing, borderRadius, shadows, fontSize, primaryColor };

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const titleInputRef = useRef(null);
  const previouslyFocused = useRef(null);

  // Restore focus when modal closes
  useEffect(() => {
    if (open) previouslyFocused.current = document.activeElement;
    else previouslyFocused.current?.focus();
  }, [open]);

  useEffect(() => {
    if (open && postId) {
      setFetchingPost(true);
      API.get(`/posts/${postId}`)
        .then(({ data }) => {
          setTitle(data.title || '');
          setContent(data.content || '');
          setTags(data.tags?.join(', ') || '');
          setImageUrl(data.imageUrl || '');
          setTimeout(() => titleInputRef.current?.focus(), 100);
        })
        .catch(() => {
          showError('Failed to load post data. Please try again.');
        })
        .finally(() => setFetchingPost(false));
    }

    if (open) debugAuthStatus();
  }, [open, postId]);

  useEffect(() => {
    if (!open) {
      setTitle('');
      setContent('');
      setTags('');
      setImageUrl('');
      setFocusedField(null);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const handleBackdropClick = (e) => e.target === e.currentTarget && onClose();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      showError('You must be logged in to edit a post.');
      return;
    }

    if (content.trim().length < 20) {
      showError('Please add at least 20 characters of content.');
      return;
    }

    setLoading(true);

    try {
      await API.put(`/posts/${postId}`, {
        title,
        content,
        tags: [...new Set(tags.split(',').map(t => t.trim()).filter(Boolean))],
        imageUrl
      });

      showSuccess('Post updated successfully!');
      onPostUpdated?.();
      onClose?.();
    } catch (err) {
      const status = err.response?.status;

      if (status === 401) {
        showError('Authentication failed. Redirecting...');
        setTimeout(() => (window.location.href = '/login'), 2000);
      } else if (status === 404) {
        showError('Post not found.');
      } else {
        showError(err.response?.data?.msg || 'Update failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const styles = getModalStyles(theme);
  const iconStyle = getIconStyle();

  return (
    <div onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-labelledby="edit-post-modal-title" style={styles.backdrop}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.titleRow}>
            <div style={styles.iconBox}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <Typography id="edit-post-modal-title" variant="title" weight="bold" style={{ color: colors.text }}>
              Edit Story
            </Typography>
          </div>
          <button onClick={onClose} aria-label="Close edit post modal" style={styles.closeButton}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main style={styles.body}>
          {fetchingPost && (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <Typography variant="body1" style={{ color: colors.secondary }}>Loading post data...</Typography>
            </div>
          )}

          {!fetchingPost && (
            <form onSubmit={handleSubmit} style={styles.form}>
              {[
                {
                  label: 'Post Title *',
                  value: title,
                  setter: setTitle,
                  placeholder: 'Enter an engaging title...',
                  field: 'title',
                  ref: titleInputRef,
                  icon: "M7 21h10a2 2 0 002-2V9.414l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z",
                  type: 'text'
                },
                {
                  label: 'Featured Image URL (Optional)',
                  value: imageUrl,
                  setter: setImageUrl,
                  placeholder: 'https://example.com/image.jpg',
                  field: 'imageUrl',
                  icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                  type: 'url'
                },
                {
                  label: 'Content *',
                  value: content,
                  setter: setContent,
                  placeholder: 'Write your story here...',
                  field: 'content',
                  icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                  type: 'textarea',
                  rows: 8
                },
                {
                  label: 'Tags (Optional)',
                  value: tags,
                  setter: setTags,
                  placeholder: 'technology, design, programming',
                  field: 'tags',
                  icon: "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z",
                  type: 'text',
                  helpText: 'Separate tags with commas'
                }
              ].map(({ label, value, setter, placeholder, field, ref, icon, type, rows, helpText }) => (
                <div key={field} style={{ marginBottom: '20px' }}>
                  <Typography variant="body1" style={{ marginBottom: spacing.sm, fontWeight: '500', color: colors.text }}>
                    {label}
                  </Typography>
                  <div style={{ position: 'relative', display: 'flex', alignItems: type === 'textarea' ? 'flex-start' : 'center' }}>
                    <div style={{
                      position: 'absolute',
                      left: spacing.md,
                      top: type === 'textarea' ? spacing.md : '50%',
                      transform: type === 'textarea' ? 'none' : 'translateY(-50%)',
                      color: focusedField === field ? colors.primary : colors.secondary,
                      transition: 'color 0.2s ease'
                    }}>
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                      </svg>
                    </div>
                    {type === 'textarea' ? (
                      <textarea
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        required={label.includes('*')}
                        rows={rows}
                        style={getTextareaStyle(theme, focusedField, field)}
                      />
                    ) : (
                      <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        required={label.includes('*')}
                        style={getInputStyle(theme, focusedField, field)}
                      />
                    )}
                  </div>
                  {helpText && (
                    <Typography variant="caption" style={{ fontSize: '12px', color: colors.textLight, marginTop: spacing.xs }}>
                      {helpText}
                    </Typography>
                  )}
                </div>
              ))
              }

              {/* Footer */}
              <footer style={styles.footer}>
                <div style={styles.footerActions}>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={onClose}
                    disabled={loading || fetchingPost}
                    style={{
                      ...styles.submitButton,
                      backgroundColor: 'transparent',
                      color: colors.textLight || '#666',
                      border: `1px solid ${colors.border || '#ddd'}`
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading || fetchingPost}
                    className="blog-button-primary-action edit-post-submit-btn"
                    style={styles.submitButton}
                  >
                    {loading ? (
                      <span style={styles.submitLoading} aria-live="polite">
                        <div style={styles.submitSpinner}></div>
                        Updating...
                      </span>
                    ) : (
                      <span style={styles.submitLabel}>
                        Update Post
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={iconStyle}>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </Button>
                </div>
              </footer>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}