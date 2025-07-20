import { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { NewPostModal, EditPostModal, Button, Typography } from '../../components';

function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Add CSS for animations and loading states
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes shimmer {
        0% { background-position: -200px 0; }
        100% { background-position: calc(200px + 100%) 0; }
      }
      .animate-fade-in {
        animation: fadeIn 0.6s ease-out forwards;
      }
      .shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200px 100%;
        animation: shimmer 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const res = await API.get('/posts/mine');
      console.log('Fetched posts from API:', res.data);
      
      // Debug each post's imageUrl
      res.data.forEach((post, index) => {
        console.log(`Post ${index} - ID: ${post._id}, Title: ${post.title}, ImageURL: "${post.imageUrl}", ImageURL type: ${typeof post.imageUrl}`);
      });
      
      setMyPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setMyPosts([]);
    } finally {
      setIsLoading(false);
    }
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
    setEditPostId(id);
    setShowEditModal(true);
  };

  // Helper function to format content
  const formatContent = (content) => {
    if (!content || content.trim().length === 0) {
      return "No content available";
    }
    return content.slice(0, 100) + (content.length > 100 ? '...' : '');
  };

  // Helper function to calculate read time
  const calculateReadTime = (content) => {
    if (!content || content.trim().length === 0) return 1;
    return Math.max(1, Math.ceil(content.length / 250));
  };

  // Helper function to get character count with fallback
  const getCharCount = (content) => {
    return content && content.trim().length > 0 ? content.length : 0;
  };

  // Helper function to get safe title with fallback
  const getSafeTitle = (title) => {
    return title && title.trim().length > 0 ? title.trim() : 'Untitled Post';
  };

  // Helper function to format date and time
  const formatDateTime = (dateString) => {
    if (!dateString) {
      return 'Unknown date';
    }
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return 'Today';
      } else if (diffDays === 2) {
        return 'Yesterday';
      } else if (diffDays <= 7) {
        return `${diffDays - 1} days ago`;
      } else {
        return date.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric'
        });
      }
    } catch (error) {
      return 'Unknown date';
    }
  };

  // Loading state component
  const LoadingCard = () => (
    <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
      <div className="shimmer h-48 rounded-xl mb-4"></div>
      <div className="shimmer h-6 rounded mb-3"></div>
      <div className="shimmer h-4 rounded mb-2"></div>
      <div className="shimmer h-4 rounded w-3/4 mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="shimmer h-6 w-16 rounded-full"></div>
        <div className="shimmer h-6 w-20 rounded-full"></div>
      </div>
      <div className="flex gap-3">
        <div className="shimmer h-10 flex-1 rounded-lg"></div>
        <div className="shimmer h-10 flex-1 rounded-lg"></div>
      </div>
    </div>
  );

  return (
    <>
      {/* Main Dashboard Container */}
      <div className="dashboard-container -mx-4">
        
        {/* Dashboard Header Section - YouTube-style left alignment */}
        <header className="dashboard-header mb-8 px-4">
          <div className="flex items-center">
            <div className="dashboard-icon-wrapper mr-3">
              <svg className="dashboard-icon w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <Typography 
                variant="h1" 
                weight="light" 
                className="dashboard-title-text text-4xl text-gray-900 mb-1"
              >
                Content Hub
              </Typography>
              <Typography variant="body2" className="dashboard-subtitle-text text-gray-600 text-lg">
                Craft, manage, and track your stories with our premium blogging platform
              </Typography>
            </div>
          </div>
        </header>
        
        {/* Loading State */}
        {isLoading ? (
          <div className="space-y-8">
            {/* Stats Loading */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="shimmer w-12 h-12 rounded-xl"></div>
                    <div className="flex-1">
                      <div className="shimmer h-8 w-16 rounded mb-2"></div>
                      <div className="shimmer h-4 w-24 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
            {/* Posts Loading */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <LoadingCard key={i} />
              ))}
            </section>
          </div>
        ) : myPosts.length === 0 ? (
          /* Empty State - No Posts */
          <div className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-12 shadow-xl text-center">
            <div className="dashboard-empty-state-content max-w-md mx-auto">
              
              {/* Empty State Icon */}
              <div className="dashboard-empty-state-icon-container mb-8">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              
              {/* Empty State Text */}
              <Typography variant="h2" weight="bold" className="text-gray-900 mb-4">
                Your Creative Journey Begins
              </Typography>
              <Typography variant="body1" className="text-gray-600 mb-8 leading-relaxed">
                Transform your ideas into captivating stories. Start crafting your first masterpiece today.
              </Typography>
              
              {/* Create First Post Button */}
              <Button
                variant="primary"
                size="large"
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Create Your First Story
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Dashboard Statistics Overview - Uniform cards with consistent styling */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              
              {/* Posts Count Card */}
              <div className="group bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-l-4 border-l-blue-500 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    <svg className="w-7 h-7 text-blue-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Typography variant="h3" weight="bold" className="text-gray-900 text-3xl group-hover:text-blue-700 transition-colors duration-300">
                      {myPosts.length}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                      Published Stories
                    </Typography>
                  </div>
                </div>
              </div>
              
              {/* Views Count Card */}
              <div className="group bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-l-4 border-l-green-500 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                    <svg className="w-7 h-7 text-green-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Typography variant="h3" weight="bold" className="text-gray-900 text-3xl group-hover:text-green-700 transition-colors duration-300">
                      {Math.floor(Math.random() * 500) + 100}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                      Total Views
                    </Typography>
                  </div>
                </div>
              </div>
              
              {/* Likes Count Card */}
              <div className="group bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 border-l-4 border-l-purple-500 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <svg className="w-7 h-7 text-purple-600 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <Typography variant="h3" weight="bold" className="text-gray-900 text-3xl group-hover:text-purple-700 transition-colors duration-300">
                      {Math.floor(Math.random() * 50) + 20}
                    </Typography>
                    <Typography variant="caption" className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                      Total Likes
                    </Typography>
                  </div>
                </div>
              </div>
            </section>            
            
            {/* Blog Posts Grid Section - Improved responsive grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {myPosts.map((post, index) => (
                <article
                  key={post._id}
                  className="bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Featured Image with Attractive Gradient Placeholder */}
                  <div className="relative h-48 overflow-hidden">
                    {post.imageUrl && post.imageUrl.trim() ? (
                      <img
                        src={post.imageUrl.trim()}
                        alt={getSafeTitle(post.title)}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onLoad={() => {
                          console.log(`Image loaded successfully for post: ${post.title}`);
                        }}
                        onError={(e) => {
                          console.log(`Image failed to load for post: ${post.title}, URL: ${post.imageUrl}`);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Beautiful Gradient Placeholder with WCAG Compliant Text */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center ${post.imageUrl && post.imageUrl.trim() ? 'hidden' : 'flex'}`}
                    >
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-3 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                          <svg className="w-10 h-10 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-sm">
                          <p className="text-gray-800 text-sm font-medium">No Image</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-sm font-medium rounded-full border border-white/20 shadow-sm">
                        Article
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col h-auto">
                    
                    {/* Post Title */}
                    <Typography
                      variant="title"
                      weight="bold"
                      className="text-gray-900 text-xl leading-tight mb-3 line-clamp-2"
                    >
                      {getSafeTitle(post.title)}
                    </Typography>
                    
                    {/* Post Metadata - Enhanced date formatting and WCAG compliant colors */}
                    {/* Always shows: Title, Date, Content snippet */}
                    {/* Conditionally shows: Read time and character count (only if content exists) */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-4 text-sm text-gray-600 flex-wrap">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{formatDateTime(post.createdAt)}</span>
                      </div>
                      {getCharCount(post.content) > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{calculateReadTime(post.content)} min read</span>
                        </div>
                      )}
                      {getCharCount(post.content) > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{getCharCount(post.content)} chars</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Post Excerpt with Empty State Handling */}
                    <Typography 
                      variant="body" 
                      className="text-gray-700 leading-relaxed mb-4 line-clamp-3 text-sm flex-grow"
                    >
                      {formatContent(post.content)}
                    </Typography>
                    
                    {/* Field Context */}
                    {post.fieldContext && (
                      <div className="mb-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm font-medium rounded-lg border border-indigo-200 shadow-sm">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          <span>{post.fieldContext}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Post Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200 hover:bg-blue-100 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full border border-gray-200">
                            +{post.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Post Action Buttons - Positioned in bottom right corner */}
                    <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-auto">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={() => handleEdit(post._id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition-all duration-200 hover:shadow-md flex items-center gap-1.5 text-sm"
                        aria-label={`Edit post: ${getSafeTitle(post.title)}`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </Button>
                      
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleDelete(post._id)}
                        disabled={deletingId === post._id}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-200 hover:border-red-300 px-3 py-1.5 rounded-md font-medium transition-all duration-200 hover:shadow-md flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        aria-label={`Delete post: ${getSafeTitle(post.title)}`}
                      >
                        {deletingId === post._id ? (
                          <>
                            <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
                              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
            
            {/* Create New Post Call-to-Action */}
            <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-blue-50 rounded-3xl p-8 text-center shadow-lg border border-gray-200/50 mt-12">
              <div className="max-w-md mx-auto">
                <Typography variant="heading" weight="semibold" className="text-gray-900 text-2xl mb-4">
                  Ready to create more amazing content?
                </Typography>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Story
                </Button>
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

      {/* Edit Post Modal */}
      <EditPostModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditPostId(null);
        }}
        onPostUpdated={fetchPosts}
        postId={editPostId}
      />
    </>
  );
}

export default Dashboard;