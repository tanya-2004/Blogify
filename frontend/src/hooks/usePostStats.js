import { useEffect, useState } from 'react';
import API from '../utils/axios';
import { getPostStats } from '../utils/postStats';
import { showError } from '../utils/toast';

export default function usePostStats() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({ totalPosts: 0, totalViews: 0, totalLikes: 0, totalComments: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await API.get('/posts/mine');
      if (res.data.success) {
        const postData = res.data.posts || [];
        const { views, likes, comments } = getPostStats(postData);
        setPosts(postData);
        setStats({
          totalPosts: postData.length,
          totalViews: views,
          totalLikes: likes,
          totalComments: comments
        });
      } else {
        throw new Error(res.data.message || 'Failed to fetch posts');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(msg);
      showError(msg);
      setPosts([]);
      setStats({ totalPosts: 0, totalViews: 0, totalLikes: 0, totalComments: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { posts, stats, loading, error, refresh };
}