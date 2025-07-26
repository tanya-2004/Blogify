import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute, Layout } from './components';
import './App.css';

const PublicHome = lazy(() => import('./pages/PublicHome'));
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const PostDetail = lazy(() => import('./pages/posts/PostDetail'));
const CreatePost = lazy(() => import('./pages/posts/CreatePost'));
const EditPost = lazy(() => import('./pages/posts/EditPost'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const Stats = lazy(() => import('./pages/dashboard/Stats'));
const Comments = lazy(() => import('./pages/dashboard/Comments'));
const Theme = lazy(() => import('./pages/dashboard/Theme'));
const Settings = lazy(() => import('./pages/dashboard/Settings'));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Routes>
            <Route path="/" element={<PublicHome />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/theme" element={<Theme />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;