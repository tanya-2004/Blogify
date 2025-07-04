import { useEffect, useState } from 'react';
import API from '../../utils/axios';
import NewPostModal from '../../components/modals/NewPostModal';
import Card from '../../components/ui/Card';
import Typography from '../../components/ui/Typography';

export default function Stats() {
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch user's posts for stats calculation
    API.get('/posts/mine')
      .then((res) => {
        setPosts(res.data);
        // Calculate stats (mocked data for demo)
        setStats({
          totalPosts: res.data.length,
          totalViews: res.data.length * Math.floor(Math.random() * 100) + 50,
          totalLikes: res.data.length * Math.floor(Math.random() * 20) + 10,
          totalComments: res.data.length * Math.floor(Math.random() * 15) + 5
        });
      })
      .catch(() => {
        setPosts([]);
      });
  }, []);

  const StatCard = ({ title, value, icon, color, trend }) => (
    <Card variant="glass" className="bg-white/95 backdrop-blur-sm border-gray-200/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <Card.Body className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shadow-md`}>
            {icon}
          </div>
          {trend && (
            <div className="flex items-center space-x-1 text-sm bg-green-50 px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-green-600 font-medium">{trend}%</span>
            </div>
          )}
        </div>
        <Typography variant="title" weight="bold" className="force-black-text mb-1">
          {value.toLocaleString()}
        </Typography>
        <Typography variant="caption" className="text-gray-600">
          {title}
        </Typography>
      </Card.Body>
    </Card>
  );

  const RecentActivity = () => (
    <Card className="recent-activity-card">
      <Card.Body>
        <Typography variant="h3" className="force-black-text mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Recent Activity</span>
        </Typography>
        <div className="space-y-3">
          {posts.slice(0, 5).map((post, index) => (
            <div key={post._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div>
                <Typography variant="body1" weight="medium" className="force-black-text">{post.title}</Typography>
                <Typography variant="caption" className="text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</Typography>
              </div>
              <div className="text-right">
                <Typography variant="body2" weight="semibold" className="force-black-text">{Math.floor(Math.random() * 50) + 10} views</Typography>
                <Typography variant="caption" className="text-gray-500">{Math.floor(Math.random() * 10) + 1} likes</Typography>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <Typography variant="body1" className="text-gray-500 text-center py-8">No posts yet. Start writing to see your stats!</Typography>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <Typography 
            variant="h1" 
            weight="bold" 
            className="force-black-text mb-4 flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span>Analytics</span>
          </Typography>
          <Typography variant="body2" className="force-black-text max-w-2xl">
            Track your blog performance and growth
          </Typography>
        </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Posts"
                value={stats.totalPosts}
                icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>}
                color="bg-blue-100"
                trend={12}
              />
              <StatCard
                title="Total Views"
                value={stats.totalViews}
                icon={<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>}
                color="bg-green-100"
                trend={25}
              />
              <StatCard
                title="Total Likes"
                value={stats.totalLikes}
                icon={<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>}
                color="bg-red-100"
                trend={18}
              />
              <StatCard
                title="Comments"
                value={stats.totalComments}
                icon={<svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>}
                color="bg-purple-100"
                trend={8}
              />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Mock Chart */}
              <Card className="chart-card">
                <Card.Body>
                  <Typography variant="h3" className="force-black-text mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>Views Over Time</span>
                  </Typography>
                  <div className="h-64 flex items-end space-x-2 justify-center">
                    {[40, 65, 45, 80, 55, 90, 75].map((height, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-blue-400 w-8 rounded-t transition-all duration-1000 hover:from-blue-600 hover:to-blue-500"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-gray-500 text-xs mt-2">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>

              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Achievements */}
            <Card className="achievements-card mt-8">
              <Card.Body>
                <Typography variant="h3" className="force-black-text mb-4 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span>Achievements</span>
                </Typography>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <Typography variant="body1" weight="semibold" className="text-yellow-700 mb-1">First Post</Typography>
                    <Typography variant="caption" className="text-yellow-600">Published your first article</Typography>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <Typography variant="body1" weight="semibold" className="text-purple-700 mb-1">Rising Star</Typography>
                    <Typography variant="caption" className="text-purple-600">Gained 100+ total views</Typography>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <Typography variant="body1" weight="semibold" className="text-green-700 mb-1">Consistent Writer</Typography>
                    <Typography variant="caption" className="text-green-600">Posted 5 times this month</Typography>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
      
          {showModal && <NewPostModal onClose={() => setShowModal(false)} />}
        </>
  );
}
