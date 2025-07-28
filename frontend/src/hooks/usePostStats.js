import { useEffect, useState } from 'react';
import API from '../utils/axios';
import { getPostStats } from '../utils/postStats';
import { showSuccess, showError } from '../utils/toast'; 

export default function usePostStats() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await API.get('/posts/mine');
      const postData = Array.isArray(res.data) ? res.data : [];
      const { views, likes, comments } = getPostStats(postData);

      setPosts(postData);
      setStats({
        totalPosts: postData.length,
        totalViews: views,
        totalLikes: likes,
        totalComments: comments
      });

      showSuccess('Post stats refreshed');
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setError('Failed to load post stats');
      setPosts([]);
      setStats({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0
      });

      showError('Error loading post stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { posts, stats, loading, error, refresh };
}