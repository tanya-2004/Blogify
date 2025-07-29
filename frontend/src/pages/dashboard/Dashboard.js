import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import API from '../../utils/axios';
import { showSuccess, showError } from '../../utils/toast';
import {
  NewPostModal,
  EditPostModal,
  Button,
  Typography,
  ErrorBoundary,
  BlogCard
} from '../../components';
import usePostStats from '../../hooks/usePostStats';

function Dashboard() {
  const {
    primaryColor,
    secondaryColor,
    primaryLight,
    success,
    warning,
    accent,
    text,
    textLight,
    borderLight,
    fontSize
  } = useContext(ThemeContext);

  const statColors = [
    primaryColor || '#3B82F6',
    success || '#10B981',
    accent || '#9333EA',
    warning || '#F59E0B'
  ];

  const {
    posts: myPosts,
    stats,
    loading: isLoading,
    refresh
  } = usePostStats();

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fontHeading = fontSize === 'large' ? 'text-2xl' : fontSize === 'small' ? 'text-base' : 'text-xl';
  const fontBody = fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : 'text-md';

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await API.delete(`/posts/${id}`);
      showSuccess('Post deleted');
      refresh();
    } catch {
      showError('Failed to delete post');
    }
  };

  const handleEdit = (id) => {
    setEditPostId(id);
    setShowEditModal(true);
  };

  const handleLike = async (postId) => {
    try {
      await API.post(`/posts/${postId}/like`);
      showSuccess('Post liked');
      refresh();
    } catch (err) {
      console.error('Error liking post:', err);
      showError('Failed to like post');
    }
  };

  return (
    <>
      <div className="mx-[-1rem]">
        {/* Header */}
        <header className="px-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8" style={{ color: primaryColor }}>
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <Typography variant="h1" weight="light" style={{ color: text }} className={fontHeading}>
                Content Hub
              </Typography>
              <Typography variant="body2" style={{ color: textLight }}>
                Craft, manage, and track your stories with our premium blogging platform
              </Typography>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Published Stories', value: stats.totalPosts },
            { label: 'Total Views', value: stats.totalViews },
            { label: 'Total Likes', value: stats.totalLikes },
            { label: 'Total Comments', value: stats.totalComments }
          ].map(({ label, value }, i) => (
            <div
              key={label}
              className="bg-white rounded-xl p-6 shadow-sm border-l-4"
              style={{ borderLeftColor: statColors[i] }}
            >
              <Typography variant="h3" weight="bold" style={{ color: text }} className="mb-1">
                {(typeof value === 'number' ? value : 0).toLocaleString()}
              </Typography>
              <Typography variant="caption" style={{ color: textLight }}>
                {label}
              </Typography>
            </div>
          ))}
        </section>

        {/* Posts Section */}
        <section className="mt-12 sm:mt-16 lg:mt-20">
          {isLoading ? (
            <div className="text-center py-12 px-6" role="status" aria-live="polite">
              <div className="w-8 h-8 mx-auto rounded-full border-4 border-current border-t-transparent animate-spin"
                style={{ color: primaryColor }} />
              <Typography variant="caption" className="mt-2" style={{ color: textLight }}>
                Loading your stories...
              </Typography>
            </div>
          ) : myPosts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-xl">
              <Typography variant="h2" weight="bold" style={{ color: text }} className="mb-4">
                Your Creative Journey Begins
              </Typography>
              <Typography variant="body1" style={{ color: textLight }} className="mb-6">
                Transform your ideas into captivating stories. Start crafting your first masterpiece today.
              </Typography>
              <Button
                variant="primary"
                onClick={() => setShowModal(true)}
                className="text-white px-8 py-4 rounded-xl"
                style={{ backgroundColor: primaryColor }}
              >
                Create Your First Story
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {myPosts.map((post, index) => (
                <div
                  key={post._id}
                  className="opacity-0 animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <BlogCard
                    post={post}
                    mode="dashboard"
                    onEdit={() => handleEdit(post._id)}
                    onDelete={() => handleDelete(post._id)}
                    onLike={() => handleLike(post._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section
          className="mt-8 rounded-xl p-12 text-center shadow-xl border"
          style={{
            background: `linear-gradient(to bottom right, ${primaryLight || '#A5B4FC'}, ${secondaryColor}10)`,
            borderColor: borderLight || '#E5E7EB'
          }}
        >
          <div className="max-w-md mx-auto">
            <Typography
              variant="heading"
              weight="semibold"
              style={{ color: text }}
              className={`mb-4 ${fontHeading}`}
            >
              Ready to create more amazing content?
            </Typography>
            <Typography
              variant="body"
              style={{ color: textLight }}
              className={`mb-4 ${fontBody}`}
            >
              {stats.totalPosts > 10
                ? "You're on fire 🔥 Keep the streak going—your readers love it!"
                : 'Just getting started? Let your voice be heard!'}
            </Typography>
            <div className="flex justify-center gap-6 mb-4" style={{ color: secondaryColor }}>
              <span>{(stats.totalViews || 0).toLocaleString()} views</span>
              <span>{(stats.totalLikes || 0).toLocaleString()} likes</span>
              <span>{(stats.totalComments || 0).toLocaleString()} comments</span>
            </div>
            <Button
              variant="primary"
              size="large"
              onClick={() => setShowModal(true)}
              className={`px-8 py-4 rounded-xl shadow ${stats.totalPosts <= 3 ? 'animate-pulse' : ''}`}
              style={{
                background: `linear-gradient(to right, ${primaryColor || '#3B82F6'}, ${secondaryColor || '#4F46E5'})`,
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0,0,0,0.4)'
              }}
            >
              Create New Story
            </Button>
          </div>
        </section>
      </div>

      {/* Modals */}
      <NewPostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={() => {
          refresh();
          showSuccess('Post published!');
        }}
      />
      <ErrorBoundary>
        {showEditModal && (
          <EditPostModal
            open={showEditModal}
            postId={editPostId}
            onClose={() => {
              setShowEditModal(false);
              setEditPostId(null);
            }}
            onPostUpdated={() => {
              refresh();
              showSuccess('Post updated');
            }}
          />
        )}
      </ErrorBoundary>
    </>
  );
}

export default Dashboard;