// 🔢 Aggregate totals from all posts
export const getPostStats = (posts = []) => {
  return posts.reduce(
    (acc, post) => ({
      views: acc.views + (Number(post?.views) || 0),
      likes: acc.likes + (Number(post?.likes) || 0),
      comments: acc.comments + (Number(post?.commentsCount) || 0)
    }),
    { views: 0, likes: 0, comments: 0 }
  );
};

// 💅 Format numbers with K suffix & emojis
export const formatPostStats = (stats = {}) => {
  const format = (num = 0) =>
    num >= 1000 ? `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K` : `${num}`;

  return {
    views: `👁️ ${format(stats.views)}`,
    likes: `❤️ ${format(stats.likes)}`,
    comments: `💬 ${format(stats.comments)}`
  };
};

// 🧾 Dashboard-ready summary string
export const postStatsSummary = (posts = []) => {
  const stats = getPostStats(posts);
  const formatted = formatPostStats(stats);
  return `${formatted.views} • ${formatted.likes} • ${formatted.comments}`;
};

// 🕒 Most recent post (optional)
export const getLatestPost = (posts = []) => {
  return posts.length
    ? [...posts].sort(
      (a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0)
    )[0]
    : null;
};