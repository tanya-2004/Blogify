import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken, isAuthenticated } from '../../utils/auth';
import { Button, Typography } from '../ui';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const handleLogout = () => {
    removeToken();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Premium Logo and Brand */}
          <div className="flex items-center space-x-4">
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
          </div>

          {/* Premium Center Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className="relative px-6 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            {isLoggedIn && (
              <>
                <Link 
                  to="/dashboard" 
                  className="relative px-6 py-3 text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium group"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute inset-0 bg-blue-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </>
            )}
          </nav>

          {/* Premium Right Side */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                {/* Premium Search */}
                <div className="hidden lg:flex relative">
                  <input
                    type="text"
                    placeholder="Search stories..."
                    className="w-72 px-5 py-3 pl-12 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all duration-300"
                  />
                  <svg className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Premium Notifications */}
                <button className="relative p-3 rounded-2xl hover:bg-gray-100 transition-colors duration-300 group">
                  <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 12v5m0 0v-5m0 5h-5l5-5z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white font-bold shadow-lg">3</span>
                </button>

                {/* Premium User Profile */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-100 transition-colors duration-300 group"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                        U
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="hidden md:block">
                      <div className="font-semibold text-gray-900 text-sm">User</div>
                      <div className="text-gray-500 text-xs">Premium</div>
                    </div>
                    <svg className="h-4 w-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl py-3 z-50 border border-gray-200/50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="font-semibold text-gray-900">Welcome back!</div>
                        <div className="text-sm text-gray-500">Manage your account</div>
                      </div>
                      <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/settings" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button 
                        onClick={handleLogout} 
                        className="flex items-center space-x-3 w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
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
              </div>
            )}
          </div>
        </div>

        {/* Premium Mobile Navigation */}
        <div className="md:hidden pb-6 pt-4">
          <nav className="flex justify-center space-x-3 flex-wrap">
            <Link to="/" className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
              Home
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/create" className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                  Create
                </Link>
                <Link to="/dashboard" className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors duration-200">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-medium hover:bg-red-200 transition-colors duration-200">
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
