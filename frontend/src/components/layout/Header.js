import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../../utils/auth';
import { useSidebar } from '../../contexts/SidebarContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../ui';
import { showSuccess } from '../../utils/toast';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { primaryColor, fontSize, selectedTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const isLoggedIn = isAuthenticated();
  const { user, setUser } = useUser();

  const fontClass =
    fontSize === 'small' ? 'text-sm'
      : fontSize === 'large' ? 'text-lg'
        : 'text-base';

  const handleLogout = async () => {
    removeToken();
    setUser(null);
    showSuccess('Logged out');
    await new Promise(res => setTimeout(res, 100));
    navigate('/');
  };

  const handleMenuToggle = () => {
    if (window.innerWidth >= 768) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const settingsTabs = [
    { label: 'Profile Settings', tab: 'profile', icon: '👤' },
    { label: 'Privacy Settings', tab: 'privacy', icon: '🔒' },
    { label: 'Notification Settings', tab: 'notifications', icon: '🔔' },
    { label: 'Appearance Settings', tab: 'appearance', icon: '🎨' },
    { label: 'Publishing Settings', tab: 'publishing', icon: '📝' }
  ];

  const username = user?.username || 'User';
  const email = user?.email || 'user@example.com';

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] ${selectedTheme.bg} backdrop-blur-md border-b border-gray-200/50 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo & Sidebar Toggle */}
          <div className="flex items-center space-x-2">
            <button onClick={handleMenuToggle} className="p-2 rounded-xl group relative">
              <svg className={`w-5 h-5 ${selectedTheme.text} group-hover:text-gray-800`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100" style={{ backgroundColor: `${primaryColor}22` }} />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">B</div>
              <div>
                <span className={`font-light ${selectedTheme.text} ${fontClass}`}>Blog</span>
                <span className={`font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${fontClass}`}>ify</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-4">
            {isLoggedIn && (
              <>
                <Link to="/" className={`font-medium ${fontClass}`} style={{ color: primaryColor }}>Home</Link>
                <Link to="/dashboard" className={`font-medium ${fontClass}`} style={{ color: primaryColor }}>Dashboard</Link>
              </>
            )}
          </nav>

          {/* Right: Search + Profile */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* Notifications */}
                <button className="relative p-2 rounded-lg group">
                  <svg className={`w-5 h-5 ${selectedTheme.text} group-hover:text-gray-800`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-4-4V8a6 6 0 00-12 0v5l-4 4h5m4 0a3 3 0 01-6 0" />
                  </svg>
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-400"></span>
                </button>

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-xl group"
                  >
                    <div className="w-8 h-8 rounded-xl text-white font-semibold flex items-center justify-center" style={{ backgroundColor: primaryColor }}>
                      {username?.[0] || 'U'}
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className={`font-medium ${fontClass}`} style={{ color: primaryColor }}>
                        {username}
                      </p>
                      <p className={`text-xs ${selectedTheme.text}`}>
                        {email}
                      </p>
                    </div>
                    <svg className={`w-4 h-4 ${selectedTheme.text} group-hover:text-gray-600`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div
                      className={`absolute right-0 mt-2 w-64 ${selectedTheme.bg} ${selectedTheme.text} rounded-xl shadow-lg border border-gray-100 py-2 z-[60] transition ease-in-out duration-150`}
                      role="menu"
                      aria-label="User menu"
                    >
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
                        <div
                          className="w-10 h-10 rounded-xl text-white font-bold flex items-center justify-center"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {username?.[0] || 'U'}
                        </div>
                        <div>
                          <p className={`font-semibold ${selectedTheme.text}`}>{username}</p>
                          <p className="text-sm text-gray-500">{email}</p>
                        </div>
                      </div>

                      <div className="py-2">
                        {settingsTabs.map(({ label, tab, icon }) => (
                          <Link
                            key={tab}
                            to={`/settings?tab=${tab}`}
                            className="flex items-center px-4 py-3 hover:bg-gray-50 transition ease-in-out duration-150"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <span className={`mr-3 ${selectedTheme.text}`}>{icon}</span>
                            {label}
                          </Link>
                        ))}
                        <div className="h-px bg-gray-100 mx-4 my-2" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition ease-in-out duration-150"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-6 0v-1a3 3 0 016 0z"
                            />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  style={{ color: primaryColor }}
                  className="font-medium hover:text-blue-600"
                  onClick={() => setShowUserMenu(false)}
                >
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/signup');
                  }}
                  style={{ background: primaryColor, color: '#fff' }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
