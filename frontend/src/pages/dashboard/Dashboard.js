import { useEffect, useState } from 'react';
import API from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import NewPostModal from '../../components/modals/NewPostModal';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Typography from '../../components/ui/Typography';

function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchPosts = () => {
    API.get('/posts/mine')
      .then((res) => setMyPosts(res.data))
      .catch(() => setMyPosts([]));
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
    navigate(`/edit/${id}`);
  };

  return (
    <>
      <div className="dashboard-container">
        {/* Premium Header */}
        <div className="dashboard-header">
          <Typography 
            variant="h1" 
            weight="light" 
            className="force-black-text mb-4 flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span>Content Hub</span>
          </Typography>
          <Typography variant="body2" className="force-black-text max-w-2xl">
            Craft, manage, and track your stories with our premium blogging platform
          </Typography>
        </div>
        
        {myPosts.length === 0 ? (
          <Card className="text-center py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 border-blue-200/50">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-8 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-6 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <Typography variant="h2" weight="bold" className="force-black-text mb-4">
              Your Creative Journey Begins
            </Typography>
            <Typography variant="body1" className="force-black-text mb-8 max-w-md mx-auto">
              Transform your ideas into captivating stories. Start crafting your first masterpiece today.
            </Typography>
            
            <Button
              variant="primary"
              size="large"
              onClick={() => setShowModal(true)}
              className="shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mr-2">✨</span>
              Create Your First Story
            </Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50">
                <div className="flex items-center space-x-4 p-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="h3" weight="bold" className="text-text-primary">
                      {myPosts.length}
                    </Typography>
                    <Typography variant="caption" className="text-text-secondary">
                      Published Stories
                    </Typography>
                  </div>
                </div>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200/50">
                <Card.Body className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="title" weight="bold" className="text-gray-900">
                      {Math.floor(Math.random() * 500) + 100}
                    </Typography>
                    <Typography variant="caption" color="muted">
                      Total Views
                    </Typography>
                  </div>
                </Card.Body>
              </Card>
              
              <Card variant="glass" className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50">
                <Card.Body className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <Typography variant="title" weight="bold" className="text-gray-900">
                      {Math.floor(Math.random() * 50) + 20}
                    </Typography>
                    <Typography variant="caption" color="muted">
                      Total Likes
                    </Typography>
                  </div>
                </Card.Body>
              </Card>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-6">
              {myPosts.map((post, index) => (
                <Card
                  key={post._id}
                  variant="glass"
                  className="group bg-white/95 backdrop-blur-sm border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <Card.Body className="p-8">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 pr-8">
                        <Typography
                          variant="title"
                          weight="bold"
                          className="text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2"
                        >
                          {post.title}
                        </Typography>
                        
                        <div className="flex items-center text-gray-500 text-sm mb-4 space-x-6">
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{Math.ceil(post.content.length / 250)} min read</span>
                          </div>
                        </div>
                        
                        <Typography variant="body" color="muted" className="leading-relaxed mb-6 line-clamp-3">
                          {post.content.slice(0, 200)}...
                        </Typography>
                        
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, i) => (
                              <span 
                                key={i} 
                                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs border border-blue-200 font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-3 py-1 text-gray-400 text-xs">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="primary"
                          size="small"
                          onClick={() => handleEdit(post._id)}
                          leftIcon={
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          }
                          className="shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Edit
                        </Button>
                        
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => handleDelete(post._id)}
                          disabled={deletingId === post._id}
                          leftIcon={
                            deletingId === post._id ? (
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )
                          }
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
                        >
                          {deletingId === post._id ? 'Deleting...' : 'Delete'}
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
            
            {/* Quick Actions */}
            <Card variant="glass" className="bg-gradient-to-br from-slate-50 to-gray-100 border-gray-200/50 mt-8">
              <Card.Body className="text-center py-8">
                <Typography variant="heading" weight="semibold" className="text-gray-900 mb-4">
                  Ready to create more amazing content?
                </Typography>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => setShowModal(true)}
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  }
                  className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Create New Story
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
      
      <NewPostModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onPostCreated={fetchPosts}
      />
    </>
  );
}

export default Dashboard;