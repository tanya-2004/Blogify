import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import API from '../../utils/axios';
import { setToken } from '../../utils/auth';
import { Card, Typography } from '../../components';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const res = await API.post('/auth/login', { email, password });
      setToken(res.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link to="/" className="group inline-flex items-center space-x-3 mb-6 hover:opacity-80 transition-opacity duration-300">
            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-800 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-300">
                B
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div>
              <span className="text-2xl font-light text-white group-hover:text-blue-300 transition-colors duration-300">
                Blog
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ify
              </span>
            </div>
          </Link>
          
          <Typography variant="h1" weight="light" className="text-white mb-2">
            Welcome Back
          </Typography>
          <Typography variant="body1" className="text-blue-200">
            Sign in to continue your creative journey
          </Typography>
        </div>

        {/* Login Card */}
        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <Card.Body className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-400/20 rounded-xl" role="alert">
                <Typography variant="body2" className="text-red-300 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </Typography>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      autoComplete="current-password"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-blue-200">
                  <input
                    type="checkbox"
                    className="mr-2 rounded border-white/20 bg-white/10 text-blue-400 focus:ring-blue-400 focus:ring-offset-0"
                  />
                  Remember me
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-2 underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>                <div className="text-center pt-4">
                  <Typography variant="body2" className="text-blue-200">
                    Don't have an account?{' '}
                    <Link 
                      to="/signup" 
                      className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 underline decoration-2 underline-offset-4"
                    >
                      Sign up here
                    </Link>
                  </Typography>
                </div>
              </form>
            </Card.Body>
          </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <Typography variant="caption" className="text-blue-200/60">
            © 2025 Blogify. Crafted with ❤️ for creators
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Login;
