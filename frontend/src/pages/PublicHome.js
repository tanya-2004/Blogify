import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/axios';
import { BlogCard, Typography } from '../components';
import { isAuthenticated } from '../utils/auth';
import { ThemeContext } from '../contexts/ThemeContext';
import { showSuccess, showError } from '../utils/toast';

function PublicHome() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuth = isAuthenticated();
  const { primaryColor, fontSize } = useContext(ThemeContext);

  const themedStyle = { color: primaryColor };
  const themedSize = fontSize === 'large' ? 'text-lg' : fontSize === 'small' ? 'text-sm' : '';

  const handleLike = async (postId) => {
    try {
      await API.post(`/posts/${postId}/like`);
      showSuccess('Thanks for the like!');
      const res = await API.get('/posts');
      const postsData = Array.isArray(res.data) ? res.data : [];
      const sortedPosts = postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    } catch (err) {
      console.error('Like failed:', err);
      showError('Failed to register like. Please try again.');
    }
  };

  useEffect(() => {
    API.get('/posts')
      .then((res) => {
        const postsData = Array.isArray(res.data) ? res.data : [];
        const sortedPosts = postsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(sortedPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch failed:', err);
        showError('Failed to load posts. Please refresh.');
        setPosts([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Public Header - Clean and Simple */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="group flex items-center space-x-3 hover:opacity-80 transition-all duration-300">
              <div className="relative">
                <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  B
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-xl font-light text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Blog
                </span>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ify
                </span>
              </div>
            </Link>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              {isAuth ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-6 py-3 rounded-2xl border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-indigo-500/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }}></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="mb-8">
            <Typography
              variant="hero"
              weight="light"
              className={`text-white mb-4 leading-tight animate-fadeInUp ${themedSize}`}
              style={themedStyle}
            >
              Craft<br />
              <span className="font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Stories
              </span><br />
              <span className="text-white/80">That Matter</span>
            </Typography>
          </div>
          <Typography
            variant="body1"
            className={`text-gray-300 mb-8 max-w-2xl mx-auto font-light leading-relaxed animate-fadeInUp ${themedSize}`}
            style={themedStyle}
          >
            Where visionary thoughts meet exceptional design.
            <span className="text-blue-400"> Create, share, and inspire </span> with our premium publishing platform.
          </Typography>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp" style={{ animationDelay: '1s' }}>
            {isAuth ? (
              <Link
                to="/dashboard"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
              >
                <span className="relative z-10">Go to Dashboard</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Start Creating</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
                </Link>
                <Link
                  to="/signin"
                  className="px-8 py-4 border-2 border-white/20 text-white rounded-full font-medium text-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 text-sm font-medium text-gray-500 tracking-widest uppercase mb-6">
              <div className="w-8 h-px bg-gray-300"></div>
              <span>Featured Stories</span>
              <div className="w-8 h-px bg-gray-300"></div>
            </div>

            <Typography
              variant="h2"
              weight="light"
              style={themedStyle}
              className={`mb-6 leading-tight ${themedSize}`}
            >
              Latest
              <span className="block font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Insights
              </span>
            </Typography>

            <Typography
              variant="body1"
              className={`text-gray-600 max-w-3xl mx-auto font-light leading-relaxed ${themedSize}`}
            >
              Discover extraordinary perspectives from our community of thought leaders and creative minds.
            </Typography>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="flex space-x-3">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-48 h-48 mx-auto mb-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl flex items-center justify-center">
                <svg className="w-24 h-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <Typography variant="h3" weight="light" style={themedStyle} className={`mb-6 ${themedSize}`}>
                The Canvas Awaits
              </Typography>
              <Typography
                variant="body1"
                className={`text-xl text-gray-600 mb-12 max-w-lg mx-auto font-light leading-relaxed ${themedSize}`}
              >
                Be the visionary who paints the first stroke. Share your unique perspective with the world.
              </Typography>
              {isAuth ? (
                <Link
                  to="/create"
                  className="px-10 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full hover:from-slate-700 hover:to-slate-600 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Create Your First Post
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-10 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full hover:from-slate-700 hover:to-slate-600 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Join Our Community
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
              {Array.isArray(posts) && posts.slice(0, 6).map((post, index) => (
                <div
                  key={post._id}
                  className="opacity-0 animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  <BlogCard post={post} onLike={() => handleLike(post._id)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default PublicHome;
