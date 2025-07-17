import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicHome from "./pages/PublicHome";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import CreatePost from "./pages/posts/CreatePost";
import PostDetail from "./pages/posts/PostDetail";
import EditPost from "./pages/posts/EditPost";
import Dashboard from "./pages/dashboard/Dashboard";
import Stats from "./pages/dashboard/Stats";
import Comments from "./pages/dashboard/Comments";
import Theme from "./pages/dashboard/Theme";
import Settings from "./pages/dashboard/Settings";
import { ProtectedRoute, Layout } from './components';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:id" element={<PostDetail />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
          <Route path="/stats" element={<ProtectedRoute><Stats /></ProtectedRoute>} />
          <Route path="/comments" element={<ProtectedRoute><Comments /></ProtectedRoute>} />
          <Route path="/theme" element={<ProtectedRoute><Theme /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;