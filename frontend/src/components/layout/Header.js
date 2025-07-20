import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, isAuthenticated } from '../../utils/auth';
import { useSidebar } from '../../contexts/SidebarContext';
import { Button } from '../ui';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const { toggleSidebar, toggleMobileSidebar, isCollapsed, isMobileOpen } = useSidebar();

  const handleMenuToggle = () => {
    if (window.innerWidth >= 768) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  // Debug function to test login
  const handleTestLogin = () => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0MTIzIiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzMDA4OTk2LCJleHAiOjE3NTMwOTUzOTZ9.k7COsHnoSlw9kl3qj_NE9jEIRm78LFo3scU44c30udjs';
    localStorage.setItem('token', testToken);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto pl-0 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section: Hamburger Menu + Logo (flush to extreme left edge like YouTube) */}
          <div className="flex items-center space-x-2 ml-0 pl-0">
            {/* 1. Sidebar Toggle Button - First, no left padding */}
            <button
              onClick={handleMenuToggle}
              className="p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group relative ml-0"
              aria-label="Toggle Menu"
              title="Toggle Menu"
            >
              <svg 
                className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
              {/* Subtle hover effect */}
              <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            {/* 2. Logo - Second, right next to hamburger with minimal spacing */}
            <Link to="/" className="group flex items-center space-x-2 hover:opacity-80 transition-all duration-300 ml-0">
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
          </div>

          {/* Center Section: Navigation Links */}
          <div className="flex items-center justify-center">
            {isLoggedIn && (
              <nav className="hidden lg:flex items-center space-x-2">
                <Link 
                  to="/" 
                  className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
                >
                  <span className="relative z-10">Home</span>
                  <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  to="/dashboard" 
                  className="relative px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </nav>
            )}
          </div>

          {/* Center Section: Search Bar */}
          {isLoggedIn && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search posts, topics, authors..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Right Section: Notifications + User Profile */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                {/* 5. Notifications - Fifth */}
                <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group">
                  <svg className="w-5 h-5 text-gray-600 group-hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-4-4V8a6 6 0 00-12 0v5l-4 4h5m4 0a3 3 0 01-6 0" />
                  </svg>
                  {/* Notification badge */}
                  <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>

                {/* 6. User Profile Dropdown - Sixth */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      U
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        User
                      </p>
                      <p className="text-xs text-gray-500">Content Creator</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                            U
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">User</p>
                            <p className="text-sm text-gray-500">user@example.com</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Profile Settings
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Account Settings
                        </Link>
                        <hr className="my-2 border-gray-100" />
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Non-authenticated user buttons */
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleTestLogin}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                >
                  Test Login
                </button>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  onClick={() => navigate('/signup')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isLoggedIn && (
          <div className="md:hidden pb-4 pt-2 border-t border-gray-200">
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
}
