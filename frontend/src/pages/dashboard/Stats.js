import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { NewPostModal, Card, Typography } from '../../components';
import usePostStats from '../../hooks/usePostStats';
import { showSuccess } from '../../utils/toast';

export default function Stats() {
  const { posts, stats, refresh } = usePostStats();
  const [showModal, setShowModal] = useState(false);
  const { colors, fontSize, mode } = useTheme();

  const themedStyle = { color: colors.text };
  const fontSizeTokens = {
    small: 'text-sm',
    medium: '',
    large: 'text-lg'
  };
  const themedSize = fontSizeTokens[fontSize] || '';

  const viewsByDay = [0, 0, 0, 0, 0, 0, 0];
  posts.forEach(post => {
    const dayIndex = (new Date(post.createdAt).getDay() + 6) % 7;
    viewsByDay[dayIndex] += post.views || 0;
  });

  const StatCard = ({ title, value, icon, color, trend }) => (
    <Card variant="glass" style={{ borderColor: colors.borderLight }}>
      <Card.Body className="bg-white/95 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
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
        <Typography variant="title" weight="bold" style={themedStyle} className={`mb-1 ${themedSize}`}>
          {(typeof value === 'number' ? value : 0).toLocaleString()}
        </Typography>
        <Typography variant="caption" style={{ color: colors.textLight }}>{title}</Typography>
      </Card.Body>
    </Card>
  );

  const WeekdayBarChart = ({ data }) => {
    const max = Math.max(...data);
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    if (max === 0) {
      return (
        <div className="text-sm text-center py-12" style={{ color: colors.textLight }}>
          No views recorded yet this week.
        </div>
      );
    }

    return (
      <div className="h-64 flex items-end space-x-4 justify-center overflow-visible py-4">
        {data.map((count, index) => {
          const height = max ? (count / max) * 100 : 0;

          return (
            <div key={index} className="group relative flex flex-col-reverse items-center h-full">
              <span className="text-xs mt-2" style={{ color: colors.textLight }}>{labels[index]}</span>
              <div
                className="w-8 rounded-t bg-gradient-to-t from-purple-600 via-purple-500 to-purple-400 transition-[height] duration-700 ease-in-out"
                style={{ height: `${height}%` }}
              />
              <div className="text-xs mt-1" style={{ color: colors.textLight }}>{count}</div>
              <div className="absolute -top-6 text-xs bg-white border rounded px-2 py-1 shadow opacity-0 group-hover:opacity-100 transition">
                {count.toLocaleString()} views
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const RecentActivity = () => (
    <Card>
      <Card.Body>
        <Typography variant="h3" style={themedStyle} className={`mb-4 flex items-center space-x-2 ${themedSize}`}>
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span>Recent Activity</span>
        </Typography>
        <div className="space-y-3">
          {posts.slice(0, 5).map(post => (
            <div key={post._id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition" style={{ backgroundColor: colors.background }}>
              <div>
                <Typography variant="body1" weight="medium" style={themedStyle} className={themedSize}>
                  {post.title}
                </Typography>
                <Typography variant="caption" style={{ color: colors.textLight }}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
              </div>
              <div className="text-right">
                <Typography variant="body2" weight="semibold" style={themedStyle} className={themedSize}>
                  {post.views || 0} views
                </Typography>
                <Typography variant="caption" style={{ color: colors.textLight }}>
                  {post.likes || 0} likes
                </Typography>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <Typography variant="body1" className="text-center py-8" style={{ color: colors.textLight }}>
              No posts yet. Start writing to see your stats!
            </Typography>
          )}
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <>
      <div className="dashboard-container" style={{ backgroundColor: colors.background }} data-theme={mode}>
        <div className="dashboard-header mb-6">
          <Typography variant="h1" weight="bold" style={themedStyle} className={`mb-4 flex items-center space-x-4 ${themedSize}`}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span>Analytics</span>
          </Typography>
          <Typography variant="body2" style={themedStyle} className={`max-w-2xl ${themedSize}`}>
            Track your blog performance and growth
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Posts" value={stats.totalPosts} icon={<PostIcon />} color="bg-blue-100" trend={12} />
          <StatCard title="Total Views" value={stats.totalViews} icon={<EyeIcon />} color="bg-green-100" trend={25} />
          <StatCard title="Total Likes" value={stats.totalLikes} icon={<HeartIcon />} color="bg-red-100" trend={18} />
          <StatCard title="Comments" value={stats.totalComments} icon={<CommentIcon />} color="bg-purple-100" trend={8} />
        </div>

        {/* Chart & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <Card.Body>
              <Typography variant="h3" style={themedStyle} className={`mb-4 flex items-center space-x-2 ${themedSize}`}>
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Views by Weekday</span>
              </Typography>
              <WeekdayBarChart data={viewsByDay} />
            </Card.Body>
          </Card>

          <RecentActivity />
        </div>
      </div>

      {/* New Post Modal */}
      {showModal && (
        <NewPostModal
          onClose={() => setShowModal(false)}
          onPostCreated={() => {
            refresh();
            setShowModal(false);
            showSuccess('Post published!');
          }}
        />
      )}
    </>
  );
}

// Icon Helpers
function PostIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}